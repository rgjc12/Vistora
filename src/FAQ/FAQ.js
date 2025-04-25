import "./index.css"
import FAQPage from "./components/FAQPage"
import FloatingButton from "./components/FloatingButton"

function FAQ() {
  return (
    <div
    className="min-h-screen bg-gradient-to-b from-red-900 to-red-800"
    style={{
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    }}
  >
    <FAQPage />
    <FloatingButton />
  </div>
)
}

export default FAQ
