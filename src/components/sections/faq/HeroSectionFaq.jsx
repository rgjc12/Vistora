import React from "react";
import { AnimatedSection } from "../../animations/AnimatedSection";

const HeroSectionFaq = () => {
  return (
    <section
      id="heroFaq"
      className="relative flex w-full max-w-[3000px] h-[45vh] md:h-[50vh] min-h-[400px] md:min-h-[600px] max-h-[1000px] mx-auto bg-red-400 overflow-hidden"
    >
      <div id="heroArt" className="w-full h-full absolute -z-0 right-0 top-0">
        <picture className="h-full w-full object-cover">
          <source
            srcSet="/images/vistora-about-hero.png"
            media="(min-width: 768px)"
          />
          <img
            src="/images/vistora-about-hero.png"
            alt="Hero"
            className="h-full w-full object-cover"
          />
        </picture>
        {/**
 * <img
      src="/images/hero-wet-flower-big.png" // fallback image
      srcSet="/images/hero-wet-small.png 767w, /images/hero-wet-flower-big.png 768w"
      sizes="(max-width: 767px) 100vw, 768px"
      alt="Hero"
      className="h-full w-full object-cover object-bottom md:object-center"
    />
 */}
      </div>
      <div
        id="heroFAQOverlay"
        className="absolute z-0 w-full h-full top-0 bottom-0 right-0 left-0"
      ></div>
      <div
        id="heroCopyContainerFAQ"
        className="flex flex-col items-center md:items-start justify-start md:justify-center h-full w-full md:w-[90vw]  min-[2000px]:max-w-[3000px] py-8 px-4 md:px-12 bg-red-400 z-10 pt-[80px]"
      >
        <AnimatedSection>
          <div className="flex flex-col pt-[64px] md:pt-0 md:items-start text-center md:text-left w-full z-10 max-w-[450px] lg:max-w-[600px] min-[2000px]:max-w-[800px]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4 text-white">
              Discover Vistora
            </h1>
            <p className="mb-12 text-gray-200 font-normal text-lg lg:text-2xl">
              Everything you need to know about who we are, what we do, and how
              we help.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSectionFaq;
