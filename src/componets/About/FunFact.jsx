import React, { useState } from "react";

const facts = [
  "Our first customer was a close friend—now we serve over 50,000 happy customers!",
  "We hand-pick every product in our catalogue; no imposters allowed.",
  "The founding duo met over a mutual love of chai and well-made gadgets.",
  "We’ve delivered to over 100 cities all around India!",
];

const FunFact = () => {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * facts.length));
  const [fade, setFade] = useState(true);

  const showNextFact = () => {
    setFade(false);
    setTimeout(() => {
      setIdx((prev) => (prev + 1) % facts.length);
      setFade(true);
    }, 300);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 mb-12 px-8 py-12 rounded-2xl shadow-2xl bg-gradient-to-br from-[#fff4e5] via-[#fff7e7] to-[#ffecda] border border-[#f6d9bc] relative overflow-hidden select-none">
      {/* Decorative Sparkle Dot */}
      <div className="absolute top-4 left-8 w-4 h-4 bg-gradient-to-br from-[#d2af6f] to-[#b47428] rounded-full opacity-60 blur-md animate-pulse" />
      {/* Decorative Blob */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-tr from-[#ffe1bb] to-[#fdf6df] opacity-50 blur-2xl pointer-events-none" />
      <h3 className="font-extrabold text-2xl md:text-3xl text-[#8b2727] mb-4 tracking-tight drop-shadow-sm">
        Fun Fact
      </h3>
      <p
        className={`italic text-lg text-[#6d4425] transition-opacity duration-300 ease-in-out mb-7 min-h-[4rem] flex items-center justify-center`}
        style={{
          opacity: fade ? 1 : 0,
          fontFamily: "Georgia,Times New Roman,serif",
          letterSpacing: "0.01em",
        }}
      >
        {facts[idx]}
      </p>
      <button
        onClick={showNextFact}
        className="inline-block px-5 py-2 rounded-full bg-[#8b2727] text-white font-medium shadow hover:bg-[#a85f45] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#d2af6f] border-2 border-[#d2af6f] "
        aria-label="Show another fun fact"
      >
        Show another fact
      </button>
      {/* Glow Ring */}
      <div className="pointer-events-none absolute -inset-1 rounded-2xl ring-[6px] ring-[#d2af6f]/20" />
    </div>
  );
};

export default FunFact;
