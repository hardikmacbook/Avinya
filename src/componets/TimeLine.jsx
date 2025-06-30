import React from 'react';
import { Zap, Rocket, Cpu, Shield, Users } from 'lucide-react';

const milestones = [
  {
    year: '1998',
    title: 'demo',
    description: 'demo',
    icon: <Zap className="w-8 h-8 text-blue-500" />, // purple-blue
    img: 'https://demo4techies.com/etrend/presta/demo/modules/ps_imageslider/images/sample-1.jpg',
  },
  {
    year: '2005',
    title: 'demo',
    description: 'demo',
    icon: <Cpu className="w-8 h-8 text-pink-500" />, // pink-orange
    img: 'https://source.unsplash.com/400x220/?ai,technology',
  },
  {
    year: '2010',
    title: 'demo',
    description: 'demo',
    icon: <Rocket className="w-8 h-8 text-green-500" />, // green-teal
    img: 'https://source.unsplash.com/400x220/?global,network',
  },
  {
    year: '2015',
    title: 'demo',
    description: 'demo',
    icon: <Shield className="w-8 h-8 text-indigo-500" />, // indigo-cyan
    img: 'https://source.unsplash.com/400x220/?security,cyber',
  },
  {
    year: '2020',
    title: 'demo',
    description: 'demo',
    icon: <Users className="w-8 h-8 text-fuchsia-500" />, // fuchsia-purple
    img: 'https://source.unsplash.com/400x220/?collaboration,team',
  },
];

const TimeLine = () => {
  return (
    <div className="relative w-full min-h-screen py-12 bg-gradient-to-br from-white to-gray-50 flex justify-center items-center overflow-x-hidden">
      {/* Central vertical line */}
      <div className="absolute left-1/2 top-0 h-full w-1 border-r border-[#d2af6f] shadow-xl z-0" style={{ transform: 'translateX(-50%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-16 px-2 sm:px-4 md:px-8">
        {milestones.map((milestone, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div key={milestone.year} className="relative flex flex-col md:flex-row items-center justify-between w-full">
              {/* Card */}
              <div
                className={`group flex flex-col items-center md:items-${isLeft ? 'end' : 'start'} w-full md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'} ${isLeft ? 'order-1' : 'order-3'} mb-8 md:mb-0`}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-300 p-0 min-w-[380px] max-w-3xl w-full border border-gray-100 relative flex flex-col items-center overflow-hidden"
                  style={{
                    boxShadow:
                      '0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 6px 0 rgba(0,0,0,0.06)',
                  }}
                >
                  <img 
                    src={milestone.img} 
                    alt={milestone.title} 
                    className="w-full h-[140px] object-cover rounded-t-2xl border-b-2 border-gray-100" 
                  />
                  <div className="flex flex-col items-center justify-center w-full p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {milestone.icon}
                      <h3 className="text-2xl font-bold text-gray-900 tracking-wide text-center">{milestone.title}</h3>
                    </div>
                    <p className="text-[gray]-600 text-lg font-medium leading-relaxed text-center">{milestone.description}</p>
                  </div>
                </div>
              </div>
              {/* Timeline year marker */}
              <div className="flex flex-col items-center w-0 order-2">
                <div className="relative z-20">
                  <span className="block text-black text-base font-bold bg-white px-4 py-2 rounded-full shadow-md border border-[#8b2727] mb-2" style={{letterSpacing:'0.05em'}}>{milestone.year}</span>
                  <span className="block w-4 h-4 bg-white border-2 border-[#8b2727] rounded-full shadow-lg mx-auto" />
                </div>
              </div>
              {/* Spacer for alternate side */}
              <div className={`w-full md:w-1/2 ${isLeft ? 'order-3' : 'order-1'}`}></div>
            </div>
          );
        })}
      </div>
      {/* Decorative futuristic glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 w-[80vw] h-full -translate-x-1/2 z-0" style={{filter:'blur(100px)',opacity:0.13,background:'radial-gradient(circle at 100% 100%,#a5b4fc 10%,#f0abfc 50%,#f0fdfa 100%)'}}></div>
    </div>
  );
};

export default TimeLine;