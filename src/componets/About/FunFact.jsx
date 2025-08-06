import React, { useState } from "react";

const facts = [
  "Our first customer was a close friend—now we serve over 50,000 happy customers!",
  "We hand-pick every product in our catalogue; no imposters allowed.",
  "The founding duo met over a mutual love of chai and well-made gadgets.",
  "We’ve delivered to over 100 cities all around India!"
];

const FunFact = () => {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * facts.length));
  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center bg-[#fff7e7] rounded-xl shadow-lg mt-8 mb-8">
      <h3 className="font-bold text-lg text-[#8b2727] mb-2">Fun Fact</h3>
      <p className="italic text-gray-700">{facts[idx]}</p>
      <button
        className="mt-4 underline text-[#8b2727] text-sm"
        onClick={() => setIdx((idx + 1) % facts.length)}
      >
        Show another fact
      </button>
    </div>
  );
};

export default FunFact;
