import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote, CheckCircle, TrendingUp, Award, Users, Zap } from 'lucide-react';

const Reviews = () => {
  const containerRef = useRef(null);
  const reviewsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechCorp",
      company: "Fortune 500",
      rating: 5,
      text: "This solution transformed our entire workflow. The ROI was evident within the first quarter, and our team productivity increased by 40%. The level of innovation and execution is simply outstanding.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      metrics: { improvement: "40%", revenue: "$2.4M", timeframe: "Q1 2024" },
      tags: ["Enterprise", "ROI Focused"]
    },
    {
      id: 2,
      name: "Michael Chen", 
      position: "CTO, InnovateX",
      company: "Tech Unicorn",
      rating: 5,
      text: "Exceptional technical implementation and architectural excellence. The scalability handled our 10x growth seamlessly. Best technical decision we've made in years.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      metrics: { improvement: "10x", revenue: "$5.1M", timeframe: "6 Months" },
      tags: ["Scalability", "Technical Excellence"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      position: "VP Operations, GlobalCorp",
      company: "Multinational",
      rating: 5,
      text: "Outstanding operational efficiency gains across 12 countries. The implementation was flawless and the ongoing support exceeded all expectations. Truly world-class.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      metrics: { improvement: "85%", revenue: "$3.8M", timeframe: "3 Months" },
      tags: ["Global Scale", "Operations"]
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Founder & CEO, StartupCo",
      company: "Y Combinator",
      rating: 5,
      text: "Game-changing solution that gave us the competitive edge we needed. From prototype to IPO, this platform scaled with us every step of the way. Absolutely essential.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      metrics: { improvement: "125%", revenue: "$12M", timeframe: "12 Months" },
      tags: ["Startup to IPO", "Growth"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const reviewHeight = containerHeight / reviews.length;

      // Calculate which review should be active
      const progress = Math.max(0, scrollY - containerTop + windowHeight / 2);
      const newActiveIndex = Math.min(
        reviews.length - 1,
        Math.floor(progress / reviewHeight)
      );
      setActiveIndex(newActiveIndex);

      reviewsRef.current.forEach((review, index) => {
        if (!review) return;

        const reviewStart = containerTop + (index * reviewHeight);
        const reviewEnd = reviewStart + reviewHeight;
        const reviewProgress = Math.max(0, Math.min(1, 
          (scrollY - reviewStart + windowHeight * 0.7) / reviewHeight
        ));

        if (index === newActiveIndex) {
          // Active review - fully visible and centered
          review.style.transform = `translateY(0) scale(1) rotateX(0deg)`;
          review.style.opacity = '1';
          review.style.zIndex = '20';
          review.style.filter = 'blur(0px) brightness(1)';
        } else if (index < newActiveIndex) {
          // Passed reviews - move up and fade
          review.style.transform = `translateY(-120px) scale(0.85) rotateX(15deg)`;
          review.style.opacity = '0.3';
          review.style.zIndex = '5';
          review.style.filter = 'blur(2px) brightness(0.7)';
        } else {
          // Upcoming reviews - stay below and slightly visible
          const upcomingOffset = (index - newActiveIndex) * 40;
          review.style.transform = `translateY(${80 + upcomingOffset}px) scale(0.9) rotateX(-10deg)`;
          review.style.opacity = '0.6';
          review.style.zIndex = `${15 - (index - newActiveIndex)}`;
          review.style.filter = 'blur(1px) brightness(0.8)';
        }

        // Smooth transitions
        review.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reviews.length]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Industry Leaders Trust Us</span>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
            SUCCESS
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              STORIES
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Real transformations from industry leaders who achieved extraordinary results. 
            <span className="text-cyan-400 font-semibold"> Over $50M in value created.</span>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">500+</div>
              <div className="text-gray-400 text-sm">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
              <div className="text-gray-400 text-sm">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime SLA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-3">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                index === activeIndex 
                  ? 'bg-cyan-400 h-12 shadow-lg shadow-cyan-400/50' 
                  : index < activeIndex 
                    ? 'bg-green-400/60' 
                    : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Reviews Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${reviews.length * 120}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-4">
          <div className="relative w-full max-w-5xl">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                ref={el => reviewsRef.current[index] = el}
                className="absolute inset-0 w-full"
                style={{ perspective: '1000px' }}
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-500/10"></div>
                  
                  <div className="relative z-10 p-12">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-20 h-20 rounded-2xl border-3 border-white/30 shadow-xl"
                          />
                          <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-green-400 bg-gray-900 rounded-full p-1" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{review.name}</h3>
                          <p className="text-cyan-400 font-semibold">{review.position}</p>
                          <p className="text-gray-400">{review.company}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex gap-1 mb-2 justify-end">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {review.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-8">
                      <Quote className="absolute -top-4 -left-2 w-12 h-12 text-cyan-400/30" />
                      <blockquote className="text-2xl text-white leading-relaxed font-light pl-8">
                        {review.text}
                      </blockquote>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-8">
                      <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <TrendingUp className="w-6 h-6 text-green-400" />
                          <span className="text-3xl font-bold text-green-400">+{review.metrics.improvement}</span>
                        </div>
                        <div className="text-gray-300 font-medium">Performance Boost</div>
                      </div>
                      
                      <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Zap className="w-6 h-6 text-cyan-400" />
                          <span className="text-3xl font-bold text-cyan-400">{review.metrics.revenue}</span>
                        </div>
                        <div className="text-gray-300 font-medium">Revenue Impact</div>
                      </div>
                      
                      <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Users className="w-6 h-6 text-purple-400" />
                          <span className="text-3xl font-bold text-purple-400">{review.metrics.timeframe}</span>
                        </div>
                        <div className="text-gray-300 font-medium">Time to Value</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-32 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-5xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join these industry leaders and transform your business with proven results
            </p>
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105">
              Start Your Transformation
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;