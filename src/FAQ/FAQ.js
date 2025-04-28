import "./index.css";

import FloatingButton from "./components/FloatingButton";
import FAQItem from "./components/FAQItem";
import { ScrollToTop } from "../components/ScrollToTop";
import Header from "../components/sections/Header";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/sections/Footer";
import FAQPage from "./components/FAQPage.jsx";

function FAQ() {
  return (
    <div className="flex flex-col min-h-screen marble-bg">
      {/* Scroll to Top Button */}
      <Header />
      <main className="flex-grow border-2 border-yellow-300 bg-white">
        {/* FAQ Section */}
        <FAQPage />
        {/* CTA */}
        <CTASection />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FAQ;
