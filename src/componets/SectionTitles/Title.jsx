import React from "react";

const Title = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h1
      className="text-5xl font-bold mb-4 tracking-tight"
      style={{ color: "#8b2727" }}
    >
      {title}
    </h1>
    <p className="text-xl" style={{ color: "#8b2727", opacity: 0.8 }}>
      {subtitle}
    </p>
    {/* <div className="w-50 h-1 bg-[#8b2727] mt-5 mx-auto mb-6"></div> */}
    <div class="flex justify-center items-center w-full my-3 px-5">
  <div class="relative flex items-center justify-center w-3/5 max-w-lg h-15">
    <div class="flex-1 h-1 bg-gradient-to-r from-transparent via-[#8b2727] to-[#c33333] mr-4 relative rounded-sm">
    </div>
    
    <div class="relative">
      <div class="relative w-12 h-12 bg-gradient-to-br from-[#8b2727] via-[#c33333] to-[#8b2727] rounded-full flex items-center justify-center shadow-2xl border-2 border-white/10 z-10">
        <svg class="w-6 h-6 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z"/>
        </svg>
      </div>
      
    </div>
    
    <div class="flex-1 h-1 bg-gradient-to-r from-[#c33333] via-[#8b2727] to-transparent ml-4 relative rounded-sm">
      <div class="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#8b2727] rounded-full shadow-lg"></div>
    </div>
  </div>
</div>

  </div>
);

export default Title;
