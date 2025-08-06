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
    <div className="max-w-2xl mx-auto py-16 px-4">
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
            className={`cursor-pointer group relative transition-all duration-300 hover:bg-orange-50/70 ${
              active === i ? "bg-gradient-to-br from-orange-50 via-orange-100 to-white" : ""
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
                className={`w-6 h-6 text-orange-500 transition-transform duration-500 ${
                  active === i ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden max-h-0 transition-all duration-500 ease-in-out ${
                active === i
                  ? "max-h-96 shadow-lg p-6 bg-gradient-to-tr from-orange-50 to-white/70"
                  : "max-h-0 p-0 shadow-none bg-none"
              }`}
            >
              <div className="text-gray-700 text-base">
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
