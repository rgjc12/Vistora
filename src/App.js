import { ScrollToTop } from "./components/ScrollToTop";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Header from "./components/sections/Header";
import HeroSection from "./components/sections/HeroSection";
import Footer from "./components/sections/Footer";
import CTASection from "./components/sections/CTASection";
import ValuePropositionSection from "./components/sections/ValuePropositionSection";
import TestimonialSection from "./components/sections/TestimonialSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import Carousel from "./components/ui/Carousel";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll to Top Button */}
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        {/* Value Propositions */}
        <ValuePropositionSection />
        {/* Testimonials */}
        <TestimonialSection />
        {/* Features */}
        <FeaturesSection />
        {/* CTA */}
        <CTASection />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
