import React from "react";
import LocationHeroRadarSection from "@/components/locations/LocationHeroRadarSection";
import LocationOverviewMapSection from "@/components/locations/LocationOverviewMapSection";
import LocationDistanceTableSection from "@/components/locations/LocationDistanceTableSection";
import LocationConnectivityTabsSection from "@/components/locations/LocationConnectivityTabsSection";
import WhyLocationMattersSection from "@/components/locations/WhyLocationMattersSection";
import ExperienceTheJourneySection from "@/components/locations/ExperienceTheJourneySection";
import WhyDistanceChangesSection from "@/components/locations/WhyDistanceChangesSection";
import WeekendTestSection from "@/components/locations/WeekendTestSection";

export const metadata = {
  title: "Location & Connectivity | Nirvaana Hills",
  description:
    "Nestled in the Aravalli foothills near Mahendragarh, Nirvaana Hills is just 2 hours from Delhi & Gurgaon, surrounded by 9,600 acres of reserved forest.",
};

export default function LocationsPage() {
  return (
    <>
      <LocationHeroRadarSection />
      <LocationOverviewMapSection />
      <LocationDistanceTableSection />
      <LocationConnectivityTabsSection />
      <WhyLocationMattersSection />
      <ExperienceTheJourneySection />
      <WhyDistanceChangesSection />
      <WeekendTestSection />
    </>
  );
}
