import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Heart, Share2 } from 'lucide-react';
import HeroVideo from "../assets/images/hero-video.mp4"

const BeautifulSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  // Mixed media data - images and videos
  const mediaItems = [
    {
      id: 1,
      type: 'image',
      title: "Neural Network Architecture",
      description: "Explore the intricate connections and pathways that form the backbone of artificial intelligence systems.",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&q=80",
      category: "AI Technology",
    },
    {
      id: 2,
      type: 'video',
      title: "Machine Learning in Action",
      url: HeroVideo,
      category: "Deep Learning"
    },
    {
      id: 3,
      type: 'image',
      title: "Quantum Computing Revolution",
      description: "Witness the convergence of quantum mechanics and artificial intelligence creating unprecedented computational possibilities.",
      url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&q=80",
      category: "Deep Learning"
    },
    {
      id: 4,
      type: 'video',
      title: "Future of AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80",
      category: "Innovation"
    },
    {
      id: 5,
      type: 'image',
      title: "Data Visualization Mastery",
      description: "Transform complex datasets into stunning visual narratives that reveal hidden patterns and insights.",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80",
      category: "Data Science",
    },
    {
      id: 6,
      type: 'video',
      title: "Robotics & AI",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&q=80",
      category: "Robotics"
    }
  ];

  const currentItem = mediaItems[currentSlide];
  const isVideo = currentItem.type === 'video';

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoPlay && !isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
      }, isVideo ? 8000 : 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, isPlaying, mediaItems.length, isVideo]);

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
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsPlaying(false);
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
    <>
      <div className="relative w-full h-[80vh] sm:h-[700px] overflow-hidden bg-black">
      {/* Main Media Container */}
      <div className="relative w-full h-[700px]">
        {/* Media Display */}
        <div className="absolute inset-0">
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
              className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
            />
          )}
          
          {/* Gradient Overlay for Images */}
          {!isVideo && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          )}
        </div>

        {/* Text Overlay for Images Only */}
        {!isVideo && (
          <div className="absolute inset-0 flex items-end justify-start p-6 sm:p-6 lg:p-12">
            <div className="max-w-3xl space-y-3 sm:space-y-6 animate-fade-in pb-100 sm:pb-80 lg:pb-30 sm:p-10 pl-10 sm:pl-15">
              
              
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-7xl font-bold text-white leading-tight">
                {currentItem.title}
              </h1>
              
              {/* Description */}
              <p className="text-white/90 text-sm sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                {currentItem.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-4 pt-2 sm:pt-4">
                <button className="group relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95 shadow-2xl">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  Read Article
                </button>
                
                <button className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 shadow-xl">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <button className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white/80 font-medium transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95 shadow-xl">
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Video Controls Overlay */}
        {isVideo && (
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              showControls ? 'bg-black/20' : 'bg-transparent'
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <div className={`transition-all duration-300 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <button
                onClick={togglePlay}
                className="p-4 sm:p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
              >
                {isPlaying ? <Pause className="w-8 h-8 sm:w-12 sm:h-12" /> : <Play className="w-8 h-8 sm:w-12 sm:h-12 ml-1" />}
              </button>
            </div>
          </div>
        )}

        {/* Top Controls Bar */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between">
          {/* Category Badge */}
          <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2 sm:mr-3"></div>
            <span className="text-white text-xs sm:text-sm font-medium">
              {currentItem.category}
            </span>
          </div>
            
          {/* Video Controls */}
          {isVideo && (
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleMute}
                className="p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-xl"
              >
                {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              <button className="p-2 sm:p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-xl">
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-90 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-90 -translate-y-1/2 p-3 sm:p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Controls */}
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center gap-1 sm:gap-2">
            {mediaItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'w-12 sm:w-16 h-2 sm:h-3 bg-white shadow-lg shadow-white/50'
                    : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/40 hover:bg-[#d2af6f]'
                }`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-[#8b2727] rounded-full"></div>
                )}
                {/* Media Type Indicator */}
                <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-white/60"></div>
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Slide Counter */}
            <div className="px-2 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-xl">
              <span className="text-white text-xs sm:text-sm font-medium">
                {String(currentSlide + 1).padStart(2, '0')} / {String(mediaItems.length).padStart(2, '0')}
              </span>
            </div>
            
            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-xl shadow-xl ${
                isAutoPlay
                  ? 'bg-[#8b2727] text-white border border-[#8b2727]'
                  : 'bg-[#d2af6f] text-black border border-[#d2af6f]'
              }`}
            >
              AUTO {isAutoPlay ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
);
};

export default BeautifulSlider;