import React from 'react';
import { Rocket, ArrowRight, Calendar, Star, TrendingUp } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Company Foundation',
    description: 'We started our journey with a vision to revolutionize the industry. Our founding team came together with decades of combined experience and shared passion for innovation.',
    stats: '5 Founders',
    icon: Star
  },
  {
    year: '2020',
    title: 'First Major Breakthrough',
    description: 'Despite global challenges, we achieved our first major milestone by successfully launching our flagship product and gaining initial market traction.',
    stats: '1K Users',
    icon: Rocket
  },
  {
    year: '2021',
    title: 'Global Expansion', 
    description: 'We expanded our operations internationally, establishing offices in three new countries and growing our team to serve a global customer base.',
    stats: '50K Users',
    icon: TrendingUp
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Our commitment to innovation was recognized with the Industry Excellence Award while establishing strategic partnerships with leading companies.',
    stats: '100K Users',
    icon: Star
  },
  {
    year: '2023',
    title: 'Market Leadership',
    description: 'We achieved market leadership position and our platform now serves users globally with incredible growth and industry recognition.',
    stats: '1M Users',
    icon: Calendar
  },
];

const TimeLine = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Our Journey
          </h1>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The milestones that defined our path to success
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 lg:transform lg:-translate-x-0.5 w-1 h-full bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 rounded-full"></div>

          {milestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const IconComponent = milestone.icon;
            
            return (
              <div key={milestone.year} className="relative mb-16 lg:mb-24">
                
                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
                  <div className="w-6 h-6 bg-gray-900 rounded-full border-4 border-white shadow-lg">
                    <div className="absolute inset-0 bg-gray-900 rounded-full animate-ping opacity-20"></div>
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
                          <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 font-semibold text-sm">
                            {milestone.stats}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                          {milestone.title}
                        </h3>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-gray-100 transition-colors ml-4">
                        <IconComponent className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    
                    {/* Accent line */}
                    <div className="w-16 h-1 bg-gray-900 rounded-full mb-6 group-hover:w-24 transition-all duration-300"></div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {milestone.description}
                    </p>
                    
                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-900 font-semibold hover:text-gray-700 transition-colors cursor-pointer group">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
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
            <button className="group inline-flex items-center gap-4 bg-white text-gray-900 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Start Your Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;