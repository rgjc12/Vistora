import React from "react";
import { AnimatedSection } from "../AnimatedSection";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div
          className="marble-bg p-8 text-white h-full flex flex-col justify-center"
          style={{ backgroundColor: "#800020" }}
        >
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Streamlining Healthcare Claims with Blockchain Security
            </h1>
            <p className="mb-8 text-gray-100">
              Fast, Secure, and Frictionless Claim Processing
            </p>
            <div className="flex flex-wrap gap-4">
              {/** Made a button component for easier styling, editting, and tracking */}
              <PrimaryButton buttonText={"Get Started"} />
              <SecondaryButton buttonText={"Learn More"} />
            </div>
          </AnimatedSection>
        </div>
        <AnimatedSection delay={0.2} direction="left">
          <div className="bg-gray-100 aspect-video w-full"></div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;
