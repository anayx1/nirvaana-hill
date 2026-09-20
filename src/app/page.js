import React from "react";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import TrustScaleSection from "@/components/sections/TrustScaleSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import WalkthroughSection from "@/components/sections/WalkthroughSection";
import ForestDividendSection from "@/components/sections/ForestDividendSection";
import LocationSection from "@/components/sections/LocationSection";
import LifestylePillarsSection from "@/components/sections/LifestylePillarsSection";
import LifeDesignedSection from "@/components/sections/LifeDesignedSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import SocialHubSection from "@/components/sections/SocialHubSection";

export default function Page() {
  return (
    <>
      <MarqueeBanner />
      <HeroSection />
      <IntroductionSection />
      <TrustScaleSection />
      <ExperiencesSection />
      <WalkthroughSection />
      <ForestDividendSection />
      <LocationSection />
      <LifestylePillarsSection />
      <LifeDesignedSection />
      <TestimonialsSection />
      <FaqSection />
      <SocialHubSection />
    </>
  );
}