import React from 'react';
import { Rocket, ArrowRight, Calendar, Star } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Company Foundation',
    description: 'We started our journey with a vision to revolutionize the industry. Our founding team came together with decades of combined experience.',
    stats: '5 Founders',
    icon: Star
  },
  {
    year: '2020',
    title: 'First Major Breakthrough',
    description: 'Despite global challenges, we achieved our first major milestone by successfully launching our flagship product to the market.',
    stats: '1K Users',
    icon: Rocket
  },
  {
    year: '2021',
    title: 'Global Expansion', 
    description: 'We expanded our operations internationally, establishing offices in three new countries and growing our team significantly.',
    stats: '50K Users',
    icon: Calendar
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Our commitment to innovation was recognized with the Industry Excellence Award and strategic partnerships.',
    stats: '100K Users',
    icon: Star
  },
  {
    year: '2023',
    title: 'Market Leadership',
    description: 'We achieved market leadership position and our platform now serves users globally with incredible growth.',
    stats: '1M Users',
    icon: Rocket
  },
];

const TimeLine = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-12 xl:px-20 py-12 lg:py-20">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-6 tracking-tight">
            Our Journey
          </h1>
          <div className="w-20 h-1 bg-slate-900 mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto">
            The milestones that defined our path to success
          </p>
        </div>

        {/* Timeline Container - MAXIMUM WIDTH */}
        <div className="relative w-full max-w-none">
          
          {/* Center line for desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-slate-300 via-slate-500 to-slate-700"></div>
          
          {/* Mobile/Tablet line */}
          <div className="lg:hidden absolute left-8 w-0.5 h-full bg-slate-400"></div>

          {milestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const IconComponent = milestone.icon;
            
            return (
              <div key={milestone.year} className="relative mb-12 lg:mb-20 last:mb-0">
                
                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 lg:transform lg:-translate-x-1/2 z-20">
                  <div className="w-6 h-6 bg-slate-900 rounded-full border-4 border-white shadow-lg">
                    <div className="absolute inset-0 bg-slate-900 rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>

                {/* ULTRA WIDE CARDS */}
                <div className="w-full">
                  {/* Mobile & Tablet Layout */}
                  <div className="lg:hidden ml-16 w-full">
                    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <div className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-lg">
                            {milestone.year}
                          </div>
                          <div className="bg-slate-100 px-3 py-1 rounded-full text-slate-700 font-semibold">
                            {milestone.stats}
                          </div>
                        </div>
                        <IconComponent className="w-8 h-8 text-slate-600" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                        {milestone.description}
                      </p>
                      <div className="flex items-center text-slate-900 font-semibold hover:text-slate-700 transition-colors group cursor-pointer">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout - MAXIMUM WIDTH CARDS */}
                  <div className="hidden lg:block">
                    <div className={`absolute top-0 w-full ${isLeft ? 'right-1/2 pr-12 xl:pr-16' : 'left-1/2 pl-12 xl:pl-16'}`}>
                      <div className="w-full bg-white rounded-3xl p-8 xl:p-12 shadow-lg border border-slate-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                        
                        {/* Card Header - Full Width */}
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-6">
                            <div className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xl">
                              {milestone.year}
                            </div>
                            <div className="bg-slate-100 px-4 py-2 rounded-full text-slate-700 font-semibold text-lg">
                              {milestone.stats}
                            </div>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-slate-100 transition-colors">
                            <IconComponent className="w-8 h-8 text-slate-600" />
                          </div>
                        </div>

                        {/* Card Content - Full Width */}
                        <div className="space-y-6">
                          <h3 className="text-3xl xl:text-4xl font-bold text-slate-900 leading-tight">
                            {milestone.title}
                          </h3>
                          
                          <div className="w-16 h-1 bg-slate-900 rounded-full group-hover:w-24 transition-all duration-300"></div>
                          
                          <p className="text-slate-600 text-lg xl:text-xl leading-relaxed">
                            {milestone.description}
                          </p>
                          
                          {/* Action Row - Full Width */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center text-slate-900 font-semibold text-lg hover:text-slate-700 transition-colors group cursor-pointer">
                              <span>Explore Details</span>
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="text-slate-400 text-sm">
                              Milestone {idx + 1} of {milestones.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section - Full Width */}
        <div className="text-center mt-20 lg:mt-32">
          <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Write the Next Chapter?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies who trust us to power their growth
            </p>
            <button className="group inline-flex items-center gap-4 bg-white text-slate-900 font-bold py-4 px-8 lg:py-5 lg:px-12 rounded-2xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg lg:text-xl">
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