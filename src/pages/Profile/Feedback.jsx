import { useState } from "react"
import PageHeader from "./components/PageHeader.jsx"
import { Star, Send } from "lucide-react"

const Feedback = () => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedbackType, setFeedbackType] = useState("general")
  const [feedbackText, setFeedbackText] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log({
      rating,
      feedbackType,
      feedbackText,
    })

    // Show success message
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setRating(0)
      setFeedbackType("general")
      setFeedbackText("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="p-6">
      <PageHeader title="Provide Feedback" />

      <div className="bg-white p-6 rounded-lg shadow">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-green-600 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your feedback has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-4 text-gray-600">
                  {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">What type of feedback do you have?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["general", "bug", "feature"].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="radio"
                      id={type}
                      name="feedbackType"
                      value={type}
                      checked={feedbackType === type}
                      onChange={() => setFeedbackType(type)}
                      className="mr-2"
                    />
                    <label htmlFor={type} className="capitalize">
                      {type === "general" ? "General Feedback" : type === "bug" ? "Report a Bug" : "Feature Request"}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
              <textarea
                className="w-full p-3 border rounded"
                rows="5"
                placeholder="Please share your thoughts..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
              disabled={rating === 0 || feedbackText.trim() === ""}
            >
              <Send size={16} className="mr-2" />
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Feedback
