import { useState, useEffect } from "react"
import FAQItem from "./FAQItem"
import { faqData } from "../data/faqData"
import { useNavigate } from "react-router-dom"


const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeIndex, setActiveIndex] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const navigate = useNavigate()

  return (
    <div
      className={`container mx-auto px-4 py-12 max-w-4xl transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
    >
      {/* Title Button */}
      <div className="fixed top-4 left-4 z-50">
  <button
    onClick={() => navigate("/")}
    className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-poppins font-medium flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    Title
  </button>
</div>


      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-4xl font-bold text-white mb-4 font-poppins">Vistora FAQ</h1>
        <p className="text-lg text-gray-200 mb-8 font-poppins">
          Frequently asked questions about Vistora's decentralized AI platform for the Ayushman Bharat Scheme
        </p>

        <div className="relative max-w-xl mx-auto mb-12 transform hover:scale-102 transition-transform duration-300">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-4 py-3 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-lg bg-white/90 font-poppins"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-3 h-6 w-6 text-red-500"
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

      <div className="space-y-4">
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
          <div className="text-center py-8 text-gray-200 font-poppins bg-red-800/50 rounded-lg backdrop-blur-sm">
            No FAQs match your search. Please try different keywords.
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQPage
