import React from "react";

import { CheckCircle, Lock, Shield, Zap } from "lucide-react";
import { AnimatedSection } from "../../animations/AnimatedSection";

const ValuePropositionSection = () => {
  return (
    <section
      id="values"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <AnimatedSection>
        <h2 className="text-2xl font-bold mb-10 text-center text-primary">
          Our Value Propositions
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatedSection delay={0.1} direction="up">
          <div className="flex flex-col items-center text-center p-6 border border-border-color rounded-lg hover:border-primary transition-colors">
            <div className="mb-4 text-primary">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-medium mb-2">Fast Claim Processing</h3>
            <p className="text-gray-600 text-sm">
              Process claims in minutes instead of days with our blockchain
              technology
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
              Automate repetitive tasks and focus on what matters most - patient
              care
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
              Protect sensitive patient information with military-grade
              encryption
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
  );
};

export default ValuePropositionSection;
