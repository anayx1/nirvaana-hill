import React from "react";
import LegalHeroSection from "@/components/legal/LegalHeroSection";
import LegalContentSection from "@/components/legal/LegalContentSection";

export const metadata = {
  title: "Legal Information & Transparency | Nirvaana Hills",
  description:
    "Essential legal information, privacy policy, terms & conditions, disclaimer, refund policy, and statutory disclosures for Nirvaana Hills.",
  alternates: {
    canonical: "https://www.nirvaanahills.com/legal",
  },
  openGraph: {
    title: "Legal Information & Transparency | Nirvaana Hills",
    description:
      "Essential legal information, privacy policy, terms & conditions, disclaimer, refund policy, and statutory disclosures for Nirvaana Hills.",
    url: "https://www.nirvaanahills.com/legal",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Nirvaana Hills Legal Transparency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Information & Transparency | Nirvaana Hills",
    description:
      "Essential legal information, terms, privacy, and compliance disclosures for Nirvaana Hills.",
    images: ["/nirvaana-hills/hero.webp"],
  },
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <LegalHeroSection />
      <LegalContentSection />
    </main>
  );
}