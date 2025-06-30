import React from 'react';
import { Rocket } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Foundation Established',
    description: 'Launched our innovative platform with cutting-edge technology solutions that transformed the industry landscape.',
    color: 'from-blue-500 to-purple-600',
  },
  {
    year: '2020',
    title: 'AI Integration',
    description: 'Integrated advanced artificial intelligence capabilities, revolutionizing automated processes and decision-making.',
    color: 'from-pink-500 to-orange-500',
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Extended our reach worldwide, establishing partnerships across multiple continents and diverse markets.',
    color: 'from-green-500 to-teal-500',
  },
  {
    year: '2022',
    title: 'Security Enhancement',
    description: 'Implemented enterprise-grade security protocols, ensuring maximum protection for all user data and transactions.',
    color: 'from-indigo-500 to-cyan-500',
  },
  {
    year: '2023',
    title: 'Community Growth',
    description: 'Built a thriving ecosystem of collaborative partners, fostering innovation through shared expertise and resources.',
    color: 'from-fuchsia-500 to-purple-500',
  },
];

const TimeLine = () => {
  return (
    <div className="relative w-full min-h-screen py-12 lg:py-24 overflow-hidden">
      {/* Clean background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-100/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-transparent blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 tracking-tight">
            Our Journey
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
            Discover the milestones that shaped our innovative path forward
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Clean vertical line */}
          <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full shadow-lg"></div>
          
          {milestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={milestone.year} className="relative mb-16 lg:mb-24">
                {/* Timeline marker */}
                <div className="absolute left-2 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-20">
                  <div className="w-6 h-6 bg-white backdrop-blur-xl rounded-full border-4 border-purple-500 shadow-lg"></div>
                </div>

                {/* Content card - responsive layout */}
                <div className={`ml-12 sm:ml-0 sm:w-full sm:max-w-2xl ${
                  isLeft ? 'sm:mr-auto sm:pr-8 lg:pr-16' : 'sm:ml-auto sm:pl-8 lg:pl-16'
                } ${isLeft ? 'sm:text-right' : 'sm:text-left'}`}>
                  
                  {/* Year badge */}
                  <div className={`inline-block mb-6 ${isLeft ? 'sm:float-right sm:ml-6' : 'sm:float-left sm:mr-6'}`}>
                    <span className="bg-white/30 backdrop-blur-xl border-2 border-white/40 text-gray-900 px-6 py-3 lg:px-8 lg:py-4 rounded-2xl text-base lg:text-lg font-black shadow-xl">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Glass content card */}
                  <div className="bg-white/20 backdrop-blur-2xl rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 border-2 border-white/30 shadow-2xl relative overflow-hidden">
                    {/* Glass effect layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-2xl lg:rounded-3xl"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-4 lg:mb-6 tracking-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-800 leading-relaxed text-base sm:text-lg lg:text-xl font-medium mb-6 lg:mb-8">
                        {milestone.description}
                      </p>
                      
                      {/* Accent bar */}
                      <div className={`h-2 lg:h-3 w-24 lg:w-32 bg-gradient-to-r ${milestone.color} rounded-full shadow-lg`}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 lg:mt-32">
          <div className="inline-block">
            <div className="bg-white/25 backdrop-blur-2xl border-2 border-white/40 text-gray-900 font-black py-6 lg:py-8 px-8 lg:px-12 rounded-2xl lg:rounded-3xl shadow-2xl cursor-pointer relative overflow-hidden">
              {/* Glass layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-2xl lg:rounded-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center gap-3 lg:gap-4">
                <Rocket className="w-6 h-6 lg:w-8 lg:h-8" />
                <span className="text-lg lg:text-2xl">Join Our Journey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;