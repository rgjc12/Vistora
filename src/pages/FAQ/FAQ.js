import Footer from "../../components/navigation/Footer";
import Header from "../../components/navigation/Header";
import CTASection from "../../components/sections/home/CTASection";
import "../../styles/Faq.css";

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
