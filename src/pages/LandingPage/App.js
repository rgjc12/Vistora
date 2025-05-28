import "../../styles/App.css";
import "../../styles/index.css";
import Header from "../../components/navigation/Header";
import Footer from "../../components/navigation/Footer";
import HeroSectionMain from "../../components/sections/home/HeroSectionMain";
import ValuePropositionSection from "../../components/sections/home/ValuePropositionSection";
import CTASection from "../../components/sections/home/CTASection";
import TestimonialSection from "../../components/sections/home/TestimonialSection";
import FeaturesSection from "../../components/sections/home/FeaturesSection";
import { ScrollToTop } from "../../components/animations/ScrollToTop";
import LoginPage from "../Auth/LoginPage";
import ForgotPasswordPage from "../Auth/ForgotPasswordPage";
import { Routes, Route } from "react-router-dom";
import SignupPage from "../Auth/SignupPage";
import { useSelector } from "react-redux";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <HeroSectionMain />
                {/* Value Propositions */}
                <ValuePropositionSection />
                {/* Testimonials */}
                <TestimonialSection />
                <FeaturesSection />
                <CTASection />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/SignUpPage" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
