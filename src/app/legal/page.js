import React from "react";
import LegalHeroSection from "@/components/legal/LegalHeroSection";
import LegalContentSection from "@/components/legal/LegalContentSection";

export const metadata = {
  title: "Legal Information | Nirvaana Hills - Trust & Compliance",
  description:
    "Essential legal information, privacy policy, terms & conditions, disclaimer, refund policy, and legal disclosures for Nirvaana Hills.",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <LegalHeroSection />
      <LegalContentSection />
    </main>
  );
}