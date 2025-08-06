import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

const faqs = [
  {
    question: "What makes your shop different?",
    answer: "We’re founded on friendship, transparency, and real-world retail expertise. Every customer is treated like family."
  },
  {
    question: "How do you guarantee quality?",
    answer: "We handpick trusted suppliers and products. If you aren’t happy, we’ll make it right—always."
  },
  {
    question: "What’s your vision for the future?",
    answer: "We want to grow, yes—but only by empowering our customers and improving lives with every transaction."
  }
];

const FAQAccordion = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3">Why Choose Us?</h2>
        <p className="text-gray-600">Get to know us and what we stand for.</p>
      </div>
      <div className="rounded-xl bg-white shadow-lg divide-y">
        {faqs.map((item, i) => (
          <div
            key={item.question}
            className="cursor-pointer"
            onClick={() => setActive(i === active ? null : i)}
          >
            <div className="flex justify-between items-center p-5">
              <span className="font-semibold text-gray-900">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#8b2727] transition-transform duration-200 ${active === i ? "rotate-180" : ""}`}
              />
            </div>
            {active === i && (
              <div className="p-5 pl-8 text-gray-700 text-base bg-gray-50">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
