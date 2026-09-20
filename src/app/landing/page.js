import React from "react";
import LandingHeroSection from "@/components/landing/LandingHeroSection";
import InvestInNatureSection from "@/components/landing/InvestInNatureSection";
import LandingPricingSection from "@/components/landing/LandingPricingSection";
import ForestLivingAmenitiesSection from "@/components/landing/ForestLivingAmenitiesSection";

export const metadata = {
  title: "Real Estate ka FD i.e. Forest Dividend | Nirvaana Hills",
  description:
    "Where the Aravallis Become Your Address. Own your piece of nature in the heart of the Aravallis with Nirvaana Hills Phase 2 limited farmlands.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <LandingHeroSection />
      <InvestInNatureSection />
      <LandingPricingSection />
      <ForestLivingAmenitiesSection />
    </main>
  );
}
