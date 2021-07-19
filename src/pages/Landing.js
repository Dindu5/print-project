import React from "react";
import tw from "twin.macro";
// import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage";

import Hero from "../components/Hero";
import Features from "../components/Features";
import MainFeature from "../components/MainFeatures";
import Pricing from "../components/Pricing";
import FAQ from "../components/Faq.js";
import GetStarted from "../components/GetStarted.js";
import Footer from "../components/Footer.js";
import FeatureWithSteps from "../components/FeaturesWithSteps";
import macHeroScreenshotImageSrc from "../images/hero-screenshot-2.png";

const HighlightedText = tw.span`text-primary-500`;
const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;

export const Landing = () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <Features
        heading={
          <>
            Amazing <HighlightedText>Features</HighlightedText>
          </>
        }
      />
      <FeatureWithSteps
        subheading={<Subheading>STEPS</Subheading>}
        heading={
          <>
            Easy to <HighlightedText>Print Now.</HighlightedText>
          </>
        }
        textOnLeft={false}
        imageSrc={macHeroScreenshotImageSrc}
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
      />
      <MainFeature
        heading={
          <>
            Pog-Print built by and for{" "}
            <HighlightedText>Professionals</HighlightedText>
          </>
        }
      />
      <Pricing
        heading={
          <>
            Flexible <HighlightedText>Printing Plans</HighlightedText>
          </>
        }
      />
      <FAQ
        heading={
          <>
            Any <HighlightedText>Questions ?</HighlightedText>
          </>
        }
      />
      <GetStarted />
      <Footer />
    </AnimationRevealPage>
  );
};

export default Landing;
