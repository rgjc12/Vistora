import React from "react";
import { AnimatedSection } from "../AnimatedSection";

const TestimonialSection = () => {
  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <AnimatedSection>
        <h2 className="text-2xl font-bold mb-10 text-center text-primary">
          Testimonials
        </h2>
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
                "Vistora has transformed our claims processing workflow. We've
                reduced processing time by 60% and improved accuracy
                significantly."
              </p>
              <footer className="font-medium text-primary">
                John Doe
                <br />
                <span className="text-gray-500 text-sm">
                  Chief Technology Officer, Healthcare Inc.
                </span>
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
  );
};

export default TestimonialSection;
