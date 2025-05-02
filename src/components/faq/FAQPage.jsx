import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FAQItem from "./FAQItem";
import { faqData } from "../data/faqData";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredFAQs = faqData.filter(({ question, answer }) =>
    `${question} ${answer}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`container mx-auto px-4 py-12 max-w-4xl border-2 border-green-400 transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 font-poppins">
          Vistora FAQ
        </h1>
        <p className="text-lg text-gray-200 mb-8 font-poppins">
          Frequently asked questions about Vistora's decentralized AI platform
          for the Ayushman Bharat Scheme
        </p>

        <div className="relative max-w-xl mx-auto mb-12 transform hover:scale-102 transition-transform duration-300">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-red-300 bg-white/90 shadow-lg font-poppins focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <svg
            className="absolute right-3 top-3 w-6 h-6 text-red-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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

      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              bulletPoints={faq.bulletPoints}
              isOpen={activeIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-200 font-poppins bg-red-800/50 rounded-lg backdrop-blur-sm">
            No FAQs match your search. Please try different keywords.
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
