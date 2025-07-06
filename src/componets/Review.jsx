import React, { useState, useEffect } from 'react';

const Review = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Rahul Patel (રાહુલ પટેલ)",
      role: "Factory Supervisor",
      location: "Vapi GIDC",
      rating: 5,
      review: "Avinya Electricals has been our trusted partner for all industrial electrical needs. Their Vapi office is very supportive. Their product quality is top-notch, and rates are fair too. Highly recommended!",
      avatar: "RP",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      id: 2,
      name: "Mehul Shah (મેહુલ શાહ)",
      role: "Workshop Owner",
      location: "Silvassa",
      rating: 5,
      review: "I've been dealing with Avinya Electricals Silvassa branch for many years. They always provide the right products on time and guide technically whenever needed. Highly recommended supplier in Silvassa region.",
      avatar: "MS",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      id: 3,
      name: "Kiran Desai (કિરણ દેસાઈ)",
      role: "Maintenance Engineer",
      location: "Vapi",
      rating: 4,
      review: "Good service from Avinya Electricals, Vapi branch. Product range is wide, but sometimes a few items are out of stock, causing minor delays. Overall, a reliable supplier for industries.",
      avatar: "KD",
      gradient: "from-amber-600 to-orange-600"
    },
    {
      id: 4,
      name: "Nilesh Joshi (નિલેશ જોશી)",
      role: "Production Manager",
      location: "Silvassa",
      rating: 4,
      review: "We regularly purchase from Avinya Electricals Silvassa. They are dependable and deliveries are generally on time. However, their billing process can be a bit slow sometimes.",
      avatar: "NJ",
      gradient: "from-purple-600 to-violet-600"
    },
    {
      id: 5,
      name: "Hardik Trivedi (હાર્દિક ત્રિવેદી)",
      role: "Purchase Officer",
      location: "Vapi",
      rating: 3,
      review: "Avinya Electricals from Vapi office has good products, but their customer support during emergencies can be slow. Response time needs improvement.",
      avatar: "HT",
      gradient: "from-slate-600 to-gray-600"
    },
    {
      id: 6,
      name: "Jignesh Chauhan (જિગ્નેશ ચૌહાણ)",
      role: "Plant Incharge",
      location: "Silvassa",
      rating: 2,
      review: "My experience with Avinya Electricals Silvassa was average. Delivery was delayed and communication was poor. Had to follow up multiple times for updates.",
      avatar: "JC",
      gradient: "from-red-600 to-rose-600"
    },
    {
      id: 7,
      name: "Dipak Parmar (દિપક પરમાર)",
      role: "Electrical Contractor",
      location: "Vapi",
      rating: 3,
      review: "Avinya Electricals Vapi provides reasonable products, but staff handling needs improvement. Good for regular items, but not very strong for technical queries.",
      avatar: "DP",
      gradient: "from-cyan-600 to-blue-600"
    },
    {
      id: 8,
      name: "Vishal Bhatt (વિશાલ ભટ્ટ)",
      role: "Industrial Project Consultant",
      location: "Silvassa",
      rating: 5,
      review: "Excellent service by Avinya Electricals Silvassa. We recently ordered large industrial panels, and everything from quotation to delivery was handled smoothly. Very professional and trustworthy.",
      avatar: "VB",
      gradient: "from-green-600 to-emerald-600"
    }
  ];

  const totalSlides = testimonials.length;

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 4000);
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

  const StarRating = ({ rating }) => (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">
        {rating}/5
      </span>
    </div>
  );

  const LocationBadge = ({ location }) => (
    <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {location}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Customer Reviews</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by industries across Vapi and Silvassa for quality electrical products and exceptional service
          </p>
        </div>

        {/* Review Slider */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
              />
            </div>

            {/* Slides */}
            <div className="relative h-96 overflow-hidden">
              <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="min-w-full px-8 py-8 flex items-center"
                  >
                    <div className="w-full max-w-4xl mx-auto">
                      <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className={`w-20 h-20 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                            {testimonial.avatar}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                          <div className="mb-4">
                            <StarRating rating={testimonial.rating} />
                          </div>
                          
                          <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                            "{testimonial.review}"
                          </blockquote>
                          
                          <div className="space-y-2">
                            <div className="font-semibold text-gray-900 text-lg">
                              {testimonial.name}
                            </div>
                            <div className="text-gray-600">
                              {testimonial.role}
                            </div>
                            <div className="flex justify-center lg:justify-start">
                              <LocationBadge location={testimonial.location} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                {/* Previous Button */}
                <button
                  onClick={previousSlide}
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Center Controls */}
                <div className="flex items-center gap-4">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-blue-500 w-6' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Counter */}
                  <div className="text-sm text-gray-600 font-medium">
                    {currentSlide + 1} / {totalSlides}
                  </div>

                  {/* Auto-play Toggle */}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`p-2 rounded-full transition-colors ${
                      isAutoPlaying 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {isAutoPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '500+', label: 'Happy Customers', icon: '😊' },
            { number: '95%', label: 'Satisfaction Rate', icon: '⭐' },
            { number: '2', label: 'Branch Locations', icon: '📍' },
            { number: '24/7', label: 'Customer Support', icon: '🛟' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;