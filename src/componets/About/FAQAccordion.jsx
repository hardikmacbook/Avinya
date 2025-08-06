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
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div
        className="text-center mb-10"
        style={{
          background: "linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)",
          borderRadius: "1rem",
          padding: "1.5rem 0 1.75rem 0",
          boxShadow:
            "0 8px 24px 0 rgba(251, 146, 60, 0.07), 0 1.5px 3px 0 #fb923c18",
        }}
      >
        <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-amber-600 to-red-400 text-transparent bg-clip-text tracking-tight">
          Why Choose Us?
        </h2>
        <p className="text-gray-700 text-md flex items-center gap-2 justify-center">
          <Info className="w-5 h-5 text-orange-400" />
          Get to know us and what we stand for.
        </p>
      </div>
      <div className="rounded-2xl bg-white/85 shadow-2xl ring-1 ring-orange-100 backdrop-blur divide-y divide-orange-100">
        {faqs.map((item, i) => (
          <div
            key={item.question}
            className={`transition-all duration-300 hover:bg-orange-50/80 relative ${
              active === i ? "bg-orange-50/80" : ""
            }`}
            onClick={() => setActive(i === active ? null : i)}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-semibold text-lg text-slate-900 flex gap-3 items-center">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-full
                    bg-gradient-to-br from-orange-300 to-red-200 shadow
                    text-orange-900/80"
                >
                  {i + 1}
                </span>
                {item.question}
              </span>
              <ChevronDown
                className={`w-6 h-6 text-orange-500 transition-transform duration-300 ${
                  active === i ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden grid transition-[grid-template-rows] duration-300 ${
                active === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="px-14 pb-5 text-gray-700 text-base">
                {item.answer}
              </div>
            </div>
            <div
              className={`absolute left-0 bottom-0 w-full border-b-2 border-dashed border-orange-100 transition-all ${
                active === i ? "opacity-0 scale-x-75" : "opacity-100"
              }`}
              style={{ transformOrigin: "left" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
