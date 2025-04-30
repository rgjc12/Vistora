import Footer from "../../components/navigation/Footer";
import Header from "../../components/navigation/Header";
import HeroSectionFaq from "../../components/sections/faq/HeroSectionFaq";
import CTASection from "../../components/sections/home/CTASection";
import "../../styles/Faq.css";

import FAQPage from "./FAQPage.jsx";

function FAQ() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Scroll to Top Button */}
      <Header />
      <main className="flex-grow">
        {/* Hero FAQ Section */}
        <HeroSectionFaq />
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
