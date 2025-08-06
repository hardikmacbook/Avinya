import React, { useState } from "react";

const facts = [
  "Did you know? The name Avinya means innovation in Sanskrit — and true to its name, Avinya Electricals once lit up an entire community event using just solar-powered LEDs, proving that bright ideas can literally light up the night! 💡⚡",
  "We hand-pick every product in our catalogue; no imposters allowed.",
  "The founding duo met over a mutual love of chai and well-made gadgets.",
  "We’ve delivered to over 100 cities all around India!",
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
