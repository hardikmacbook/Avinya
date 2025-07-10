import React from 'react';

const FlipCards = () => {
  const cardData = [
    {
      id: 1,
      frontTitle: 'Innovation',
      frontIcon: '💡',
      backTitle: 'Drive Innovation',
      backContent: 'We constantly push boundaries and embrace creative thinking to develop cutting-edge solutions that shape the future.',
      bgColor: '#8b2727'
    },
    {
      id: 2,
      frontTitle: 'Collaboration',
      frontIcon: '🤝',
      backTitle: 'Team Excellence',
      backContent: 'Teamwork and communication fuel our progress, creating synergy that drives extraordinary results across all projects.',
      bgColor: '#8b2727'
    },
    {
      id: 3,
      frontTitle: 'Quality',
      frontIcon: '⭐',
      backTitle: 'Premium Standards',
      backContent: 'We maintain the highest standards in everything we deliver, ensuring excellence and reliability in every detail.',
      bgColor: '#8b2727'
    },
    {
      id: 4,
      frontTitle: 'Growth',
      frontIcon: '🚀',
      backTitle: 'Continuous Learning',
      backContent: 'We foster an environment of continuous improvement and learning, adapting to new challenges and opportunities.',
      bgColor: '#8b2727'
    },
    {
      id: 5,
      frontTitle: 'Integrity',
      frontIcon: '🛡️',
      backTitle: 'Trust & Ethics',
      backContent: 'We uphold the highest standards of honesty and accountability in every interaction and decision we make.',
      bgColor: '#8b2727'
    },
    {
      id: 6,
      frontTitle: 'Impact',
      frontIcon: '🌟',
      backTitle: 'Making a Difference',
      backContent: 'Every project we undertake is designed to create meaningful impact and positive change in our community.',
      bgColor: '#8b2727'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4" style={{
      background: `
        linear-gradient(135deg, rgba(210, 175, 111, 0.1) 0%, rgba(139, 39, 39, 0.05) 50%, rgba(210, 175, 111, 0.08) 100%),
        radial-gradient(ellipse at 20% 80%, rgba(210, 175, 111, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(139, 39, 39, 0.1) 0%, transparent 50%),
        linear-gradient(180deg, #f8f4f0 0%, #ffffff 50%, #f9f6f2 100%)
      `
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 tracking-tight" style={{ color: '#8b2727' }}>
            Our Core Values
          </h1>
          <p className="text-xl" style={{ color: '#8b2727', opacity: 0.8 }}>
            These principles guide everything we do, from product development to customer service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="group perspective-1000 w-80 h-56"
              style={{ perspective: '2000px' }}
            >
              <div className="relative w-full h-full transition-transform duration-1000 ease-in-out transform-style-preserve-3d group-hover:rotate-y-180 shadow-2xl">
                {/* Front Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl flex flex-col items-center justify-center text-white p-8 backface-hidden border-2"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(135deg, ${card.bgColor} 0%, ${card.bgColor}dd 50%, ${card.bgColor} 100%)`,
                    boxShadow: `
                      0 25px 50px -12px rgba(139, 39, 39, 0.4),
                      0 10px 25px -5px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                    `,
                    borderColor: card.bgColor === '#8b2727' ? '#d2af6f' : '#8b2727',
                    borderOpacity: 0.3,
                    transform: 'translateZ(20px)'
                  }}
                >
                  <div className="relative">
                    <div 
                      className="text-6xl mb-4"
                      style={{
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                        textShadow: '0 4px 8px rgba(0,0,0,0.5)'
                      }}
                    >
                      {card.frontIcon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center tracking-wide relative z-10"
                      style={{
                        textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.3)'
                      }}>
                    {card.frontTitle}
                  </h3>
                  
                  
                  {/* Additional depth layer */}
                  <div 
                    className="absolute inset-2 rounded-xl opacity-20"
                    style={{
                      background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                      transform: 'translateZ(2px)'
                    }}
                  ></div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl bg-white flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180 border-2"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(20px)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f8f8f8 100%)',
                    boxShadow: `
                      0 25px 50px -12px rgba(139, 39, 39, 0.3),
                      0 10px 25px -5px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 1),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                    `,
                    borderColor: '#8b2727',
                    borderOpacity: 0.2
                  }}
                >
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-center relative"
                        style={{ 
                          color: '#8b2727',
                          textShadow: '0 2px 4px rgba(139, 39, 39, 0.1)'
                        }}>
                      {card.backTitle}
                      
                      {/* Underline effect */}
                      <div 
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 rounded-full"
                        style={{ 
                          background: `#8b2727`,
                          boxShadow: '0 2px 4px rgba(210, 175, 111, 0.3)'
                        }}
                      ></div>
                    </h3>
                    
                    <p className="text-center leading-relaxed mb-4"
                       style={{ color: '#000' }}>
                      {card.backContent}
                    </p>
                  </div>
                  
                  
                  
                  {/* Bottom decorative element */}
                  <div 
                    className="absolute bottom-4 w-20 h-1 rounded-full"
                    style={{ 
                      background: `#8b2727`,
                      boxShadow: '0 2px 8px rgba(210, 175, 111, 0.4), 0 4px 16px rgba(139, 39, 39, 0.2)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 2000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -moz-backface-visibility: hidden;
        }
        
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlipCards;