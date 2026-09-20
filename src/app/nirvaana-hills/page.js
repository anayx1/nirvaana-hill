import React from "react";
import NirvaanaHillsHero from "@/components/nirvaana-hills/NirvaanaHillsHero";
import WhatMakesDifferentSection from "@/components/nirvaana-hills/WhatMakesDifferentSection";
import DesignWithIntentSection from "@/components/nirvaana-hills/DesignWithIntentSection";
import NirvaanaDevanagariBanner from "@/components/nirvaana-hills/NirvaanaDevanagariBanner";
import MeaningOfNirvaanaSection from "@/components/nirvaana-hills/MeaningOfNirvaanaSection";
import NirvaanaMarqueeStrip from "@/components/nirvaana-hills/NirvaanaMarqueeStrip";
import PhasesOfNirvaanaSection from "@/components/nirvaana-hills/PhasesOfNirvaanaSection";
import MasterPlanSection from "@/components/nirvaana-hills/MasterPlanSection";
import PricingMatrixSection from "@/components/nirvaana-hills/PricingMatrixSection";
import StillHaveQuestionsSection from "@/components/nirvaana-hills/StillHaveQuestionsSection";
import RoiDividendInsightSection from "@/components/nirvaana-hills/RoiDividendInsightSection";

export const metadata = {
  title: "About Nirvaana Hills | 200-Acre Nature-Led Community",
  description:
    "Nirvaana Hills is a premium 200-acre farmland community near Delhi & Gurgaon, built around family, wellness, and long-term ownership.",
};

export default function NirvaanaHillsPage() {
  return (
    <>
      <NirvaanaHillsHero />
      <WhatMakesDifferentSection />
      <DesignWithIntentSection />
      <NirvaanaDevanagariBanner />
      <MeaningOfNirvaanaSection />
      <NirvaanaMarqueeStrip />
      <PhasesOfNirvaanaSection />
      <MasterPlanSection />
      <PricingMatrixSection />
      <RoiDividendInsightSection />
      <StillHaveQuestionsSection />
    </>
  );
}







