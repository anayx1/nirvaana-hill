import React from "react";
import GalleryHeroSection from "@/components/gallery/GalleryHeroSection";
import DroneExperienceSection from "@/components/gallery/DroneExperienceSection";
import WalkthroughSection from "@/components/sections/WalkthroughSection";
import OriginalSiteVisualsSection from "@/components/gallery/OriginalSiteVisualsSection";
import DevelopmentProgressSection from "@/components/gallery/DevelopmentProgressSection";
import LifeAtNirvaanaSection from "@/components/gallery/LifeAtNirvaanaSection";
import StillHaveQuestionsSection from "@/components/nirvaana-hills/StillHaveQuestionsSection";

import { getGalleryImages, getCategories } from "@/lib/db";

export const metadata = {
  title: "Gallery & Life at Nirvaana | Nirvaana Hills",
  description:
    "Explore original site visuals, development progress, natural landscape, and living community moments at Nirvaana Hills.",
};

export default function GalleryPage() {
  const galleryItems = getGalleryImages();
  const rawCategories = getCategories("gallery");

  // Include "All" tab in categories list
  const galleryCategories = [
    { id: "all", label: "All", slug: "all", name: "All" },
    ...rawCategories.map((c) => ({
      id: c.slug,
      label: c.name,
      slug: c.slug,
      name: c.name,
    })),
  ];

  return (
    <>
      <GalleryHeroSection />
      <DroneExperienceSection />
      <WalkthroughSection />
      <OriginalSiteVisualsSection
        initialItems={galleryItems}
        initialCategories={galleryCategories}
      />
      <DevelopmentProgressSection />
      <LifeAtNirvaanaSection />
      <StillHaveQuestionsSection />
    </>
  );
}
