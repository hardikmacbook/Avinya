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
    <div class="relative w-1/2 h-1 mx-auto my-6 flex items-center justify-center">
      <div class="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#8b2727] to-transparent rounded-sm shadow-lg"></div>
      <div class="relative w-8 h-8 bg-[#8b2727] rounded-full flex items-center justify-center shadow-lg z-10">
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z" />
        </svg>
      </div>
    </div>
  </div>
);

export default Title;
