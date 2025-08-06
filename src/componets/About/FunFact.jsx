import React, { useState, useEffect } from "react";

const facts = [
  "Our first customer was a close friend—now we serve over 50,000 happy customers!",
  "We hand-pick every product in our catalogue; no imposters allowed.",
  "The founding duo met over a mutual love of chai and well-made gadgets.",
  "We’ve delivered to over 100 cities all around India!",
];

const FunFact = () => {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * facts.length));
  const [fade, setFade] = useState(true);

  // Handle fade out and fade in for smooth transition between facts
  const showNextFact = () => {
    setFade(false); // fade out
    setTimeout(() => {
      setIdx((prev) => (prev + 1) % facts.length);
      setFade(true); // fade in
    }, 300); // duration matches CSS transition
  };

  return (
    <div className="max-w-lg mx-auto py-12 px-6 text-center bg-[#fff7e7] rounded-xl shadow-lg mt-8 mb-8 select-none">
      <h3 className="font-bold text-xl text-[#8b2727] mb-3">Fun Fact</h3>
      <p
        className={`italic text-gray-700 transition-opacity duration-300 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        } min-h-[4rem] flex items-center justify-center`}
        style={{ minHeight: "4rem" }}
      >
        {facts[idx]}
      </p>
      <button
        onClick={showNextFact}
        className="mt-6 underline text-[#8b2727] text-sm hover:text-[#a74343] transition-colors duration-300 focus:outline-none focus:ring-orange-300"
        aria-label="Show another fun fact"
      >
        Show another fact
      </button>
    </div>
  );
};

export default FunFact;
