import React from "react";

import { AnimatedSection } from "../../animations/AnimatedSection";
import PrimaryButton from "../../buttons/PrimaryButton";
import SecondaryButton from "../../buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSectionMain = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  return (
    <section
      id="heroMain"
      className="relative flex w-full max-w-[3000px] h-[75vh] md:h-[95vh] min-h-[600px] md:min-h-[800px] max-h-[1000px] mx-auto bg-red-400 overflow-hidden "
    >
      <div id="heroArt" className="w-full h-full absolute -z-0 right-0 top-0">
        <picture className="h-full w-full object-cover">
          <source
            srcSet="/images/hero-wet-flower-big.png"
            media="(min-width: 768px)"
          />
          <img
            src="/images/hero-wet-small.png"
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
        id="heroCopyContainer"
        className="flex flex-col items-center md:items-start justify-start md:justify-center h-full w-full md:w-[80vw] md:max-w-[800px] xl:max-w-[1000px] min-[2000px]:max-w-[1200px] py-8 px-4 md:px-12 bg-red-400 z-10 pt-[80px] "
      >
        <AnimatedSection>
          <div className="flex flex-col pt-[64px] md:pt-0 md:items-start text-center md:text-left w-full z-10 max-w-[600px] xl:max-w-[875px] min-[2000px]:max-w-[900px]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4 text-white">
              Streamlining Healthcare Claims with Blockchain Security
            </h1>
            <p className="mb-12 text-gray-200 font-normal text-lg lg:text-2xl">
              Fast, Secure, and Frictionless Claim Processing
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 w-full">
              {/** Made a button component for easier styling, editting, and tracking */}
              {user ? (
                <PrimaryButton
                  buttonText={"My Dashboard"}
                  action={() => navigate("/dashboard/claims-summary")}
                />
              ) : (
                <PrimaryButton
                  buttonText={"Get Started"}
                  action={() => navigate("/auth")}
                />
              )}

              <SecondaryButton
                buttonText={"Learn More"}
                action={() => navigate("/faq")}
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSectionMain;
