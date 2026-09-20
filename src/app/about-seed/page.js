import React from "react";
import AboutSeedHeroSection from "@/components/about-seed/AboutSeedHeroSection";
import TheStoryOfSeadSection from "@/components/about-seed/TheStoryOfSeadSection";
import StoryBehindNirvaanaSection from "@/components/about-seed/StoryBehindNirvaanaSection";
import OurVisionSection from "@/components/about-seed/OurVisionSection";
import TheFoundersSection from "@/components/about-seed/TheFoundersSection";
import FounderVisionSection from "@/components/about-seed/FounderVisionSection";
import TheTeamSection from "@/components/about-seed/TheTeamSection";
import MuskaanCareSection from "@/components/about-seed/MuskaanCareSection";
import BeyondEducationSection from "@/components/about-seed/BeyondEducationSection";
import TheImpactWeSeadSection from "@/components/about-seed/TheImpactWeSeadSection";

export const metadata = {
  title: "About SEAD Realty | Nirvaana Hills",
  description:
    "Building More Than Land. Creating A Legacy Rooted In Purpose. At SEAD Realty, our work extends far beyond development.",
};

export default function AboutSeedPage() {
  return (
    <>
      <AboutSeedHeroSection />
      <TheStoryOfSeadSection />
      <StoryBehindNirvaanaSection />
      <OurVisionSection />
      <TheFoundersSection />
      <FounderVisionSection />
      <TheTeamSection />
      <MuskaanCareSection />
      <BeyondEducationSection />
      <TheImpactWeSeadSection />
    </>
  );
}
