import React from "react";
import CareerHeroSection from "@/components/career/CareerHeroSection";
import WhyJoinUsSection from "@/components/career/WhyJoinUsSection";

export const metadata = {
  title: "Careers at SEAD Realty | Join Our Growing Team",
  description:
    "Explore career opportunities at SEAD Realty. Build your career with a team of passionate, driven, and innovative real estate professionals.",
  alternates: {
    canonical: "https://www.nirvaanahills.com/career",
  },
  openGraph: {
    title: "Careers at SEAD Realty | Join Our Growing Team",
    description:
      "Explore exciting careers in nature-first real estate, architecture, sustainable operations, and community building at SEAD Realty.",
    url: "https://www.nirvaanahills.com/career",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Careers at SEAD Realty",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at SEAD Realty | Join Our Growing Team",
    description:
      "Explore career opportunities at SEAD Realty. Build your career with visionary real estate leaders.",
    images: ["/nirvaana-hills/hero.webp"],
  },
};

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <CareerHeroSection />
      <WhyJoinUsSection />
    </main>
  );
}
