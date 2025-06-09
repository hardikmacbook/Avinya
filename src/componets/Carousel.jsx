import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Eye, Zap, Smartphone, Rocket } from 'lucide-react';

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const intervalRef = useRef(null);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  // Memoized slides data to prevent recreating objects
  const slides = useMemo(() => [
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
  ], []);

  // Optimized image preloading with priority loading
  useEffect(() => {
    const preloadImages = () => {
      // First load current and next images with high priority
      const priorityIndices = [0, 1];
      priorityIndices.forEach(index => {
        if (slides[index]) {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, index]));
          };
          img.fetchPriority = 'high';
          img.src = slides[index].image;
          imageRefs.current[index] = img;
        }
      });

      // Then load remaining images with low priority
      slides.forEach((slide, index) => {
        if (!priorityIndices.includes(index)) {
          setTimeout(() => {
            const img = new Image();
            img.onload = () => {
              setImagesLoaded(prev => new Set([...prev, index]));
            };
            img.fetchPriority = 'low';
            img.src = slide.image;
            imageRefs.current[index] = img;
          }, 100 * index);
        }
      });
    };
    
    preloadImages();
  }, [slides]);

  // Optimized navigation with debouncing
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    // Reduced timeout for faster transitions
    setTimeout(() => setIsTransitioning(false), 300);
  }, [slides.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [slides.length, isTransitioning]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentSlide, isTransitioning]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Optimized auto-play with cleanup
  useEffect(() => {
    if (isPlaying && !isTransitioning) {
      intervalRef.current = setInterval(nextSlide, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, isPlaying, isTransitioning]);

  // Optimized keyboard navigation with throttling
  useEffect(() => {
    let throttleTimeout = null;
    
    const handleKeyPress = (e) => {
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 300);

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

    document.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [nextSlide, prevSlide, toggleAutoplay]);

  // Memoized slide content to prevent unnecessary re-renders
  const slideContent = useMemo(() => {
    return slides.map((slide, index) => (
      <div
        key={slide.id}
        className={`absolute inset-0 transition-transform duration-300 ease-out ${
          index === currentSlide
            ? 'translate-x-0 z-10'
            : index < currentSlide
            ? '-translate-x-full z-0'
            : 'translate-x-full z-0'
        }`}
        style={{ 
          willChange: index === currentSlide || Math.abs(index - currentSlide) === 1 ? 'transform' : 'auto'
        }}
      >
        {/* Background Image - Only render for current and adjacent slides */}
        {Math.abs(index - currentSlide) <= 1 && (
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
              style={{
                opacity: imagesLoaded.has(index) ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>
        )}
        
        {/* Content - Only render for current slide */}
        {index === currentSlide && (
          <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="transform transition-all duration-500 delay-75">
                  {slide.icon}
                </div>
                
                <div className="mb-3 sm:mb-4 transform transition-all duration-500 delay-100">
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium border border-white/30">
                    {slide.subtitle}
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 transform transition-all duration-500 delay-150 leading-tight">
                  {slide.title}
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl leading-relaxed transform transition-all duration-500 delay-200 px-4">
                  {slide.description}
                </p>
                
                <button className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white/20 backdrop-blur-sm rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl delay-300 cursor-pointer">
                  <span className="relative z-10">{slide.buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    ));
  }, [slides, currentSlide, imagesLoaded]);

  // Memoized indicators to prevent unnecessary re-renders
  const indicators = useMemo(() => {
    return slides.map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`relative transition-all duration-300 ${
          index === currentSlide 
            ? 'w-8 sm:w-10 lg:w-12 h-2 sm:h-3' 
            : 'w-2 sm:w-3 h-2 sm:h-3 hover:w-3 sm:hover:w-4'
        }`}
        aria-label={`Go to slide ${index + 1}`}
      >
        <div className={`w-full h-full rounded-full transition-all duration-300 ${
          index === currentSlide
            ? 'bg-[#d2af6f] shadow-lg'
            : 'bg-[#8b2727] hover:bg-[#d2af6f]'
        }`}></div>
      </button>
    ));
  }, [slides.length, currentSlide, goToSlide]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div 
        ref={containerRef}
        className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
        style={{ 
          willChange: 'transform',
          contain: 'layout style paint'
        }}
      >
        {/* Main Slider Container */}
        <div className="relative w-full h-full overflow-hidden">
          {slideContent}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 group z-20 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <div className="relative p-2 sm:p-3 lg:p-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 group z-20 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <div className="relative p-2 sm:p-3 lg:p-4 bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/25 hover:border-white/40 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {indicators}
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
            className="h-full bg-[#8b2727] transition-all duration-300"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              transform: 'translateZ(0)' // Force hardware acceleration
            }}
          ></div>
        </div>

        {/* Loading State - Only show for current slide */}
        {!imagesLoaded.has(currentSlide) && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-30">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeautifulSlider;