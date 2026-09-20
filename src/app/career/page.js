import React from "react";
import CareerHeroSection from "@/components/career/CareerHeroSection";
import WhyJoinUsSection from "@/components/career/WhyJoinUsSection";

export const metadata = {
  title: "Careers at SEAD Realty | Join Our Growing Team",
  description:
    "Explore career opportunities at SEAD Realty. Build your career with a team of passionate, driven, and innovative real estate professionals.",
};

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <CareerHeroSection />
      <WhyJoinUsSection />
    </main>
  );
}
