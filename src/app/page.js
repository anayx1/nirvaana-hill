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
import { getOrFetchInstagramPosts } from "@/lib/instagram";

export const metadata = {
  title: "Nirvaana Hills | 200-Acre Managed Farmland Community Near Delhi & Gurgaon",
  description:
    "Experience natural serenity and long-term ownership nestled in the Aravallis. Premium managed farmland plots 2 hours from Delhi and Gurgaon with 100% clear title.",
  alternates: {
    canonical: "https://www.nirvaanahills.com",
  },
  openGraph: {
    title: "Nirvaana Hills | 200-Acre Managed Farmland Community Near Delhi & Gurgaon",
    description:
      "Experience natural serenity and long-term ownership nestled in the Aravallis. Premium managed farmland plots 2 hours from Delhi and Gurgaon with 100% clear title.",
    url: "https://www.nirvaanahills.com",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Nirvaana Hills Managed Farmlands",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvaana Hills | 200-Acre Managed Farmland Community",
    description:
      "Experience natural serenity and long-term ownership nestled in the Aravallis. Premium managed farmland plots 2 hours from Delhi and Gurgaon.",
    images: ["/nirvaana-hills/hero.webp"],
  },
};

export default async function Page() {
  const instagramPosts = await getOrFetchInstagramPosts();

  return (
    <>
      <MarqueeBanner />
      <HeroSection />
      <IntroductionSection />
      <TrustScaleSection />
      <ExperiencesSection />
      <WalkthroughSection buttonUrl="https://www.youtube.com/watch?v=HwMWaD_C-As" />
      <ForestDividendSection />
      <LocationSection />
      <LifestylePillarsSection />
      <LifeDesignedSection />
      <TestimonialsSection />
      <FaqSection />
      <SocialHubSection initialPosts={instagramPosts} />
    </>
  );
}