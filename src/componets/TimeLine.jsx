import React from 'react';
import { Rocket } from 'lucide-react';

const milestones = [
  {
    year: '2019',
    title: 'Launched Idea',
    description: 'The concept was born and our journey began with vision and passion.'
  },
  {
    year: '2020',
    title: 'Built MVP',
    description: 'Developed our first working prototype to validate the market.'
  },
  {
    year: '2021',
    title: 'Early Traction',
    description: 'Gained initial user base and valuable feedback to iterate.'
  },
  {
    year: '2022',
    title: 'Growth Phase',
    description: 'Scaled our product and team to reach new heights.'
  },
  {
    year: '2023',
    title: 'Industry Leader',
    description: 'Recognized as a key innovator in our domain.'
  },
];

const TimeLine = () => {
  return (
    <section className="relative w-full min-h-screen bg-white py-24 px-6 lg:px-12">
      <div className="text-center mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">Our Timeline</h1>
        <p className="mt-4 text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
          Follow our professional journey and growth over the years.
        </p>
      </div>

      {/* Timeline Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

      <div className="relative z-10 flex flex-col gap-16">
        {milestones.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={item.year} className="relative flex flex-col lg:flex-row items-center justify-between max-w-5xl mx-auto">
              {isLeft && (
                <div className="w-full lg:w-1/2 flex justify-end px-6">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 max-w-md text-right hover:shadow-xl transition">
                    <span className="block text-sm text-gray-500 mb-2">{item.year}</span>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              )}

              <div className="hidden lg:flex flex-col items-center justify-center w-10">
                <div className="w-4 h-4 bg-gray-800 rounded-full border-4 border-white shadow-md"></div>
                {index !== milestones.length - 1 && (
                  <div className="flex-1 w-px bg-gray-200 mt-2"></div>
                )}
              </div>

              {!isLeft && (
                <div className="w-full lg:w-1/2 flex justify-start px-6">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 max-w-md text-left hover:shadow-xl transition">
                    <span className="block text-sm text-gray-500 mb-2">{item.year}</span>
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                    <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center mt-28">
        <button className="inline-flex items-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 transition">
          <Rocket className="w-5 h-5" />
          <span className="text-base font-medium">Join Our Journey</span>
        </button>
      </div>
    </section>
  );
};

export default TimeLine;
