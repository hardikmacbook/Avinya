import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Zap, Smartphone, Rocket } from 'lucide-react';

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const intervalRef = useRef(null);
  const imageCache = useRef(new Map());

  // Optimized image URLs with smaller dimensions and better compression
  const slides = useMemo(() => [
    {
      id: 1,
      title: "Welcome to Innovation",
      subtitle: "Experience the Future",
      description: "Experience the future of web design with our cutting-edge solutions. Built for performance, designed for beauty.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=75",
      icon: <Zap className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "Get Started",
      path: "/shop"
    },
    {
      id: 2,
      title: "Lightning Fast Performance",
      subtitle: "Optimized for Speed",
      description: "Optimized for speed and efficiency. Our slider loads in milliseconds and delivers exceptional user experience.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=75",
      icon: <Rocket className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "Learn More",
      path: "/shop"
    },
    {
      id: 3,
      title: "Beautiful Design",
      subtitle: "Modern & Elegant",
      description: "Modern aesthetics, smooth animations, and premium effects create an engaging visual experience.",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=75",
      icon: <Eye className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "Explore",
      path: "/about"
    },
    {
      id: 4,
      title: "Mobile Optimized",
      subtitle: "Responsive Design",
      description: "Responsive design ensures perfect display on all devices, from desktop to mobile phones.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=75",
      icon: <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg" />,
      buttonText: "View Demo",
      path: "/contact"
    }
  ], []);

  // Aggressive image preloading strategy
  useEffect(() => {
    const preloadFirstImage = () => {
      const firstImg = new Image();
      firstImg.onload = () => {
        setFirstImageLoaded(true);
        imageCache.current.set(0, firstImg);
      };
      // Critical: Load smaller, optimized version first
      firstImg.src = slides[0].image;
      
      // Preload next images immediately but with lower priority
      setTimeout(() => {
        slides.slice(1).forEach((slide, index) => {
          const img = new Image();
          img.onload = () => {
            imageCache.current.set(index + 1, img);
          };
          img.src = slide.image;
        });
      }, 100);
    };

    preloadFirstImage();
  }, [slides]);

  // Ultra-fast navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
  }, [currentSlide]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Optimized auto-play
  useEffect(() => {
    if (isPlaying && firstImageLoaded) {
      intervalRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, isPlaying, firstImageLoaded]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          toggleAutoplay();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, toggleAutoplay]);

  // Show placeholder until first image loads
  if (!firstImageLoaded) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <Zap className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 text-white drop-shadow-lg animate-pulse" />
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30">
                    Experience the Future
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  Welcome to Innovation
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl leading-relaxed px-4">
                  Experience the future of web design with our cutting-edge solutions. Built for performance, designed for beauty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
        
        {/* Single optimized slide container */}
        <div className="relative w-full h-full">
          {/* Background Image with instant switching */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover transition-opacity duration-200"
              style={{
                opacity: imageCache.current.has(currentSlide) ? 1 : 0.8,
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="mb-4 sm:mb-6 transition-all duration-200">
                  {slides[currentSlide].icon}
                </div>
                
                <div className="mb-3 sm:mb-4 transition-all duration-200">
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30">
                    {slides[currentSlide].subtitle}
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-200">
                  {slides[currentSlide].title}
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl leading-relaxed px-4 transition-all duration-200">
                  {slides[currentSlide].description}
                </p>
                
                <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer">
                  <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 group z-20"
          aria-label="Previous slide"
        >
          <div className="relative p-2 sm:p-3 lg:p-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-200 transform hover:scale-110 shadow-lg">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 group z-20"
          aria-label="Next slide"
        >
          <div className="relative p-2 sm:p-3 lg:p-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-200 transform hover:scale-110 shadow-lg">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-200 ${
                index === currentSlide 
                  ? 'w-8 sm:w-10 lg:w-12 h-2 sm:h-3' 
                  : 'w-2 sm:w-3 h-2 sm:h-3 hover:w-3 sm:hover:w-4'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-full h-full rounded-full transition-all duration-200 ${
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
            className="p-2 sm:p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-200 transform hover:scale-110"
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
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
            className="h-full bg-[#8b2727] transition-all duration-200"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulSlider;