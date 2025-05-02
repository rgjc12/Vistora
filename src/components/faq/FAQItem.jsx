import { useEffect, useState } from "react";

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
  bulletPoints,
  index,
}) => {
  const [mounted, setMounted] = useState(false);

  // Add staggered animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, index * 100); // Staggered animation

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`border border-neutral-400 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm 
      ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} 
      transform transition-all duration-500 ease-out`}
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: isOpen
          ? "0 10px 25px -5px rgba(128, 0, 0, 0.2)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none group"
        style={{
          background: isOpen
            ? "linear-gradient(to right, #f8f8f8, white)"
            : "white",
        }}
      >
        <span className="font-medium text-[0.85rem] sm:text-lg text-primary-dark font-poppins group-hover:text-primary-light transition-colors duration-300">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center bg-[#9a0026] bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 
          ${isOpen ? "bg-[#9a0026]" : ""}`}
        >
          <svg
            className={`w-5 h-5 text-primary-dark transform transition-transform duration-500 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out 
          ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-5 border-t border-primary-dark">
          <p className="text-gray-700 mb-4 font-poppins">
            {answer ? answer : ""}
          </p>

          {bulletPoints && bulletPoints.length > 0 && (
            <ul className="space-y-2 text-gray-700 font-poppins">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-dark mt-2 mr-2"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
