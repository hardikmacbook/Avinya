import React from 'react';
import { Rocket } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Foundation Established',
    description: 'Launched our innovative platform with cutting-edge technology solutions that transformed the industry landscape.',
    color: 'from-blue-500 to-purple-600',
    accent: 'bg-blue-500'
  },
  {
    year: '2020',
    title: 'AI Integration',
    description: 'Integrated advanced artificial intelligence capabilities, revolutionizing automated processes and decision-making.',
    color: 'from-pink-500 to-orange-500',
    accent: 'bg-pink-500'
  },
  {
    year: '2021',
    title: 'Global Expansion',
    description: 'Extended our reach worldwide, establishing partnerships across multiple continents and diverse markets.',
    color: 'from-green-500 to-teal-500',
    accent: 'bg-green-500'
  },
  {
    year: '2022',
    title: 'Security Enhancement',
    description: 'Implemented enterprise-grade security protocols, ensuring maximum protection for all user data and transactions.',
    color: 'from-indigo-500 to-cyan-500',
    accent: 'bg-indigo-500'
  },
  {
    year: '2023',
    title: 'Community Growth',
    description: 'Built a thriving ecosystem of collaborative partners, fostering innovation through shared expertise and resources.',
    color: 'from-fuchsia-500 to-purple-500',
    accent: 'bg-fuchsia-500'
  },
];

const TimeLine = () => {
  return (
    <>
      <div className="relative w-full min-h-screen py-24 overflow-hidden">
      {/* Enhanced static background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/25 to-blue-400/15 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/25 to-cyan-400/15 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-green-400/20 to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-gradient-to-br from-indigo-400/15 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-gradient-to-br from-yellow-400/15 to-orange-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-violet-400/20 to-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Enhanced Header */}
        <div className="text-center mb-28">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6 tracking-tight">
              Our Journey
            </h1>
            {/* Decorative glass accent under title */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed mt-8">
            Discover the milestones that shaped our innovative path forward
          </p>
          
          {/* Decorative glass frame around header */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-96 h-48 bg-white/3 backdrop-blur-3xl rounded-3xl border border-white/8 -z-10"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Enhanced Central line with multiple layers */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-purple-500 via-blue-500 via-pink-500 via-green-500 to-indigo-500 rounded-full shadow-2xl"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-x-px w-px h-full bg-white/30 rounded-full"></div>
          
          {milestones.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={milestone.year} className="relative flex items-center justify-center mb-32">
                {/* Enhanced Timeline node with multiple glass layers */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-3xl rounded-full border-4 border-white/40 shadow-2xl"></div>
                    <div className="absolute inset-2 bg-white/30 backdrop-blur-xl rounded-full border border-white/50"></div>
                    <div className="absolute inset-4 bg-white/40 backdrop-blur-lg rounded-full"></div>
                  </div>
                  
                  {/* Enhanced year badge */}
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <span className="bg-white/25 backdrop-blur-3xl border-2 border-white/40 text-gray-900 px-8 py-4 rounded-2xl text-lg font-black shadow-2xl block">
                        {milestone.year}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-2xl"></div>
                    </div>
                  </div>
                </div>

                {/* Multi-layered Content card with advanced glass morphism */}
                <div className={`w-full max-w-lg ${isLeft ? 'mr-auto pr-12' : 'ml-auto pl-12'} ${isLeft ? 'text-right' : 'text-left'}`}>
                  <div className="relative">
                    {/* Outer glass container */}
                    <div className="bg-white/12 backdrop-blur-3xl rounded-3xl p-12 border-2 border-white/25 shadow-2xl relative overflow-hidden">
                      {/* Inner glass layers */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent rounded-3xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-white/5 rounded-3xl"></div>
                      
                      {/* Glass reflections and highlights */}
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                      <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                      <div className="absolute top-6 right-6 w-20 h-20 bg-white/8 rounded-full blur-xl"></div>
                      <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
                      
                      {/* Nested inner glass panel */}
                      <div className="relative bg-white/8 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-800 leading-relaxed text-xl font-medium">
                            {milestone.description}
                          </p>
                          
                          {/* Multi-layered accent design */}
                          <div className="mt-8 space-y-2">
                            <div className={`h-3 w-32 bg-gradient-to-r ${milestone.color} rounded-full shadow-lg`}></div>
                            <div className={`h-2 w-24 bg-gradient-to-r ${milestone.color} opacity-60 rounded-full`}></div>
                            <div className={`h-1 w-16 bg-gradient-to-r ${milestone.color} opacity-40 rounded-full`}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Outer decorative elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/15 backdrop-blur-xl rounded-full border border-white/25"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced call to action with sophisticated glass design */}
        <div className="text-center mt-32">
          <div className="relative inline-block">
            <div className="bg-white/20 backdrop-blur-3xl border-2 border-white/35 text-gray-900 font-black py-8 px-12 rounded-3xl shadow-2xl cursor-pointer relative overflow-hidden">
              {/* Multiple glass layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/15 via-transparent to-white/10 rounded-3xl"></div>
              {/* Content */}
              <div className="relative z-10 flex items-center gap-4">
                <Rocket className="w-8 h-8" />
                <span className="text-2xl">Join Our Journey</span>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
    </>
  );
};

export default TimeLine;