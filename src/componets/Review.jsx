import React, { useState, useEffect } from 'react';

const Review = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      avatar: 'MJ',
      text: "The LED lights I purchased have transformed my entire home! The quality is outstanding and the energy savings are incredible. Installation was straightforward, and they've been running perfectly for over a year now.",
      author: 'Michael Johnson',
      role: 'Homeowner • California',
      rating: 5,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      avatar: 'SR',
      text: "As a contractor, I need reliable electrical supplies that won't let me down. This company delivers every time! Their circuit breakers and wiring materials are top-notch, and their customer service is exceptional.",
      author: 'Sarah Rodriguez',
      role: 'Licensed Electrician • Texas',
      rating: 5,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 3,
      avatar: 'DL',
      text: "I was renovating my office space and needed high-quality electrical fixtures. The smart switches and outlets I ordered exceeded my expectations. The app integration works flawlessly, and the build quality is impressive.",
      author: 'David Lee',
      role: 'Business Owner • New York',
      rating: 5,
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      avatar: 'EP',
      text: "The outdoor lighting system I purchased has completely transformed my garden. Weather-resistant, energy-efficient, and absolutely gorgeous at night. The motion sensors work perfectly, and installation was much easier than expected.",
      author: 'Emily Parker',
      role: 'Garden Enthusiast • Florida',
      rating: 5,
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 5,
      avatar: 'RT',
      text: "I've been in the electrical industry for 20 years, and I can confidently say this company offers some of the best products I've worked with. Their industrial-grade equipment is reliable, durable, and competitively priced.",
      author: 'Robert Thompson',
      role: 'Electrical Engineer • Illinois',
      rating: 5,
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      id: 6,
      avatar: 'AW',
      text: "The security lighting system I installed using their products has given me complete peace of mind. The motion detection is incredibly accurate, and the LED floodlights are bright and efficient. Professional quality at consumer-friendly prices.",
      author: 'Amanda Wilson',
      role: 'Security Consultant • Arizona',
      rating: 5,
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  const totalSlides = testimonials.length;

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const previousSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      previousSlide();
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xl transition-all duration-300 ${
            i < rating 
              ? 'text-yellow-400 drop-shadow-sm scale-110' 
              : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );

  const QuoteIcon = () => (
    <svg className="w-8 h-8 text-blue-500/20 absolute -top-2 -left-2" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-block p-2 bg-blue-100 rounded-full mb-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Trusted by thousands of customers worldwide for quality electrical products and exceptional service
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Live Reviews</span>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Slider */}
            <div 
              className="relative h-auto min-h-[500px] sm:min-h-[450px] lg:min-h-[400px] overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-10">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                ></div>
              </div>

              <div 
                className="flex h-full transition-all duration-700 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`min-w-full px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 flex items-center transition-all duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <div className="w-full max-w-5xl mx-auto">
                      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        {/* Avatar */}
                        <div className="flex-shrink-0 relative group">
                          <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white text-xl sm:text-2xl lg:text-3xl font-bold shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                            {testimonial.avatar}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                          <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                          <div className="relative">
                            <QuoteIcon />
                            <blockquote className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-700 mb-6 sm:mb-8 font-medium relative z-10">
                              "{testimonial.text}"
                            </blockquote>
                          </div>
                          
                          <div className="space-y-3 sm:space-y-4">
                            <div className="font-bold text-gray-900 text-lg sm:text-xl lg:text-2xl">
                              {testimonial.author}
                            </div>
                            
                            <div className="text-gray-600 text-sm sm:text-base font-medium">
                              {testimonial.role}
                            </div>
                            
                            <div className="flex justify-center lg:justify-start">
                              <StarRating rating={testimonial.rating} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                {/* Left: Previous Button */}
                <button
                  onClick={previousSlide}
                  className="order-2 sm:order-1 w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300 text-xl sm:text-2xl font-bold"
                >
                  ←
                </button>

                {/* Center: Dots and Counter */}
                <div className="order-1 sm:order-2 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  {/* Dots */}
                  <div className="flex gap-2 sm:gap-3">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative transition-all duration-300 ${
                          index === currentSlide 
                            ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full' 
                            : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125'
                        }`}
                      >
                        {index === currentSlide && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Counter */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-white/50">
                    <span className="text-sm sm:text-base font-bold text-gray-800">
                      {currentSlide + 1}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-sm sm:text-base font-medium text-gray-600">
                      {totalSlides}
                    </span>
                  </div>

                  {/* Auto-play indicator */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isAutoPlaying 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {isAutoPlaying ? '⏸️' : '▶️'}
                  </button>
                </div>

                {/* Right: Next Button */}
                <button
                  onClick={nextSlide}
                  className="order-3 w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300 text-xl sm:text-2xl font-bold"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '500+', label: 'Products' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 group"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600 mt-2 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;