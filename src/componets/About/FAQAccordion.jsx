import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

const faqs = [
  {
    question: "What makes your shop different?",
    answer:
      "We’re founded on friendship, transparency, and real-world retail expertise. Every customer is treated like family.",
  },
  {
    question: "How do you guarantee quality?",
    answer:
      "We handpick trusted suppliers and products. If you aren’t happy, we’ll make it right—always.",
  },
  {
    question: "What’s your vision for the future?",
    answer:
      "We want to grow, yes—but only by empowering our customers and improving lives with every transaction.",
  },
];

const FAQAccordion = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-4xl mx-auto py-20 px-10">
      {/* Header unchanged */}
      <div
        className="text-center mb-10"
        style={{
          background: "linear-gradient(90deg, #8b2727 50%, #d2af6f 50%)",
          borderRadius: "1rem",
          padding: "1.5rem 0 1.75rem 0",
          boxShadow:
            "0 8px 24px 0 rgba(251, 146, 60, 0.07), 0 1.5px 3px 0 #fb923c18",
        }}
      >
        <h2 className="text-black text-4xl font-extrabold mb-2 bg-clip-text tracking-tight">
          Why Choose Us?
        </h2>
        <p className="text-white text-md flex items-center gap-2 justify-center">
          <Info className="w-5 h-5 text-white" />
          Get to know us and what we stand for.
        </p>
      </div>

      {/* Accordion */}
      <div className="rounded-3xl bg-white/90 shadow-[0_18px_50px_rgba(251,146,60,0.2)] ring-1 ring-orange-200 backdrop-blur-md divide-y divide-orange-200">
        {faqs.map((item, i) => {
          const isActive = active === i;
          return (
            <div
              key={item.question}
              className={`cursor-pointer relative transition-all duration-350 ease-in-out
                ${
                  isActive
                    ? "bg-gradient-to-br from-orange-50 via-orange-100 to-white"
                    : "hover:bg-orange-50/60"
                }
                hover:shadow-lg hover:scale-[1.01] rounded-t-3xl select-none`}
              onClick={() => setActive(isActive ? null : i)}
              aria-expanded={isActive}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActive(isActive ? null : i);
                }
              }}
            >
              <div className="flex items-center justify-between px-8 py-6">
                <span className="font-semibold text-xl text-slate-900 flex gap-4 items-center break-words">
                  <span
                    className={`flex items-center justify-center w-12 h-12 rounded-full
                      bg-gradient-to-br from-orange-400 to-red-300 shadow-md
                      text-orange-900/90 font-semibold text-lg transition-transform duration-300
                      ${isActive ? "scale-110 shadow-lg" : "scale-100"}`}
                  >
                    {i + 1}
                  </span>
                  <span className="whitespace-normal">{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-7 h-7 text-orange-600 transition-transform duration-500 ${
                    isActive ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </div>
              <div
                className={`overflow-hidden max-h-0 transition-[max-height,padding,box-shadow] duration-500 ease-in-out
                  ${
                    isActive
                      ? "max-h-96 p-8 shadow-lg bg-gradient-to-tr from-orange-50 to-white/80 rounded-b-3xl mt-1"
                      : "p-0 shadow-none mt-0"
                  }`}
              >
                <p className="text-gray-700 text-lg leading-relaxed break-words whitespace-normal">
                  {item.answer}
                </p>
              </div>
              <div
                className={`absolute left-0 bottom-0 w-full border-b-2 border-dashed border-orange-200 transition-all duration-500 ${
                  isActive ? "opacity-0 scale-x-75" : "opacity-100 scale-x-100"
                }`}
                style={{ transformOrigin: "left" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;
