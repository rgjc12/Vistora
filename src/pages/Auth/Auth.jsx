import { useState } from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import VerificationPage from "./VerificationPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";

function Auth() {
  const [currentPage, setCurrentPage] = useState("login");
  const [history, setHistory] = useState(["login"]);

  const navigate = (page) => {
    if (page !== currentPage) {
      setHistory((prev) => [...prev, page]);
      setCurrentPage(page);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current page
      const previous = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentPage(previous);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage navigate={navigate} />;
      case "signup":
        return <SignupPage navigate={navigate} goBack={goBack} />;
      case "signup-step2":
        return <SignupPage step={2} navigate={navigate} goBack={goBack} />;
      case "verification":
        return <VerificationPage navigate={navigate} goBack={goBack} />;
      case "forgot-password":
        return <ForgotPasswordPage navigate={navigate} goBack={goBack} />;
      case "reset-password":
        return <ResetPasswordPage navigate={navigate} goBack={goBack} />;
      default:
        return <LoginPage navigate={navigate} />;
    }
  };

  return <AuthProvider>{renderPage()}</AuthProvider>;
}

export default Auth;
