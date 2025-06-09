import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideData = [
    {
      id: 1,
      image: 'https://demo4techies.com/etrend/presta/demo/modules/ps_imageslider/images/sample-1.jpg',
      title: 'Amazing Product 1',
      details: 'This is an incredible product with amazing features.',
      buttonText: 'Shop Now',
      buttonLink: '/product',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      image: 'https://demo4techies.com/etrend/presta/demo/modules/ps_imageslider/images/sample-2.jpg',
      title: 'Amazing Product 2',
      details: 'Discover our newest collection with stunning designs.',
      buttonText: 'Learn More',
      buttonLink: '/product',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 3,
      image: 'https://demo4techies.com/etrend/presta/demo/modules/ps_imageslider/images/sample-3.jpg',
      title: 'Amazing Product 3',
      details: 'Premium quality that exceeds your expectations.',
      buttonText: 'View Details',
      buttonLink: '/products/3',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      title: 'Amazing Product 4',
      details: 'Exclusive offers available for a limited time.',
      buttonText: 'Buy Now',
      buttonLink: '/product',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      title: 'Amazing Product 5',
      details: 'Join thousands of satisfied customers today.',
      buttonText: 'Explore',
      buttonLink: '/product',
      color: 'from-indigo-500 to-violet-600'
    },
  ];

  return (
    <div className="carousel-container overflow-hidden relative z-10 px-2">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 150,
          modifier: 1.8,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="mySwiper w-full h-full rounded-2xl"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="swiper-slide-custom">
            <div
              className={`relative h-full w-full overflow-hidden rounded-3xl transform transition-all duration-500
                ${activeIndex === index ? 'scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'scale-95 opacity-80'}`}
            >
              {/* Full-sized image with lazy loading */}
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>

              {/* Text content */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    flex flex-col items-center text-center p-8 md:p-12 lg:p-16">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/30 mb-4">
                    Featured
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
                  {slide.title}
                </h3>

                <p className="text-white/90 mb-6 md:mb-8 lg:mb-10 text-sm md:text-base lg:text-lg max-w-[80%] md:max-w-[70%] lg:max-w-[60%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {slide.details}
                </p>

                <a
                  href={slide.buttonLink}
                  className={`group relative w-fit px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r ${slide.color} text-white font-semibold 
                    rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] 
                    hover:scale-105 transform`}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {slide.buttonText}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </a>
              </div>

              {/* Decorative gradient blobs */}
              <div className={`absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-r ${slide.color} opacity-30 blur-xl`}></div>
              <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r ${slide.color} opacity-20 blur-xl`}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination indicators */}
      <div className="flex justify-center mt-8 space-x-2 absolute bottom-8 left-0 right-0 z-20">
        {slideData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === index ? 'bg-[#d2af6f] scale-125' : 'bg-[#8b2727]'}`}
            onClick={() => {
              const swiper = document.querySelector('.swiper').swiper;
              swiper.slideToLoop(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
