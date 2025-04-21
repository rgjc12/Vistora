import { CheckCircle, Lock, Shield, Zap, ArrowRight, BarChart3, Clock } from "lucide-react"
import { AnimatedSection } from "./components/AnimatedSection"
import { ScrollToTop } from "./components/ScrollToTop"
import "./App.css"

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Header */}
      <header
        className="marble-bg text-white py-3 px-4 md:px-8 flex items-center justify-between"
        style={{ backgroundColor: "#800020" }}
      >
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src="/vistora-logo.svg" alt="Vistora" className="h-8 w-auto" />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-200 hover:text-white">
              Home
            </a>
          </nav>
          <button className="bg-white text-primary text-xs px-3 py-1 rounded">Sign In</button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="marble-bg p-8 rounded-lg text-white" style={{ backgroundColor: "#800020" }}>
              <AnimatedSection>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Streamlining Healthcare Claims with Blockchain Security
                </h1>
                <p className="mb-8 text-gray-100">Fast, Secure, and Frictionless Claim Processing</p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-primary px-6 py-2 rounded-sm text-sm font-medium hover:bg-gray-100 transition-colors">
                    Get Started
                  </button>
                  <button className="border border-white text-white px-6 py-2 rounded-sm text-sm font-medium hover:bg-white hover:text-primary transition-colors">
                    Learn More
                  </button>
                </div>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.2} direction="left">
              <div className="bg-gray-100 aspect-video w-full"></div>
            </AnimatedSection>
          </div>
        </section>

        {/* Value Propositions */}
        <section id="values" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10 text-center text-primary">Our Value Propositions</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={0.1} direction="up">
              <div className="flex flex-col items-center text-center p-6 border border-border-color rounded-lg hover:border-primary transition-colors">
                <div className="mb-4 text-primary">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Fast Claim Processing</h3>
                <p className="text-gray-600 text-sm">
                  Process claims in minutes instead of days with our blockchain technology
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="up">
              <div className="flex flex-col items-center text-center p-6 border border-border-color rounded-lg hover:border-primary transition-colors">
                <div className="mb-4 text-primary">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Automatic Workflows</h3>
                <p className="text-gray-600 text-sm">
                  Automate repetitive tasks and focus on what matters most - patient care
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} direction="up">
              <div className="flex flex-col items-center text-center p-6 border border-border-color rounded-lg hover:border-primary transition-colors">
                <div className="mb-4 text-primary">
                  <Lock className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Security</h3>
                <p className="text-gray-600 text-sm">
                  Protect sensitive patient information with military-grade encryption
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4} direction="up">
              <div className="flex flex-col items-center text-center p-6 border border-border-color rounded-lg hover:border-primary transition-colors">
                <div className="mb-4 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-medium mb-2">Fraud Prevention</h3>
                <p className="text-gray-600 text-sm">
                  Detect and prevent fraudulent claims with advanced AI algorithms
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10 text-center text-primary">Testimonials</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AnimatedSection delay={0.1} direction="left">
              <div
                className="marble-bg aspect-square w-full rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#800020" }}
              >
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200"></div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="right">
              <div className="relative p-6 border border-border-color rounded-lg">
                <blockquote className="text-gray-700">
                  <p className="mb-4 text-lg italic">
                    "Vistora has transformed our claims processing workflow. We've reduced processing time by 60% and
                    improved accuracy significantly."
                  </p>
                  <footer className="font-medium text-primary">
                    John Doe
                    <br />
                    <span className="text-gray-500 text-sm">Chief Technology Officer, Healthcare Inc.</span>
                  </footer>
                </blockquote>
                <div className="flex mt-6 space-x-2">
                  <button className="w-2 h-2 rounded-full bg-primary"></button>
                  <button className="w-2 h-2 rounded-full bg-gray-300"></button>
                  <button className="w-2 h-2 rounded-full bg-gray-300"></button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10 text-center text-primary">Overview of Features</h2>
          </AnimatedSection>
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={0.1} direction="left">
                <div className="bg-gray-100 aspect-square w-full rounded-lg flex items-center justify-center">
                  <Clock className="h-16 w-16 text-primary" />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Real-time Claim Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    Our platform provides real-time visibility into the status of every claim. Healthcare providers and
                    patients can track claims from submission to payment, with transparent updates at each stage of the
                    process.
                  </p>
                  <p className="text-gray-600 mb-4">
                    The intuitive dashboard displays key metrics like processing time, approval rates, and pending
                    actions, allowing administrators to identify bottlenecks and optimize workflows for maximum
                    efficiency.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <a href="#" className="flex items-center hover:underline">
                      See how it works
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={0.1} direction="left" className="order-2 md:order-1">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Smart Contract Automation</h3>
                  <p className="text-gray-600 mb-4">
                    Vistora leverages blockchain-based smart contracts to automate claim adjudication based on
                    predefined rules and policies. This eliminates manual review for standard claims, dramatically
                    reducing processing time and human error.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our system automatically validates claims against policy terms, checks for duplicate submissions,
                    and verifies provider credentials, ensuring compliance while accelerating payments.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <a href="#" className="flex items-center hover:underline">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right" className="order-1 md:order-2">
                <div className="marble-bg p-6 rounded-lg text-white" style={{ backgroundColor: "#800020" }}>
                  <h3 className="text-xl font-medium mb-6">Automation Benefits</h3>
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Processing Time</span>
                      </div>
                      <div className="text-sm">
                        <p>Reduced from 14 days to under 24 hours</p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-10 p-4 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Error Reduction</span>
                      </div>
                      <div className="text-sm">
                        <p>85% fewer processing errors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={0.1} direction="left">
                <div className="bg-gray-100 aspect-square w-full rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-primary" />
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Advanced Analytics Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    Gain valuable insights into your claims data with our comprehensive analytics dashboard. Visualize
                    trends, identify patterns, and make data-driven decisions to optimize your healthcare operations.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our platform provides customizable reports on key metrics such as claim volume, approval rates,
                    processing times, and denial reasons. Set up automated alerts for unusual patterns that might
                    indicate fraud or system issues.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <a href="#" className="flex items-center hover:underline">
                      Explore analytics features
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <div className="marble-bg p-10 rounded-lg" style={{ backgroundColor: "#800020" }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Join the Future of Healthcare Claims Management
              </h2>
              <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
                Secure, fast, and claim-centric productivity in just a few steps.
              </p>
              <button className="bg-white text-primary px-8 py-3 rounded-sm text-sm font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="marble-bg text-white py-8 px-4 md:px-8" style={{ backgroundColor: "#800020" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/vistora-logo.svg" alt="Vistora" className="h-10 w-auto mb-4" />
              <p className="text-gray-300 text-sm">A blockchain solution for healthcare</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">Contact</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>123 Blockchain Street</p>
                <p>San Francisco, CA 94103</p>
                <p>contact@vistora.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-red-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-300 mb-4 md:mb-0">© 2025 Vistora. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988c4.781-.75 8.437-4.887 8.437-9.878z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 4.948.072c-4.358.2-6.78 2.618-6.98 6.98C1.94 7.333 1.93 7.741 1.93 12c0 4.259.014 4.668.072 8.052c.2 4.354 2.618 6.78 6.98 6.979C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.979C22.069 16.667 22.07 16.259 22.07 12c0-4.259-.014-4.667-.072-8.052C21.8 1.618 19.382-.799 15.02.072 14.667.014 14.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
