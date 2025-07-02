import React, { useEffect, useRef } from 'react';
import { Star, User } from 'lucide-react';

const Reviews = () => {
  const containerRef = useRef(null);
  const reviewsRef = useRef([]);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely incredible experience! The attention to detail and customer service exceeded all my expectations.",
      avatar: "SJ",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen", 
      rating: 5,
      text: "Outstanding quality and fast delivery. The team was responsive and professional throughout the entire process.",
      avatar: "MC",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 4,
      text: "Great value for money! The product quality is excellent and the user experience is smooth.",
      avatar: "ER", 
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Exceptional service from start to finish. The team went above and beyond to ensure everything was perfect.",
      avatar: "DT",
      date: "1 week ago"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const reviewHeight = containerHeight / reviews.length;

      reviewsRef.current.forEach((review, index) => {
        if (!review) return;

        const reviewStart = containerTop + (index * reviewHeight);
        const reviewEnd = reviewStart + reviewHeight;
        const progress = Math.max(0, Math.min(1, (scrollY - reviewStart + window.innerHeight/2) / reviewHeight));

        if (scrollY >= reviewStart - window.innerHeight/2 && scrollY <= reviewEnd + window.innerHeight/2) {
          // Active review - pin it
          review.style.transform = `translateY(0) scale(1)`;
          review.style.opacity = '1';
          review.style.zIndex = '10';
        } else if (scrollY > reviewEnd + window.innerHeight/2) {
          // Passed review - move up
          review.style.transform = `translateY(-100px) scale(0.9)`;
          review.style.opacity = '0.6';
          review.style.zIndex = '1';
        } else {
          // Upcoming review - stay below
          review.style.transform = `translateY(50px) scale(0.95)`;
          review.style.opacity = '0.8';
          review.style.zIndex = '5';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="pt-20 pb-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Customer Reviews</h1>
        <p className="text-gray-300 text-xl">What our customers say about us</p>
      </div>

      {/* Reviews Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${reviews.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-4">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              ref={el => reviewsRef.current[index] = el}
              className="absolute w-full max-w-2xl transition-all duration-500 ease-out"
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  "{review.text}"
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-gray-500">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Verified Customer</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Review {index + 1} of {reviews.length}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to join them?</h2>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Reviews;