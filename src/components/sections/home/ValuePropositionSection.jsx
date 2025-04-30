import React from "react";

import { CheckCircle, Lock, Shield, Zap } from "lucide-react";
import { AnimatedSection } from "../../animations/AnimatedSection";

const ValuePropBlock = ({ icon, title, description, delay }) => {
  return (
    <AnimatedSection delay={delay ? delay : 0.1} direction="up">
      <div className="flex flex-col items-center text-center p-6 border border-border-color rounded-lg hover:border-primary transition-colors">
        <div className="mb-4 text-primary">
          {icon ? icon : <Zap className="h-8 w-8" />}
        </div>
        <h3 className="text-lg font-medium mb-2">
          {title ? title : "Value Prop"}
        </h3>
        <p className="text-gray-600 text-sm">
          {description ? description : "Descritpion"}
        </p>
      </div>
    </AnimatedSection>
  );
};

const ValuePropositionSection = () => {
  return (
    <section
      id="values"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <AnimatedSection>
        <h2 className="text-4xl lg:text-5xl font-light font-poppins mb-10 text-center text-primary">
          Our Value Propositions
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ValuePropBlock
          icon={<Zap className="h-8 w-8" />}
          title={"Fast Claim Processing"}
          description={
            "Process claims in minutes instead of days with our blockchain technology"
          }
          delay={0.1}
        />
        <ValuePropBlock
          icon={<CheckCircle className="h-8 w-8" />}
          title={"Automatic Workflows"}
          description={
            "Automate repetitive tasks and focus on what matters most - patient care"
          }
          delay={0.2}
        />
        <ValuePropBlock
          icon={<Lock className="h-8 w-8" />}
          title={"Data Security"}
          description={
            " Protect sensitive patient information with military-grade encryption"
          }
          delay={0.3}
        />
        <ValuePropBlock
          icon={<Shield className="h-8 w-8" />}
          title={"Fraud Prevention"}
          description={
            "Detect and prevent fraudulent claims with advanced AI algorithms"
          }
          delay={0.4}
        />
      </div>
    </section>
  );
};

export default ValuePropositionSection;
