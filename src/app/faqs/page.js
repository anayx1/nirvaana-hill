import React from "react";
import FaqHeroSection from "@/components/faqs/FaqHeroSection";
import FaqListSection from "@/components/faqs/FaqListSection";
import FaqClarifySection from "@/components/faqs/FaqClarifySection";

export const metadata = {
  title: "FAQs | Nirvaana Hills - Frequently Asked Questions",
  description:
    "Explore everything you need to know about farmland ownership, location, legal framework, Phase 2 master plan, and lifestyle at Nirvaana Hills.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <FaqHeroSection />
      <FaqListSection />
      <FaqClarifySection />
    </main>
  );
}