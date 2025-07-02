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
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Chief Innovation Officer, FutureTech",
      company: "NASDAQ Listed",
      rating: 5,
      text: "Revolutionary platform that redefined our innovation pipeline. The AI-driven insights and seamless integration delivered unprecedented results across our entire organization.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      metrics: { improvement: "200%", revenue: "$8.7M", timeframe: "4 Months" },
      tags: ["Innovation", "AI-Powered"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = rect.height;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Check if we're in the scrollable area
      const containerStart = containerTop;
      const containerEnd = containerTop + containerHeight;
      const viewportCenter = scrollY + windowHeight / 2;

      if (viewportCenter >= containerStart && viewportCenter <= containerEnd) {
        // Calculate progress through the container
        const progressThroughContainer = (viewportCenter - containerStart) / containerHeight;
        const newActiveIndex = Math.min(
          reviews.length - 1,
          Math.max(0, Math.floor(progressThroughContainer * reviews.length))
        );
        
        setActiveIndex(newActiveIndex);

        // Apply smooth bottom-to-top transition effects
        reviewsRef.current.forEach((review, index) => {
          if (!review) return;
          
          // Calculate smooth transition progress
          const distanceFromActive = Math.abs(index - newActiveIndex);
          const transitionProgress = Math.max(0, 1 - distanceFromActive * 0.3);
          
          if (index === newActiveIndex) {
            // Currently active review - fully visible at center
            review.style.transform = `translateY(0px) scale(1)`;
            review.style.opacity = '1';
            review.style.zIndex = '30';
            review.style.filter = 'blur(0px) brightness(1) saturate(1.1)';
            review.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else if (index < newActiveIndex) {
            // Reviews that have been scrolled past - move up with decreasing opacity
            const pastDistance = newActiveIndex - index;
            const upwardOffset = pastDistance * 80; // Move further up
            const scaleReduction = Math.max(0.7, 1 - pastDistance * 0.08);
            const opacityReduction = Math.max(0.1, 1 - pastDistance * 0.25);
            
            review.style.transform = `translateY(-${upwardOffset}px) scale(${scaleReduction})`;
            review.style.opacity = `${opacityReduction}`;
            review.style.zIndex = `${20 - pastDistance}`;
            review.style.filter = `blur(${pastDistance * 2}px) brightness(${0.8 - pastDistance * 0.1}) saturate(0.7)`;
            review.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
          } else {
            // Upcoming reviews - start from bottom with low opacity, move up gradually
            const futureDistance = index - newActiveIndex;
            const bottomOffset = futureDistance * 120; // Start further down
            const scaleReduction = Math.max(0.75, 1 - futureDistance * 0.06);
            const opacityReduction = Math.max(0.2, 1 - futureDistance * 0.2);
            
            review.style.transform = `translateY(${bottomOffset}px) scale(${scaleReduction})`;
            review.style.opacity = `${opacityReduction}`;
            review.style.zIndex = `${25 - futureDistance}`;
            review.style.filter = `blur(${futureDistance * 1.5}px) brightness(${0.9 - futureDistance * 0.05}) saturate(0.8)`;
            review.style.boxShadow = '0 15px 30px -8px rgba(0, 0, 0, 0.3)';
          }

          // Apply smooth easing transition
          review.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
      }
    };

    // Use both scroll and resize events for better detection
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [activeIndex]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-black relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header Section - Reduced padding */}
      <div className="relative z-10 pt-6 pb-2 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-3 border border-white/20">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Industry Leaders Trust Us</span>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter leading-none">
            SUCCESS
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              STORIES
            </span>
          </h1>
          
          <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-4">
            Real transformations from industry leaders who achieved extraordinary results. 
            <span className="text-cyan-400 font-semibold"> Over $50M in value created.</span>
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            <div className="text-center">
              <div className="text-xl font-bold text-cyan-400 mb-1">500+</div>
              <div className="text-gray-400 text-xs">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-400 mb-1">40%</div>
              <div className="text-gray-400 text-xs">Average ROI Increase</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-400 mb-1">99.9%</div>
              <div className="text-gray-400 text-xs">Uptime SLA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Container - Reduced top margin */}
      <div 
        ref={containerRef}
        className="relative mt-4"
        style={{ height: `${reviews.length * 40}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-4">
          <div className="relative w-full max-w-5xl">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                ref={el => reviewsRef.current[index] = el}
                className="absolute inset-0 w-full"
                style={{ perspective: '1200px' }}
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden transform-gpu">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-500/10"></div>
                  
                  <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-16 h-16 rounded-2xl border-3 border-white/30 shadow-xl"
                          />
                          <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-green-400 bg-gray-900 rounded-full p-1" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{review.name}</h3>
                          <p className="text-cyan-400 font-semibold text-sm">{review.position}</p>
                          <p className="text-gray-400 text-sm">{review.company}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex gap-1 mb-2 justify-end">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {review.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-6">
                      <Quote className="absolute -top-2 -left-2 w-10 h-10 text-cyan-400/30" />
                      <blockquote className="text-xl text-white leading-relaxed font-light pl-6">
                        {review.text}
                      </blockquote>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <TrendingUp className="w-5 h-5 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">+{review.metrics.improvement}</span>
                        </div>
                        <div className="text-gray-300 font-medium text-sm">Performance Boost</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Zap className="w-5 h-5 text-cyan-400" />
                          <span className="text-2xl font-bold text-cyan-400">{review.metrics.revenue}</span>
                        </div>
                        <div className="text-gray-300 font-medium text-sm">Revenue Impact</div>
                      </div>
                      
                      <div className="text-center p-3 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Users className="w-5 h-5 text-purple-400" />
                          <span className="text-2xl font-bold text-purple-400">{review.metrics.timeframe}</span>
                        </div>
                        <div className="text-gray-300 font-medium text-sm">Time to Value</div>
                      </div>
                    </div>

                    {/* Review Counter */}
                    <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
                      <span className="text-white text-sm font-medium">
                        {index + 1} / {reviews.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-3">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-base text-gray-300 mb-6 max-w-xl mx-auto">
              Join these industry leaders and transform your business with proven results
            </p>
            <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full font-bold text-base hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105">
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