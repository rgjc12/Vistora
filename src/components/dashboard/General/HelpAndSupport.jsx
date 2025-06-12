"use client";
import React, { useEffect, useState } from "react";
import { faqData } from "../../../pages/FAQ/data/faqData";
import FAQItem from "../../faq/FAQItem";

const HelpAndSupport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-full font-['Manrope',_sans-serif] my-4 mb-16">
      <div className="text-center mb-2 flex flex-col items-center w-full gap-2">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
          Vistora Help & Support
        </h1>
        <p className="text-[0.9rem] text-neutral-400 mb-4">
          Frequently asked questions about Vistora's decentralized AI platform
          for the Ayushman Bharat Scheme
        </p>

        <div className="relative max-w-xl mx-auto mb-12 transform hover:scale-102 transition-transform duration-300 w-full">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-4 py-3 rounded-lg border border-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#9a0026] shadow-lg bg-white/90 font-poppins"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 h-6 w-6 text-[#9a0026]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-7xl mx-auto">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={activeIndex === index}
              onClick={() => toggleFAQ(index)}
              bulletPoints={faq.bulletPoints}
              index={index}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-200 bg-red-800/50 font-['Aktiv_Grotesk',_'Manrope',_sans-serif] rounded-lg backdrop-blur-sm">
            No FAQs match your search. Please try different keywords.
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpAndSupport;
