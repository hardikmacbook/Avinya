import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Heart, Share2, Eye, Clock } from 'lucide-react';

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  // Mixed media data - images and videos
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      title: "Neural Network Architecture",
      description: "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=80",
      category: "AI Technology",
      duration: "3 min read"
    },
    {
      id: 2,
      type: 'video',
      title: "Machine Learning in Action",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&q=80",
      category: "Deep Learning",
      duration: "2:15"
    },
    {
      id: 3,
      type: 'image',
      title: "Quantum Computing Revolution",
      description: "Witness the convergence of quantum mechanics and artificial intelligence creating unprecedented computational possibilities.",
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=80",
      category: "Quantum Tech",
      duration: "5 min read"
    },
    {
      id: 4,
      type: 'video',
      title: "Future of AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80",
      category: "Innovation",
      duration: "4:30"
    },
    {
      id: 5,
      type: 'image',
      title: "Data Visualization Mastery",
      description: "Transform complex datasets into stunning visual narratives that reveal hidden patterns and insights.",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80",
      category: "Data Science",
      duration: "4 min read"
    },
    {
      id: 6,
      type: 'video',
      title: "Robotics & AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&q=80",
      category: "Robotics",
      duration: "3:45"
    }
  ];

  const currentItem = mediaItems[currentSlide];
  const isVideo = currentItem.type === 'video';

  // Progress bar animation
  useEffect(() => {
    if (isAutoPlay && !isPlaying) {
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
  }, [isAutoPlay, isPlaying, currentSlide, mediaItems.length, isVideo]);

  // Reset video when slide changes
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
    <div className="relative w-full aspect-video max-h-[80vh] min-h-[400px] overflow-hidden bg-black rounded-3xl shadow-2xl">
      {/* Main Media Container */}
      <div className="relative w-full h-full">
        {/* Media Display */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {isVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
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
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform hover:scale-105"
            />
          )}
          
          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
          
          {/* Animated particles overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Progress Bar */}
        {isAutoPlay && !isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 rounded-t-3xl overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Text Overlay for Images */}
        {!isVideo && (
          <div className="absolute inset-0 flex items-end justify-start p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl space-y-2 sm:space-y-4 lg:space-y-6 animate-fade-in">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 shadow-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                <span className="text-white text-xs sm:text-sm font-medium">
                  {currentItem.category}
                </span>
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                <span className="text-white/80 text-xs sm:text-sm">
                  {currentItem.duration}
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-lg sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {currentItem.title}
              </h1>
              
              {/* Description */}
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl">
                {currentItem.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 sm:pt-4">
                <button className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Read Article
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline text-sm">Like</span>
                </button>
                
                <button className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Controls Overlay */}
        {isVideo && (
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              showControls ? 'bg-black/30' : 'bg-transparent'
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl border border-white/30">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {currentItem.category}
                    </span>
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                    <span className="text-white/80 text-xs sm:text-sm">
                      {currentItem.duration}
                    </span>
                  </div>
                  <h2 className="text-white text-lg sm:text-xl font-bold">
                    {currentItem.title}
                  </h2>
                </div>
              </div>
            </div>
            
            {/* Play Button */}
            <div className={`transition-all duration-300 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <button
                onClick={togglePlay}
                className="p-4 sm:p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-full text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
              >
                {isPlaying ? <Pause className="w-6 h-6 sm:w-8 sm:h-8" /> : <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />}
              </button>
            </div>
          </div>
        )}

        {/* Top Controls Bar */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
          {/* Left Badge */}
          <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 shadow-lg">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 mr-1 sm:mr-2" />
            <span className="text-white text-xs sm:text-sm font-medium">
              {Math.floor(Math.random() * 1000) + 500}
            </span>
          </div>
            
          {/* Video Controls */}
          {isVideo && (
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              
              <button className="p-2 sm:p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg opacity-80 hover:opacity-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg opacity-80 hover:opacity-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
          {/* Slide Indicators */}
          <div className="flex items-center gap-1 sm:gap-2">
            {mediaItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-500 group ${
                  index === currentSlide
                    ? 'w-8 sm:w-12 h-2 sm:h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                    : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/60'
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                )}
                {/* Media Type Indicator */}
                <div className={`absolute top-0 right-0 w-1 h-1 rounded-full ${
                  item.type === 'video' ? 'bg-red-400' : 'bg-blue-400'
                }`}></div>
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Slide Counter */}
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-black/30 backdrop-blur-xl border border-white/20 rounded-full shadow-lg">
              <span className="text-white text-xs sm:text-sm font-medium">
                {String(currentSlide + 1).padStart(2, '0')} / {String(mediaItems.length).padStart(2, '0')}
              </span>
            </div>
            
            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-xl shadow-lg hover:scale-105 ${
                isAutoPlay
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-blue-400'
                  : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
              }`}
            >
              AUTO {isAutoPlay ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautifulSlider;