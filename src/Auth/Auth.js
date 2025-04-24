import { useState } from "react"
import { AuthProvider } from "./AuthContext"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import ForgotPasswordPage from "./components/ForgotPasswordPage"
import ResetPasswordPage from "./components/ResetPasswordPage"
import VerificationPage from "./components/VerificationPage"

function Auth() {
  const [currentPage, setCurrentPage] = useState("login")
  // Add a history state to track navigation history
  const [history, setHistory] = useState(["login"])

  // Update the navigate function to track history
  const navigate = (page) => {
    if (page !== currentPage) {
      setHistory((prev) => [...prev, page])
      setCurrentPage(page)
    }
  }

  // Add a goBack function
  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history]
      newHistory.pop() // Remove current page
      const previousPage = newHistory[newHistory.length - 1]
      setCurrentPage(previousPage)
      setHistory(newHistory)
    }
  }

  // Update the renderPage function to pass goBack to components
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage navigate={navigate} />
      case "signup":
        return <SignupPage navigate={navigate} goBack={goBack} />
      case "signup-step2":
        return <SignupPage step={2} navigate={navigate} goBack={goBack} />
      case "verification":
        return <VerificationPage navigate={navigate} goBack={goBack} />
      case "forgot-password":
        return <ForgotPasswordPage navigate={navigate} goBack={goBack} />
      case "reset-password":
        return <ResetPasswordPage navigate={navigate} goBack={goBack} />
      default:
        return <LoginPage navigate={navigate} />
    }
  }

  return <AuthProvider navigate={navigate}>{renderPage()}</AuthProvider>
}

export default Auth
