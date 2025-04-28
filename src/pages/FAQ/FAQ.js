import Footer from "../../components/navigation/Footer";
import Header from "../../components/navigation/Header";
import CTASection from "../../components/sections/home/CTASection";
import "../../styles/Faq.css";

import FAQPage from "./FAQPage.jsx";

function FAQ() {
  return (
    <div className="flex flex-col min-h-screen bg-[#800020]">
      {/* Scroll to Top Button */}
      <Header />
      <main className="flex-grow  mt-[80px] ">
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
