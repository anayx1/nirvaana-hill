import React from "react";
import LandingHeroSection from "@/components/landing/LandingHeroSection";
import InvestInNatureSection from "@/components/landing/InvestInNatureSection";
import LandingPricingSection from "@/components/landing/LandingPricingSection";
import ForestLivingAmenitiesSection from "@/components/landing/ForestLivingAmenitiesSection";

export const metadata = {
  title: "Real Estate ka FD i.e. Forest Dividend | Nirvaana Hills",
  description:
    "Where the Aravallis Become Your Address. Own your piece of nature in the heart of the Aravallis with Nirvaana Hills Phase 2 limited farmlands.",
  alternates: {
    canonical: "https://www.nirvaanahills.com/landing",
  },
  openGraph: {
    title: "Real Estate ka FD i.e. Forest Dividend | Nirvaana Hills",
    description:
      "Where the Aravallis Become Your Address. Own your piece of nature in the heart of the Aravallis with Nirvaana Hills Phase 2 limited farmlands.",
    url: "https://www.nirvaanahills.com/landing",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Nirvaana Hills Farmland Opportunity",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate ka FD i.e. Forest Dividend | Nirvaana Hills",
    description:
      "Where the Aravallis Become Your Address. Own your piece of nature with Nirvaana Hills Phase 2 limited farmlands.",
    images: ["/nirvaana-hills/hero.webp"],
  },
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
