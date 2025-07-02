import React, { useEffect, useState, useRef } from 'react';
import { Star, User } from 'lucide-react';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const containerRef = useRef(null);
  const reviewsRef = useRef([]);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely incredible experience! The attention to detail and customer service exceeded all my expectations. I would definitely recommend this to anyone looking for quality.",
      avatar: "SJ",
      date: "2 weeks ago",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Outstanding quality and fast delivery. The team was responsive and professional throughout the entire process. Couldn't be happier with the results.",
      avatar: "MC",
      date: "1 month ago",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 4,
      text: "Great value for money! The product quality is excellent and the user experience is smooth. Minor improvements could be made but overall very satisfied.",
      avatar: "ER",
      date: "3 weeks ago",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Exceptional service from start to finish. The team went above and beyond to ensure everything was perfect. Will definitely be using their services again.",
      avatar: "DT",
      date: "1 week ago",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      rating: 5,
      text: "Phenomenal experience! Every detail was carefully considered and executed flawlessly. The results speak for themselves - truly professional work.",
      avatar: "LA",
      date: "4 days ago",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate which review should be active based on scroll position
      const scrollProgress = Math.max(0, scrollY - containerTop + windowHeight / 2);
      const reviewHeight = containerHeight / reviews.length;
      const currentIndex = Math.min(
        reviews.length - 1,
        Math.floor(scrollProgress / reviewHeight)
      );

      setActiveReview(currentIndex);

      // Apply transforms to create the pinning effect
      reviewsRef.current.forEach((review, index) => {
        if (!review) return;

        const reviewTop = index * reviewHeight;
        const reviewBottom = reviewTop + reviewHeight;
        const isActive = index === currentIndex;
        const isPassed = scrollProgress > reviewBottom;

        if (isPassed) {
          // Review has been scrolled past - move it up
          review.style.transform = `translateY(-${scrollProgress - reviewBottom + 100}px) scale(0.95)`;
          review.style.opacity = '0.7';
          review.style.zIndex = '1';
        } else if (isActive) {
          // Currently active review - pin it
          review.style.transform = 'translateY(0) scale(1)';
          review.style.opacity = '1';
          review.style.zIndex = '10';
        } else {
          // Upcoming review - keep it in normal position
          review.style.transform = `translateY(${Math.max(0, reviewTop - scrollProgress)}px) scale(0.95)`;
          review.style.opacity = '0.8';
          review.style.zIndex = '5';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [reviews.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header Section */}
      <div className="relative z-20 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
            Customer Reviews
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover what our amazing customers have to say about their experiences
          </p>
        </div>
      </div>

      {/* Pinned Reviews Container */}
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
              className="absolute w-full max-w-2xl transition-all duration-300 ease-out"
            >
              <div className={`bg-gradient-to-br ${review.color} p-1 rounded-2xl shadow-2xl`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {review.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
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
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <div className="relative z-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;