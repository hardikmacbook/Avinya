import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Company Foundation',
    description: 'We started our journey with a vision to revolutionize the industry. Our founding team came together with decades of combined experience and a shared passion for innovation. This was the beginning of something extraordinary.',
  },
  {
    year: '2020',
    title: 'First Major Breakthrough',
    description: 'Despite global challenges, we achieved our first major milestone by successfully launching our flagship product. This breakthrough validated our approach and set the foundation for rapid growth and market expansion.',
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'We expanded our operations internationally, establishing offices in three new countries. Our team grew by 300% and we successfully served over 10,000 customers worldwide, marking our transition to a global company.',
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Our commitment to innovation was recognized with the Industry Excellence Award. We launched three new product lines and established strategic partnerships with leading technology companies across the globe.',
  },
  {
    year: '2023',
    title: 'Market Leadership',
    description: 'We achieved market leadership position with 40% market share. Our platform now serves over 100,000 active users daily and we have successfully processed over $1 billion in transactions.',
  },
];

const TimeLine = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gray-200 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-32 left-10 w-40 h-40 bg-gray-300 rounded-full opacity-20 blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-20 lg:mb-32">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-none">
            Our Journey
          </h1>
          <div className="w-24 h-1 bg-gray-900 mx-auto mb-8"></div>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Discover the milestones that shaped our innovative path forward
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Enhanced timeline line with gradient */}
          <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-0.5 w-1 h-full bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 rounded-full shadow-sm"></div>
          
          {milestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={milestone.year} className="relative mb-24 lg:mb-32 last:mb-0">
                {/* Enhanced timeline dot */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 z-20">
                  <div className="w-6 h-6 bg-gray-900 rounded-full border-4 border-white shadow-xl relative">
                    <div className="absolute inset-0 bg-gray-900 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                {/* Massive content cards - responsive */}
                <div className={`
                  ml-16 md:ml-0 
                  ${isLeft ? 'md:mr-auto md:pr-12 lg:pr-16 xl:pr-20' : 'md:ml-auto md:pl-12 lg:pl-16 xl:pl-20'}
                  w-full md:w-1/2 lg:w-7/12 xl:w-1/2
                `}>
                  
                  {/* Year badge - enhanced */}
                  <div className={`mb-8 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="inline-block bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg lg:text-xl font-bold tracking-wider shadow-lg">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Massive content card */}
                  <div className="group bg-white rounded-3xl p-8 sm:p-10 lg:p-12 xl:p-16 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-500 transform hover:-translate-y-2">
                    {/* Card header */}
                    <div className="mb-8">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {milestone.title}
                      </h3>
                      <div className="w-16 h-1 bg-gray-900 rounded-full group-hover:w-24 transition-all duration-300"></div>
                    </div>
                    
                    {/* Card content */}
                    <p className="text-gray-700 leading-relaxed text-lg sm:text-xl lg:text-2xl mb-8 font-normal">
                      {milestone.description}
                    </p>
                    
                    {/* Card footer with action */}
                    <div className="flex items-center text-gray-900 font-semibold text-lg group-hover:text-gray-700 transition-colors duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced call to action */}
        <div className="text-center mt-24 lg:mt-40">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              Ready to Be Part of Our Story?
            </h2>
            <button className="group inline-flex items-center gap-4 bg-gray-900 text-white font-bold py-6 px-12 rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-xl">
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Join Our Journey</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;