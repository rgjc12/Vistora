import React from "react";
import { ArrowRight, BarChart3, Clock } from "lucide-react";
import { AnimatedSection } from "../../animations/AnimatedSection";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <AnimatedSection>
        <h2 className="text-4xl lg:text-5xl font-light font-poppins mb-10 text-center text-foreground">
          Overview of Features
        </h2>
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
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Real-time Claim Tracking
              </h3>
              <p className="text-gray-600 mb-4">
                Our platform provides real-time visibility into the status of
                every claim. Healthcare providers and patients can track claims
                from submission to payment, with transparent updates at each
                stage of the process.
              </p>
              <p className="text-gray-600 mb-4">
                The intuitive dashboard displays key metrics like processing
                time, approval rates, and pending actions, allowing
                administrators to identify bottlenecks and optimize workflows
                for maximum efficiency.
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
          <AnimatedSection
            delay={0.1}
            direction="left"
            className="order-2 md:order-1"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Smart Contract Automation
              </h3>
              <p className="text-gray-600 mb-4">
                Vistora leverages blockchain-based smart contracts to automate
                claim adjudication based on predefined rules and policies. This
                eliminates manual review for standard claims, dramatically
                reducing processing time and human error.
              </p>
              <p className="text-gray-600 mb-4">
                Our system automatically validates claims against policy terms,
                checks for duplicate submissions, and verifies provider
                credentials, ensuring compliance while accelerating payments.
              </p>
              <div className="flex items-center text-primary font-medium">
                <a href="#" className="flex items-center hover:underline">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection
            delay={0.2}
            direction="right"
            className="order-1 md:order-2"
          >
            <div
              className="marble-bg p-6 rounded-lg text-white"
              style={{ backgroundColor: "#800020" }}
            >
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
              <h3 className="text-xl font-bold mb-4 text-foreground">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-4">
                Gain valuable insights into your claims data with our
                comprehensive analytics dashboard. Visualize trends, identify
                patterns, and make data-driven decisions to optimize your
                healthcare operations.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform provides customizable reports on key metrics such
                as claim volume, approval rates, processing times, and denial
                reasons. Set up automated alerts for unusual patterns that might
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
  );
};

export default FeaturesSection;
