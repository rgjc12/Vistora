import "../styles/App.css";
import Header from "../components/navigation/Header";
import HeroSectionMain from "../components/sections/home/HeroSectionMain";
import ValuePropositionSection from "../components/sections/home/ValuePropositionSection";
import CTASection from "../components/sections/home/CTASection";
import Footer from "../components/navigation/Footer";
import TestimonialSection from "../components/sections/home/TestimonialSection";
import FeaturesSection from "../components/sections/home/FeaturesSection";
import { ScrollToTop } from "../components/animations/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Scroll to Top Button */}
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSectionMain />
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
