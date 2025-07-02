import React, { useEffect, useState, useRef } from 'react';
import { Star, User, Shield, Award, Zap, Heart } from 'lucide-react';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const reviewsRef = useRef([]);
  const canvasRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "This completely transformed my business! The ROI was incredible and the team's expertise is unmatched. Pure magic!",
      avatar: "SJ",
      date: "2 weeks ago",
      gradient: "from-violet-600 via-purple-600 to-fuchsia-600",
      bgGradient: "from-violet-900/20 via-purple-900/20 to-fuchsia-900/20",
      icon: Shield,
      title: "Business Owner",
      metric: "300% ROI"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Mind-blowing results! The innovation and attention to detail exceeded every expectation. This is the future!",
      avatar: "MC",
      date: "1 month ago",
      gradient: "from-cyan-500 via-blue-600 to-indigo-600",
      bgGradient: "from-cyan-900/20 via-blue-900/20 to-indigo-900/20",
      icon: Zap,
      title: "Tech Executive",
      metric: "10x Faster"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      text: "Revolutionary experience! Every interaction was seamless and the results speak for themselves. Absolutely phenomenal!",
      avatar: "ER",
      date: "3 weeks ago",
      gradient: "from-emerald-500 via-green-600 to-teal-600",
      bgGradient: "from-emerald-900/20 via-green-900/20 to-teal-900/20",
      icon: Award,
      title: "Creative Director",
      metric: "Award Winner"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      text: "Extraordinary craftsmanship! The level of innovation and execution is beyond anything I've experienced before.",
      avatar: "DT",
      date: "1 week ago",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      bgGradient: "from-orange-900/20 via-red-900/20 to-pink-900/20",
      icon: Heart,
      title: "Product Manager",
      metric: "100% Satisfied"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      rating: 5,
      text: "Pure perfection! Every detail was crafted with precision and the final result exceeded my wildest dreams!",
      avatar: "LA",
      date: "4 days ago",
      gradient: "from-indigo-500 via-purple-600 to-pink-600",
      bgGradient: "from-indigo-900/20 via-purple-900/20 to-pink-900/20",
      icon: Star,
      title: "Design Lead",
      metric: "Perfect Score"
    }
  ];

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    initParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.max(0, scrollY - containerTop + windowHeight / 2);
      const reviewHeight = containerHeight / reviews.length;
      const currentIndex = Math.min(
        reviews.length - 1,
        Math.floor(scrollProgress / reviewHeight)
      );

      setActiveReview(currentIndex);

      reviewsRef.current.forEach((review, index) => {
        if (!review) return;

        const reviewTop = index * reviewHeight;
        const reviewBottom = reviewTop + reviewHeight;
        const isActive = index === currentIndex;
        const isPassed = scrollProgress > reviewBottom;
        const progress = Math.min(1, Math.max(0, (scrollProgress - reviewTop) / reviewHeight));

        if (isPassed) {
          review.style.transform = `
            translateY(-${scrollProgress - reviewBottom + 200}px) 
            rotateX(45deg) 
            rotateY(-15deg) 
            scale(0.8)
          `;
          review.style.opacity = '0.3';
          review.style.filter = 'blur(8px)';
          review.style.zIndex = '1';
        } else if (isActive) {
          const rotateX = (progress - 0.5) * 10;
          const rotateY = Math.sin(progress * Math.PI) * 5;
          const floatY = Math.sin(Date.now() * 0.001 + index) * 5;
          
          review.style.transform = `
            translateY(${floatY}px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${1 + progress * 0.1})
          `;
          review.style.opacity = '1';
          review.style.filter = 'blur(0px) drop-shadow(0 25px 50px rgba(0,0,0,0.5))';
          review.style.zIndex = '10';
        } else {
          const upcomingOffset = Math.max(0, reviewTop - scrollProgress);
          review.style.transform = `
            translateY(${upcomingOffset * 0.5}px) 
            rotateX(-20deg) 
            scale(0.9)
          `;
          review.style.opacity = '0.6';
          review.style.filter = 'blur(2px)';
          review.style.zIndex = '5';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [reviews.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-all duration-300 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
            : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `scale(${particle.size})`,
              boxShadow: '0 0 6px rgba(255,255,255,0.8)'
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
               `,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-5 transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)',
          borderRadius: '50%'
        }}
      />

      {/* Header Section */}
      <div className="relative z-20 pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-8">
            <div className="bg-black px-8 py-2 rounded-full">
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                ⭐ TESTIMONIALS
              </span>
            </div>
          </div>
          
          <h1 className="text-7xl font-black text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text mb-8 tracking-tight">
            LEGENDARY
            <br />
            <span className="text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text">
              EXPERIENCES
            </span>
          </h1>
          
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the transformative stories from our community of innovators, creators, and visionaries
          </p>
          
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">98%</div>
              <div className="text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">5.0★</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">10K+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ height: `${reviews.length * 120}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-4">
          {reviews.map((review, index) => {
            const IconComponent = review.icon;
            return (
              <div
                key={review.id}
                ref={el => reviewsRef.current[index] = el}
                className="absolute w-full max-w-4xl transition-all duration-700 ease-out perspective-1000"
                style={{ 
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <div className={`relative bg-gradient-to-br ${review.bgGradient} backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden`}>
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 animate-pulse">
                    <div className="h-full w-full rounded-3xl bg-black/90 backdrop-blur-xl" />
                  </div>
                  
                  <div className="relative z-10 p-12">
                    {/* Header with 3D Elements */}
                    <div className="flex items-start gap-6 mb-8">
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-110 transition-all duration-300`}>
                          {review.avatar}
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-3xl font-bold text-white">
                            {review.name}
                          </h3>
                          <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${review.gradient} text-white text-sm font-semibold`}>
                            {review.title}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex gap-1">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-gray-400 text-lg">
                            {review.date}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-green-400">
                            <IconComponent className="w-5 h-5" />
                            <span className="font-semibold">{review.metric}</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-400">
                            <User className="w-4 h-4" />
                            <span className="text-sm">Verified Client</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quote with Enhanced Typography */}
                    <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic font-light relative">
                      <span className="text-6xl text-purple-400/30 absolute -top-4 -left-2">"</span>
                      <span className="relative z-10">{review.text}</span>
                      <span className="text-6xl text-purple-400/30 absolute -bottom-8 -right-2">"</span>
                    </blockquote>

                    {/* Enhanced Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                          <span className="text-sm text-gray-300">Review {index + 1} of {reviews.length}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-400 font-semibold">Live Review</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Epic Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
          {reviews.map((review, index) => (
            <div key={index} className="relative mb-3 last:mb-0">
              <div className={`w-3 h-12 rounded-full transition-all duration-500 ${
                index === activeReview
                  ? `bg-gradient-to-b ${review.gradient} shadow-lg scale-125`
                  : index < activeReview
                  ? 'bg-white/50'
                  : 'bg-white/20'
              }`} />
              {index === activeReview && (
                <div className="absolute -left-2 -top-1 w-7 h-14 rounded-full bg-white/20 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Epic CTA Section */}
      <div className="relative z-20 py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-6xl font-black text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text mb-6">
              Ready to Create Your Own
              <br />
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                LEGENDARY STORY?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied customers and experience the transformation yourself
            </p>
          </div>
          
          <div className="relative inline-block">
            <button className="relative group bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-12 py-6 rounded-2xl font-bold text-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-6 h-6" />
                START YOUR JOURNEY
                <Star className="w-6 h-6 fill-current" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;