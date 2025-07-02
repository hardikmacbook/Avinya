

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, Quote } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechCorp",
    company: "TechCorp",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "This product has completely transformed how we handle our business operations. The team's dedication to excellence is evident in every feature.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateLab",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Outstanding service and incredible results. Our productivity has increased by 300% since implementing this solution. Highly recommended!",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "GrowthCo",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The attention to detail and customer support is unmatched. This platform has become an essential part of our daily workflow.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Founder",
    company: "StartupXYZ",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Game-changing technology that scales with your business. The ROI we've seen is incredible, and the team is always there to help.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "CTO",
    company: "FutureTech",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Seamless integration and powerful features. This solution has streamlined our processes and improved our team's efficiency dramatically.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    name: "James Miller",
    role: "Operations Manager",
    company: "ScaleCorp",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Exceptional quality and reliability. The platform has exceeded our expectations and continues to deliver outstanding results every day.",
    gradient: "from-teal-500 to-blue-500",
  },
]

export default function Review() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scrollContainer = scrollContainerRef.current

    if (!container || !scrollContainer) return

    // Calculate total scroll width
    const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth

    // Create horizontal scroll animation
    const scrollTween = gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth + window.innerHeight}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Animate testimonial cards on scroll
    gsap.utils.toArray(".testimonial-card").forEach((card: any, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "left 80%",
            end: "left 20%",
            scrub: 1,
            containerAnimation: scrollTween,
          },
        },
      )
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      {/* Header Section */}
      <div className="pt-20 pb-10 text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Discover why thousands of businesses trust us to deliver exceptional results
        </p>
      </div>

      {/* Testimonials Container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex items-center h-full gap-8 px-8"
          style={{ width: `${testimonials.length * 400 + 200}px` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card flex-shrink-0 w-96 h-[500px] relative group cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
              />

              {/* Glass Effect Card */}
              <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500 group-hover:scale-105">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-white text-lg leading-relaxed mb-8 font-medium">
                  "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-full opacity-20`}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                    <p className="text-gray-400 text-xs">{testimonial.company}</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Join Our Success Stories?</h3>
          <p className="text-gray-300 text-lg mb-8">Experience the difference that exceptional service makes</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}
