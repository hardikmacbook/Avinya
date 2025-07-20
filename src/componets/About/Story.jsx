import React from 'react';
import { BookOpen, Lightbulb, Target, Rocket, Users, Globe } from 'lucide-react';

const CompanyStory = () => {
  return (
    <div className="w-full bg-white py-20 lg:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-gray-700 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Our Story</span>
          </div>
        </div> */}

        {/* Founding Story Details */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
           <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight text-center">
            The Founding Moment
          </p>
          <div className="w-20 h-1 bg-gray-900 mx-auto mb-6"></div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-xl leading-relaxed">
                Our company’s journey began in 2023, when both of us — my business partner and I — decided to start this venture together. We shared a common vision of creating a business that would stand out in the market through quality, trust, and excellent service. With a strong belief in our combined experience and dedication, we decided to open our shop in partnership. We knew that by working together, we could build something successful and long-lasting, offering customers exactly what they needed.
              </p>
              
              <p className="text-lg leading-relaxed">
                The idea for the shop came from countless conversations about the market’s growing needs and the gap we noticed between demand and supply. We both shared the same passion for quality products and excellent customer service, which became the foundation of our partnership. In 2023, we finally took the leap of faith and opened our shop, combining his supply network and my market knowledge to create a business that could truly serve customers better.
              </p>
              
              <p className="text-lg leading-relaxed">
               Starting this venture wasn’t without challenges. From selecting the right location to finalizing products and setting up operations, we had to carefully plan every step. But with mutual trust, dedication, and complementary skills, we turned every obstacle into an opportunity. Our shared goal was simple — to provide top-quality products, fair pricing, and dependable service, becoming a reliable name in the industry.
              </p>
              
              <p className="text-lg leading-relaxed">
                Today, our company proudly stands as a symbol of collaboration, trust, and hard work. Our story is not just about two partners starting a shop; it’s about two people who believed in each other’s strengths and dared to dream together. As we continue to grow, we remain committed to the same values that brought us together — honesty, quality, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStory;