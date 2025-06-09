import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Zap, Smartphone, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Welcome to Innovation",
      subtitle: "Experience the Future",
      description: "Experience the future of web design with our cutting-edge solutions. Built for performance, designed for beauty.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Zap className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "Get Started",
      path: "/shop"
    },
    {
      id: 2,
      title: "Lightning Fast Performance",
      subtitle: "Optimized for Speed",
      description: "Optimized for speed and efficiency. Our slider loads in milliseconds and delivers exceptional user experience.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Rocket className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "Learn More",
      path: "/shop"
    },
    {
      id: 3,
      title: "Beautiful Design",
      subtitle: "Modern & Elegant",
      description: "Modern aesthetics, smooth animations, and premium effects create an engaging visual experience.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Eye className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "Explore",
      path: "/about"
    },
    {
      id: 4,
      title: "Mobile Optimized",
      subtitle: "Responsive Design",
      description: "Responsive design ensures perfect display on all devices, from desktop to mobile phones.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "View Demo",
      path: "/contact"
    }
  ];
  

  // Preload images for faster loading
  useEffect(() => {
    const preloadImages = () => {
      slides.forEach((slide, index) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => ({ ...prev, [index]: true }));
        };
        img.src = slide.image;
      });
    };
    
    preloadImages();
  }, []);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [slides.length, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [currentSlide, isTransitioning]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Optimized auto-play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [nextSlide, isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, toggleAutoplay]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div 
        className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
        style={{ willChange: 'transform' }}
      >
        {/* Main Slider Container */}
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-500 ease-out ${
                index === currentSlide
                  ? 'translate-x-0'
                  : index < currentSlide
                  ? '-translate-x-full'
                  : 'translate-x-full'
              }`}
              style={{ willChange: 'transform' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{
                    opacity: imagesLoaded[index] ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center text-white max-w-4xl mx-auto">
                  <div className="flex flex-col items-center">
                    <div className="transform transition-all duration-700 delay-100">
                      {slide.icon}
                    </div>
                    
                    <div className="mb-3 sm:mb-4 transform transition-all duration-700 delay-200">
                      <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30">
                        {slide.subtitle}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 transform transition-all duration-700 delay-300 leading-tight">
                      {slide.title}
                    </h2>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl leading-relaxed transform transition-all duration-700 delay-400 px-4">
                      {slide.description}
                    </p>
                    
                    <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl delay-500 cursor-pointer">
                      <Link  to={slide.path} className="relative z-10">{slide.buttonText}</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 group z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative p-2 sm:p-3 lg:p-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 group z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative p-2 sm:p-3 lg:p-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 sm:w-10 lg:w-12 h-2 sm:h-3' 
                  : 'w-2 sm:w-3 h-2 sm:h-3 hover:w-3 sm:hover:w-4'
              }`}
            >
              <div className={`w-full h-full rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[#d2af6f] shadow-lg'
                  : 'bg-[#8b2727] hover:bg-[#d2af6f]'
              }`}></div>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 flex items-center space-x-2 sm:space-x-3 z-20">
          {/* Slide Counter */}
          <div className="px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-white font-medium text-xs sm:text-sm">
            {currentSlide + 1} / {slides.length}
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoplay}
            className="p-2 sm:p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#d2af6f] z-20">
          <div
            className="h-full bg-[#8b2727] transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Loading State */}
        {!imagesLoaded[currentSlide] && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeautifulSlider;