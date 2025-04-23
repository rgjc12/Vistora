"use client"

import { useState } from "react"
import { AuthProvider } from "./AuthContext"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import ForgotPasswordPage from "./components/ForgotPasswordPage"
import ResetPasswordPage from "./components/ResetPasswordPage"
import VerificationPage from "./components/VerificationPage"

function Auth() {
  const [currentPage, setCurrentPage] = useState("login")

  // Simple router function to navigate between pages
  const navigate = (page) => {
    setCurrentPage(page)
  }

  // Render the appropriate component based on the current page
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage navigate={navigate} />
      case "signup":
        return <SignupPage navigate={navigate} />
      case "signup-step2":
        return <SignupPage step={2} navigate={navigate} />
      case "verification":
        return <VerificationPage navigate={navigate} />
      case "forgot-password":
        return <ForgotPasswordPage navigate={navigate} />
      case "reset-password":
        return <ResetPasswordPage navigate={navigate} />
      default:
        return <LoginPage navigate={navigate} />
    }
  }

  return <AuthProvider navigate={navigate}>{renderPage()}</AuthProvider>
}

export default Auth
