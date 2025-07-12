import React, { useState } from 'react';
import { Rocket, ArrowRight, Calendar, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const milestones = [
  {
    year: '2023',
    title: 'The Beginning of a New Chapter',
    description: 'In 2023, we took the first step toward turning our shared dream into reality. With a common vision and mutual trust, we started our shop together, aiming to provide customers with high-quality products and dependable service. It was a bold step, but we were confident in our combined experience and dedication. The year was spent setting up the business, understanding customer needs, and laying a strong foundation for future growth.',
    icon: Star
  },
  {
    year: '2024',
    title: 'Building Stability and Customer Trust',
    description: 'In 2024, we focused on strengthening our roots in the market. Our priority was to build long-term relationships with customers through honesty, fair pricing, and reliable service. We also expanded our product range to meet the growing needs of our customers. Through hard work and consistency, we began earning customer loyalty, and slowly, our shop became known for its quality and trustworthiness in the industry.',
    stats: '1K Users',
    icon: Rocket
  },
  {
    year: '2025',
    title: ' Moving Towards Growth', 
    description: 'By 2025, our business had started gaining momentum. We worked on improving operations, streamlining supply chains, and offering even more variety in our products. With better systems in place, we were able to serve more customers effectively. Our partnership grew even stronger, and we continued to work together with full dedication, ensuring that every customer had a positive experience with us.',
    stats: '50K Users',
    icon: TrendingUp
  },
  {
    year: '2026',
    title: 'Planning for the Future',
    description: 'As we look ahead to 2026, we are preparing for the next phase of our journey. Our future plans include expanding our business further, either by opening new locations or by introducing digital solutions to make shopping easier for our customers. We are also exploring new product lines to stay ahead of the market trends. Our focus remains on growth, innovation, and customer satisfaction.',
  },
  {
    year: '2026 & Beyond',
    title: 'The Road Ahead',
    description: 'Though we have achieved a lot since 2023, we believe this is just the beginning. Our journey has been shaped by partnership, trust, and hard work, and we are excited for what lies ahead. We are committed to continuing this growth together, aiming to make our company a well-known and respected name in the industry while always prioritizing our customers',
  },
];

const ExpandableText = ({ text, maxWords = 25 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  const words = text.split(' ');
  const shouldTruncate = words.length > maxWords;
  const truncatedText = shouldTruncate ? words.slice(0, maxWords).join(' ') + '...' : text;
  
  return (
    <div>
      <p className="text-gray-600 text-lg leading-relaxed mb-4">
        {isExpanded ? text : truncatedText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-900 font-semibold hover:text-gray-700 transition-colors duration-200 text-sm"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

const TimeLine = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Our Journey
          </p>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The milestones that defined our path to success
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-0.5 w-1 h-full bg-gradient-to-b from-gray-300 via-[#8b2727] to-gray-700 rounded-full"></div>

          {milestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            
            return (
              <div key={milestone.year} className="relative mb-16 lg:mb-24">
                
                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
                  <div className="w-6 h-6 bg-[#8b2727] rounded-full border-4 border-white shadow-lg">
                    <div className="absolute inset-0 bg-[#8b2727] rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Content - PROPERLY RESPONSIVE */}
                <div className={`
                  ml-20 lg:ml-0 
                  lg:w-5/12 
                  ${isLeft ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}
                `}>
                  
                  {/* Year badge */}
                  <div className={`mb-6 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                    <span className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl text-lg font-bold">
                      {milestone.year}
                    </span>
                  </div>

                  {/* WIDE card that actually works */}
                  <div className="w-full bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                          {milestone.title}
                        </h3>
                      </div>
                      
                    </div>
                    
                    {/* Accent line */}
                    <div className="w-16 h-1 bg-[#8b2727] rounded-full mb-6 group-hover:w-24 transition-all duration-300"></div>
                    
                    {/* Expandable Description */}
                    <ExpandableText text={milestone.description} maxWords={25} />
                    
                    {/* Action */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-gray-400 text-sm">
                        {idx + 1} of {milestones.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Write the Next Chapter?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies who trust us to power their growth
            </p>
            <Link to="/contact" className="group cursor-pointer inline-flex items-center gap-4 bg-[#8b2727] text-white font-bold py-4 px-8 rounded-2xl hover:bg-[#d2af6f] hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;