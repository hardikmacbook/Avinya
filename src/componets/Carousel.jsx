import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Heart, Share2, Eye, Clock, MoreHorizontal } from 'lucide-react';

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
      type: 'image',
      title: "Neural Network Architecture",
      description: "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=80",
      category: "AI Technology",
      duration: "3 min read",
      views: "12.5K"
    },
    {
      id: 2,
      type: 'video',
      title: "Machine Learning in Action",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&q=80",
      category: "Deep Learning",
      duration: "2:15",
      views: "8.2K"
    },
    {
      id: 3,
      type: 'image',
      title: "Quantum Computing Revolution",
      description: "Witness the convergence of quantum mechanics and artificial intelligence creating unprecedented computational possibilities.",
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=80",
      category: "Quantum Tech",
      duration: "5 min read",
      views: "15.8K"
    },
    {
      id: 4,
      type: 'video',
      title: "Future of AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80",
      category: "Innovation",
      duration: "4:30",
      views: "22.1K"
    },
    {
      id: 5,
      type: 'image',
      title: "Data Visualization Mastery",
      description: "Transform complex datasets into stunning visual narratives that reveal hidden patterns and insights.",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80",
      category: "Data Science",
      duration: "4 min read",
      views: "9.7K"
    },
    {
      id: 6,
      type: 'video',
      title: "Robotics & AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&q=80",
      category: "Robotics",
      duration: "3:45",
      views: "18.3K"
    }
  ];

  const currentItem = mediaItems[currentSlide];
  const isVideo = currentItem.type === 'video';

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
  }, [isAutoPlay, isPlaying, currentSlide, mediaItems.length, isVideo, isLoaded]);

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
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setProgress(0);
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

  return (
    <div className={`
      relative w-full transition-all duration-700 ease-out
      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      {/* Main Container - Responsive Height */}
      <div 
        ref={containerRef}
        className="
          relative w-full overflow-hidden
          h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh]
          min-h-[400px] max-h-[900px]
          rounded-2xl sm:rounded-3xl
          bg-gradient-to-br from-gray-900 to-black
          shadow-2xl
        "
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/30 z-30">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
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

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 sm:p-6 z-40">
          {/* Category Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/20">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-xs sm:text-sm font-medium">{currentItem.category}</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Views */}
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20">
              <Eye className="w-4 h-4 text-white/80" />
              <span className="text-white text-sm font-medium">{currentItem.views}</span>
            </div>

            {/* Video Controls */}
            {isVideo && (
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 sm:p-2.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                <button className="hidden sm:block p-2.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* More Options */}
            <button className="p-2 sm:p-2.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 z-40"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-110 transition-all duration-200 z-40"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
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
                p-4 sm:p-6 lg:p-8 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full text-white 
                hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-2xl
                ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
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

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          {/* Content Info */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
            <div className="max-w-4xl">
              {/* Duration/Type Badge */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-xl">
                  <Clock className="w-3 h-3 text-white/80" />
                  <span className="text-white text-xs font-medium">{currentItem.duration}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isVideo 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {isVideo ? 'VIDEO' : 'ARTICLE'}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight">
                {currentItem.title}
              </h1>

              {/* Description - Only for Images */}
              {!isVideo && currentItem.description && (
                <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-3xl leading-relaxed">
                  {currentItem.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105">
                  <Play className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{isVideo ? 'Watch' : 'Read'}</span>
                </button>
                
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-200">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Save</span>
                </button>
                
                <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-white hover:bg-white/30 transition-all duration-200">
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between px-4 sm:px-6 pb-4 sm:pb-6">
            {/* Slide Indicators */}
            <div className="flex items-center gap-1 sm:gap-2">
              {mediaItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`
                    relative overflow-hidden rounded-full transition-all duration-300 group
                    ${index === currentSlide
                      ? 'w-8 sm:w-12 h-2 sm:h-2.5 bg-white shadow-lg'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/60'
                    }
                  `}
                >
                  <div className={`absolute top-0 right-0 w-1 h-1 rounded-full ${
                    item.type === 'video' ? 'bg-red-400' : 'bg-blue-400'
                  }`}></div>
                </button>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Counter */}
              <div className="px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/20 rounded-full">
                <span className="text-white text-xs sm:text-sm font-mono">
                  {String(currentSlide + 1).padStart(2, '0')}/{String(mediaItems.length).padStart(2, '0')}
                </span>
              </div>
              
              {/* Auto-play Toggle */}
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`
                  px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                  ${isAutoPlay
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                  }
                `}
              >
                AUTO {isAutoPlay ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulSlider;