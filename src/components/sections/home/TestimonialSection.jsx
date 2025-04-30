import React from "react";

import { AnimatedSection } from "../../animations/AnimatedSection";
import Carousel from "../../ui/Carousel";

const TestimonialSection = () => {
  const testimonialsList = [
    {
      author: "John Doe",
      authorDetails: "Chief Technology Officer, Healthcare Inc.",
      text: `Vistora has transformed our claims processing workflow. We've
        reduced processing time by 60% and improved accuracy
        significantly.`,
    },
    {
      author: "Laura Croft",
      authorDetails: "Chief Technology Officer, Healthcare Inc.",
      text: `Since switching to Vistora, our team spends less time on repetitive tasks and more time delivering better service. It’s like we gained an extra set of hands without hiring anyone.`,
    },
    {
      author: "Blue Anthem",
      authorDetails: "Chief Technology Officer, Healthcare Inc.",
      text: `Vistora gave us instant visibility into our claims pipeline. Our turnaround time improved dramatically—and our clients noticed. It’s become an essential part of how we operate.`,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <AnimatedSection>
        <h2 className="text-4xl lg:text-5xl font-light font-poppins mb-10 text-center text-primary">
          Testimonials
        </h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <AnimatedSection delay={0.1} direction="left">
          <div
            className="marble-bg aspect-square w-full rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#800020" }}
          >
            <img
              src="/images/testimonial-placeholder.jpg"
              alt="testimonial"
              className="w-full h-full object-cover"
            />
            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 hidden"></div>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2} direction="right">
          <Carousel slideList={testimonialsList} />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialSection;
