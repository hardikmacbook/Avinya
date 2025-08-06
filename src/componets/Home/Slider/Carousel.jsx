import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";
import HeroImg1 from "../../../assets/images/demo1.jpg";

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [mediaItems, setMediaItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const currentItem = mediaItems.length > 0 ? mediaItems[currentSlide] : null;
  const isVideo = currentItem?.type === "video";

  // Fetch slider data from API
  useEffect(() => {
    const fetchSliderData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://689387c3c49d24bce86b150b.mockapi.io/Avinya-Slider"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setMediaItems(data);
        } else {
          throw new Error("Invalid data format or empty array");
        }
      } catch (err) {
        console.error("Error fetching slider data:", err);
        setError(err.message);
        setMediaItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  }, [touchStart, touchEnd]);

  // Auto-hide controls on mobile
  const showControlsTemporary = useCallback(() => {
    setShowControls(true);

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, []);

  // Progress and auto-slide management with performance optimization
  useEffect(() => {
    if (isAutoPlay && !isPlaying && isLoaded && mediaItems.length > 0) {
      const duration = isVideo ? 8000 : 6000;
      const startTime = Date.now();

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / duration) * 100;

        if (newProgress >= 100) {
          setProgress(0);
          setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
        } else {
          setProgress(newProgress);
          progressRef.current = requestAnimationFrame(updateProgress);
        }
      };

      progressRef.current = requestAnimationFrame(updateProgress);

      return () => {
        if (progressRef.current) {
          cancelAnimationFrame(progressRef.current);
        }
      };
    } else {
      setProgress(0);
    }
  }, [isAutoPlay, isPlaying, currentSlide, mediaItems.length, isVideo, isLoaded]);

  // Handle video play/pause with better error handling
  useEffect(() => {
    if (videoRef.current && isVideo) {
      const video = videoRef.current;

      const handleLoadedData = () => {
        video.currentTime = 0;
        if (isPlaying) {
          video.play().catch(console.error);
        }
      };

      video.addEventListener("loadeddata", handleLoadedData);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [currentSlide, isVideo, isPlaying]);

  const nextSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  }, [mediaItems.length]);

  const prevSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  }, [mediaItems.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (isVideo && videoRef.current) {
      const video = videoRef.current;
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isVideo, isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
    if (!isAutoPlay) {
      setProgress(0);
    }
  }, [isAutoPlay]);

  const resetSlider = useCallback(() => {
    setCurrentSlide(0);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Loading UI
  if (isLoading) {
    return (
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] min-h-[400px] max-h-[900px] bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading slider content...</p>
        </div>
      </div>
    );
  }

  // Error UI or empty data fallback
  if (error || mediaItems.length === 0) {
    return (
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] min-h-[400px] max-h-[900px] bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <div className="text-red-500 text-4xl">⚠️</div>
          <h3 className="text-gray-800 text-lg font-medium">Failed to Load Content</h3>
          <p className="text-gray-600 text-sm max-w-md">
            {error || "No slider content available. Please check your connection and try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        relative w-full transition-all duration-700 ease-out
        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {/* Main Container */}
      <div
        ref={containerRef}
        className="
          relative w-full overflow-hidden
          h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh]
          min-h-[400px] max-h-[900px]
          bg-gradient-to-br from-gray-900 to-black
          shadow-2xl touch-pan-y
        "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={isMobile ? showControlsTemporary : undefined}
      >
        {/* Enhanced Progress Bar - Always visible on mobile */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 md:h-2 bg-black/50 z-30 ${
            isMobile ? "block" : "hidden"
          }`}
        >
          <div
            className="h-full bg-[#8b2727] transition-all duration-100 ease-linear relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 w-1 md:w-2 h-full bg-white rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Media Display */}
        <div className="absolute inset-0 z-10">
          {isVideo ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              poster={currentItem.thumbnail}
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={(e) => console.error("Video error:", e)}
            >
              <source src={currentItem.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={currentItem.url || HeroImg1}
              alt={currentItem.title || "Slider image"}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          )}
        </div>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-20"></div>

        {/* Top Bar - Hidden on mobile unless controls are shown */}
        <div
          className={`
            absolute top-0 left-0 right-0 flex items-center justify-between 
            p-3 md:p-6 z-40 transition-opacity duration-300
            ${isMobile && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          {/* Auto Play Status */}
          <div className="flex items-center gap-2">
            <div
              className={`
                px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 
                backdrop-blur-sm border
                ${
                  isAutoPlay
                    ? "bg-[#d2af6f]/90 text-black border-[#d2af6f]/50"
                    : "bg-[#8b2727]/90 text-white border-[#8b2727]/50"
                }
              `}
            >
              {isAutoPlay ? "AUTO" : "MANUAL"}
            </div>
          </div>

          {/* Video Controls */}
          {isVideo && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[#8b2727]/50 transition-all duration-200"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>

        {/* Navigation Arrows - Improved mobile positioning */}
        <button
          onClick={prevSlide}
          className={`
            absolute left-2 md:left-6 top-1/2 -translate-y-1/2 
            p-2 md:p-4 bg-black/50 backdrop-blur-sm border border-white/20 
            rounded-full text-white hover:bg-[#8b2727]/50 hover:border-[#8b2727]/50 
            hover:scale-110 transition-all duration-200 z-40
            ${isMobile && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className={`
            absolute right-2 md:right-6 top-1/2 -translate-y-1/2 
            p-2 md:p-4 bg-black/50 backdrop-blur-sm border border-white/20 
            rounded-full text-white hover:bg-[#8b2727]/50 hover:border-[#8b2727]/50 
            hover:scale-110 transition-all duration-200 z-40
            ${isMobile && !showControls ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Video Play Button - Enhanced mobile experience */}
        {isVideo && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30"
            onMouseEnter={() => !isMobile && setShowControls(true)}
            onMouseLeave={() => !isMobile && setShowControls(false)}
          >
            <button
              onClick={togglePlay}
              className={`
                p-4 md:p-8 bg-black/50 backdrop-blur-sm border border-white/20 
                rounded-full text-white hover:bg-[#8b2727]/50 hover:border-[#8b2727]/50 
                hover:scale-110 transition-all duration-300 shadow-2xl
                ${(showControls || isMobile) ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-8 h-8 md:w-10 md:h-10" /> : <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />}
            </button>
          </div>
        )}

        {/* Bottom Content */}
        {!isVideo && currentItem && (
         <div className="absolute top-70 md:bottom-32 left-0 right-0 z-30">
  <div className="px-4 md:px-8 lg:px-12">
    <div className="max-w-4xl mx-auto pl-4 md:pl-6 lg:pl-12">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-white mb-2 md:mb-4 leading-tight">
        {currentItem.title}
      </h1>

      {currentItem.description && (
        <p className="text-white/90 text-sm md:text-lg mb-4 md:mb-6 max-w-3xl leading-relaxed line-clamp-3">
          {currentItem.description}
        </p>
      )}
    </div>
  </div>
</div>

        )}

        {/* Bottom Controls - Enhanced mobile layout */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300
            ${isMobile && !showControls ? "opacity-70" : "opacity-100"}
          `}
        >
          <div className="flex items-center justify-between px-3 md:px-6 pb-3 md:pb-6">
            {/* Slide Indicators */}
            <div className="flex items-center gap-1 md:gap-2">
              {mediaItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`
                    relative overflow-hidden rounded-full transition-all duration-300
                    ${
                      index === currentSlide
                        ? "w-8 md:w-12 h-2 md:h-2.5 bg-gradient-to-r from-[#8b2727] to-[#d2af6f] shadow-lg"
                        : "w-2 md:w-2.5 h-2 md:h-2.5 bg-white/40 hover:bg-white/60"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Pagination Counter */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full">
                <span className="text-white text-xs md:text-sm font-mono">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(mediaItems.length).padStart(2, "0")}
                </span>
                <div className="hidden md:flex items-center gap-1">
                  <div className="w-1 h-1 bg-white/60 rounded-full" />
                  <span className="text-white/80 text-xs">
                    {isVideo ? "VIDEO" : "IMAGE"}
                  </span>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSlider}
                className="p-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-[#8b2727]/50 transition-all duration-200"
                title="Reset to first slide"
                aria-label="Reset to first slide"
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
              </button>

              {/* Auto-play Toggle */}
              <button
                onClick={toggleAutoPlay}
                className={`
                  flex items-center gap-1 md:gap-2 px-3 py-1.5 rounded-full 
                  text-xs md:text-sm font-medium transition-all duration-200
                  ${isAutoPlay
                    ? "bg-[#8b2727]/90 text-white shadow-lg"
                    : "bg-[#d2af6f]/90 text-black hover:bg-[#8b2727]/90 hover:text-white"
                  }
                `}
                aria-label={`Turn autoplay ${isAutoPlay ? "off" : "on"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isAutoPlay ? "bg-white animate-pulse" : "bg-black/60"
                  }`}
                />
                <span>{isAutoPlay ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulSlider;
