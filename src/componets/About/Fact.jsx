import React, { useState } from "react";

const facts = [
  "At Avinya Electricals, we don’t just sell industrial electrical products — we power factories, workshops, and industries with trusted solutions that keep operations running smoothly.",
  "From control panels and contactors to industrial-grade cables and safety gear, every product in our shop reflects our commitment to quality, durability, and performance.",
  "What started as a small store with a big dream has grown into a trusted name across the region — all thanks to consistent support, honest service, and strong relationships with our customers.",
  "Avinya Electricals — where industries find their power.",
  "We believe in empowering industries with the right tools and solutions, ensuring that every product we offer meets the highest standards of quality and reliability.",
  "Our team is dedicated to providing personalized service, expert advice, and a wide range of products to meet the unique needs of every customer.",
  "We’re not just a shop; we’re a partner in your industrial journey, committed to helping you succeed with every transaction.",
  "At Avinya Electricals, we understand that every industry has its own challenges and requirements, which is why we offer tailored solutions that fit your specific needs.",
  "Our passion for electrical products drives us to continuously innovate and expand our offerings, ensuring that you always have access to the latest and most reliable solutions.",
  "We take pride in our transparent pricing, honest recommendations, and unwavering commitment to customer satisfaction — because your success is our success.",
];

const Fact = () => {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * facts.length));
  const [fade, setFade] = useState(true);

  const showNextFact = () => {
    setFade(false);
    setTimeout(() => {
      setIdx((prev) => (prev + 1) % facts.length);
      setFade(true);
    }, 250);
  };

  return (
    <div className="max-w-xl mx-auto my-12 px-10 py-10 bg-[#fff8ef] border-[2px] border-[#e1c7a5] rounded-2xl transition-all duration-200 select-none">
      <h3 className="font-bold text-2xl text-[#8b2727] mb-3 tracking-tight">Fun Fact</h3>
      <p
        className={`italic text-base sm:text-lg text-[#6d4425] mb-6 transition-opacity duration-300 ease-in-out`}
        style={{
          opacity: fade ? 1 : 0,
          transition: "opacity 0.3s",
          fontFamily: "Georgia, serif",
          wordBreak: "break-word",
          minHeight: "3.2rem",
        }}
      >
        {facts[idx]}
      </p>
      <button
        type="button"
        onClick={showNextFact}
        className="px-6 py-2 rounded-full border border-[#8b2727] bg-transparent text-[#8b2727] font-semibold hover:bg-[#8b2727] hover:text-white active:scale-95 transition-all duration-150 text-sm shadow-sm"
        aria-label="Show another fun fact"
      >
        Show another facts
      </button>
      {/* Decorative underline bar for style */}
      <div className="mt-5 mx-auto w-20 h-[3px] rounded-full bg-[#e1c7a5]" />
    </div>
  );
};

export default Fact;
