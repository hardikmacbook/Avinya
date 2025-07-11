import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  Share2,
  Eye,
  Clock,
  MoreHorizontal,
  MessageCircle,
  Instagram,
  Copy,
  X,
  RotateCcw,
} from "lucide-react";
import HeroImg1 from "../assets/images/demo1.jpg";
import thumbnail from "../assets/images/demo2.jpg";

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Demo",
      description:
        "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: HeroImg1,
    },
    {
      id: 2,
      type: "video",
      title: "Machine Learning in Action",
      url: "https://go.screenpal.com/watch/cTiXfInlgjI",
      thumbnail: thumbnail,
    },
    {
      id: 3,
      type: "image",
      title: "Demo",
      description:
        "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: HeroImg1,
    },
    {
      id: 4,
      type: "video",
      title: "Machine Learning in Action",
      url: "https://go.screenpal.com/watch/cTiXfInlgjI",
      thumbnail: thumbnail,
    },
    {
      id: 5,
      type: "image",
      title: "Demo",
      description:
        "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: "https://go.screenpal.com/watch/cTiXfInlgjI",
    },
  ];

  const currentItem = mediaItems[currentSlide];
  const isVideo = currentItem.type === "video";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Progress and auto-slide
  useEffect(() => {
    if (isAutoPlay && !isPlaying && isLoaded) {
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
  }, [
    isAutoPlay,
    isPlaying,
    currentSlide,
    mediaItems.length,
    isVideo,
    isLoaded,
  ]);

  // Video handling
  useEffect(() => {
    if (videoRef.current && isVideo) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  }, [currentSlide, isVideo]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
    setShowShareMenu(false);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
    setIsPlaying(false);
    setProgress(0);
    setShowShareMenu(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setProgress(0);
    setShowShareMenu(false);
  };

  const togglePlay = () => {
    if (isVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    if (!isAutoPlay) {
      setProgress(0);
    }
  };

  const resetSlider = () => {
    setCurrentSlide(0);
    setIsPlaying(false);
    setProgress(0);
    setShowShareMenu(false);
  };

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
          shadow-2xl
        "
      >
        {/* Enhanced Progress Bar
        <div className="absolute top-0 left-0 right-0 h-2 bg-black z-30">
          <div 
            className="h-full bg-[#8b2727] transition-all duration-100 ease-linear relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 w-2 h-full bg-[#d2af6f] rounded-full"></div>
          </div>
        </div> */}

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
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={currentItem.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={currentItem.url}
              alt={currentItem.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          )}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-20"></div>

        {/* Enhanced Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 sm:p-4 md:p-6 z-40">
          {/* Left Side */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Auto Play Status */}
            <div
              className={`my-2 px-1.5 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                isAutoPlay
                  ? "bg-[#d2af6f] text-black border border-[#d2af6f]/30"
                  : "bg-[#8b2727] text-white border border-[#8b2727]/30"
              }`}
            >
              {isAutoPlay ? "AUTO" : "MANUAL"}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Video Controls */}
            {isVideo && (
              <>
                <button
                  onClick={toggleMute}
                  className="p-1.5 sm:p-2 md:p-2.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-[#8b2727]/40 transition-all duration-200"
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-[#8b2727]/40 hover:border-[#8b2727]/40 hover:scale-110 transition-all duration-200 z-40"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-[#8b2727]/40 hover:border-[#8b2727]/40 hover:scale-110 transition-all duration-200 z-40"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Video Play Button */}
        {isVideo && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <button
              onClick={togglePlay}
              className={`
                p-3 sm:p-4 md:p-6 lg:p-8 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white 
                hover:bg-[#8b2727]/40 hover:border-[#8b2727]/40 hover:scale-110 transition-all duration-300 shadow-2xl
                ${showControls ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-1" />
              )}
            </button>
          </div>
        )}

        {/* Bottom Content - Only for Images */}
        {!isVideo && (
          <div className="absolute bottom-40 left-10 right-0 z-30">
            <div className="ml-2 sm:ml-4 md:ml-6 lg:ml-8 pl-2 sm:pl-4 md:pl-6 lg:pl-8 pr-2 sm:pr-4 md:pr-6 pb-4 sm:pb-6">
              <div className="max-w-4xl">
                {/* Title */}
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                  {currentItem.title}
                </h1>

                {/* Description */}
                {currentItem.description && (
                  <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 max-w-3xl leading-relaxed">
                    {currentItem.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6"></div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 pb-2 sm:pb-4 md:pb-6">
            {/* Left Side - Slide Indicators */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
              {mediaItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`
                    relative overflow-hidden rounded-full transition-all duration-300 group
                    ${
                      index === currentSlide
                        ? "w-6 sm:w-8 md:w-12 h-1.5 sm:h-2 md:h-2.5 bg-[#8b2727] shadow-lg"
                        : "w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-white/60 hover:bg-white/60"
                    }
                  `}
                ></button>
              ))}
            </div>

            {/* Right Side - Enhanced Controls */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              {/* Enhanced Pagination Counter */}
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full">
                <span className="text-white text-xs sm:text-sm font-mono">
                  {String(currentSlide + 1).padStart(2, "0")} of{" "}
                  {String(mediaItems.length).padStart(2, "0")}
                </span>
                <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/60 rounded-full"></div>
                <span className="text-white/80 text-xs hidden sm:inline">
                  {isVideo ? "VIDEO" : "ARTICLE"}
                </span>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSlider}
                className="p-1.5 sm:p-2 md:p-2.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-[#8b2727]/40 hover:border-[#8b2727]/40 transition-all duration-200 hover:scale-105"
                title="Reset to first slide"
              >
                <RotateCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
              </button>

              {/* Enhanced Auto-play Toggle */}
              <button
                onClick={toggleAutoPlay}
                className={`
                  flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                  ${
                    isAutoPlay
                      ? "bg-[#8b2727] text-white shadow-lg shadow-[#8b2727]/25"
                      : "bg-[#d2af6f] text-black hover:bg-[#8b2727] hover:text-white"
                  }
                `}
              >
                <div
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    isAutoPlay ? "bg-white animate-pulse" : "bg-white/60"
                  }`}
                ></div>
                <span className="hidden sm:inline">
                  AUTO {isAutoPlay ? "ON" : "OFF"}
                </span>
                <span className="sm:hidden">{isAutoPlay ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulSlider;
