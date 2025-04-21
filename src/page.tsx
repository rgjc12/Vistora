import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Lock, Shield, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import React from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-black text-white py-2 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/vistora-logo.svg" alt="Vistora" width={100} height={30} className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="#" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </nav>
          <button className="bg-white text-black text-xs px-3 py-1 rounded">Sign In</button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Streamlining Healthcare Claims with Blockchain Security
              </h1>
              <p className="text-gray-600 mb-8">Fast, Secure, and Frictionless Claim Processing</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-black text-white px-6 py-2 rounded-sm text-sm font-medium">Get Started</button>
                <button className="border border-gray-300 px-6 py-2 rounded-sm text-sm font-medium">Learn More</button>
              </div>
            </div>
            <div className="bg-gray-100 aspect-video w-full"></div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10 text-center">Our Value Propositions</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatedSection delay={0.1} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium mb-2">Fast Claim Processing</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium mb-2">Automatic Workflows</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium mb-2">Data Security</h3>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4} direction="up">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium mb-2">Fraud Prevention</h3>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10 text-center">Testimonials</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <AnimatedSection delay={0.1} direction="left">
              <div className="bg-gray-100 aspect-square w-full"></div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} direction="right">
              <div className="relative">
                <blockquote className="text-gray-700">
                  <p className="mb-4">
                    "Vistora has transformed our claims processing workflow. We've reduced processing time by 60% and
                    improved accuracy significantly."
                  </p>
                  <footer className="font-medium">
                    John Doe
                    <br />
                    <span className="text-gray-500 text-sm">Chief Technology Officer, Healthcare Inc.</span>
                  </footer>
                </blockquote>
                <div className="flex mt-6 space-x-2">
                  <button className="w-2 h-2 rounded-full bg-black"></button>
                  <button className="w-2 h-2 rounded-full bg-gray-300"></button>
                  <button className="w-2 h-2 rounded-full bg-gray-300"></button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-10 text-center">Overview of Features</h2>
          </AnimatedSection>
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={0.1} direction="left">
                <div className="bg-gray-100 aspect-square w-full"></div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <div>
                  <h3 className="text-xl font-bold mb-4">Feature One</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={0.1} direction="left">
                <div className="bg-gray-100 aspect-square w-full"></div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <div>
                  <h3 className="text-xl font-bold mb-4">Feature Two</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection delay={0.1} direction="left">
                <div className="bg-gray-100 aspect-square w-full"></div>
              </AnimatedSection>
              <AnimatedSection delay={0.2} direction="right">
                <div>
                  <h3 className="text-xl font-bold mb-4">Feature Three</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Future of Healthcare Claims Management.</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Secure, fast, and claim-centric productivity in just a few steps.
            </p>
            <button className="bg-black text-white px-6 py-2 rounded-sm text-sm font-medium">Get Started</button>
          </AnimatedSection>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/vistora-logo.svg" alt="Vistora" width={120} height={36} className="h-10 w-auto mb-4" />
              <p className="text-gray-400 text-sm">A blockchain solution for healthcare</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#">Our Story</Link>
                </li>
                <li>
                  <Link href="#">Team</Link>
                </li>
                <li>
                  <Link href="#">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#">Features</Link>
                </li>
                <li>
                  <Link href="#">Security</Link>
                </li>
                <li>
                  <Link href="#">How It Works</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-4">Contact</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>123 Blockchain Street</p>
                <p>San Francisco, CA 94103</p>
                <p>contact@vistora.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400 mb-4 md:mb-0">© 2025 Vistora. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </Link>
              <Link href="#" aria-label="Facebook">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988c4.781-.75 8.437-4.887 8.437-9.878z"></path>
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
