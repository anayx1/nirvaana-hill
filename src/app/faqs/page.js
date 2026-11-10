import React from "react";
import FaqHeroSection from "@/components/faqs/FaqHeroSection";
import FaqListSection from "@/components/faqs/FaqListSection";
import FaqClarifySection from "@/components/faqs/FaqClarifySection";

export const metadata = {
  title: "FAQs | Nirvaana Hills - Frequently Asked Questions",
  description:
    "Explore everything you need to know about farmland ownership, location, legal framework, Phase 2 master plan, and lifestyle at Nirvaana Hills.",
  alternates: {
    canonical: "https://www.nirvaanahills.com/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions | Nirvaana Hills",
    description:
      "Clear answers on ownership registry, registry process, agricultural land laws, location connectivity, maintenance, and water availability at Nirvaana Hills.",
    url: "https://www.nirvaanahills.com/faqs",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Nirvaana Hills FAQs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Nirvaana Hills - Farmland Ownership & Living",
    description:
      "Clear answers on land registry, location connectivity, maintenance, and lifestyle at Nirvaana Hills.",
    images: ["/nirvaana-hills/hero.webp"],
  },
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