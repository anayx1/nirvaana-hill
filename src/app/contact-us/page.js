import React from "react";
import ContactUsHeroSection from "@/components/contact-us/ContactUsHeroSection";
import ContactFormTabsSection from "@/components/contact-us/ContactFormTabsSection";
import InstantConnectSection from "@/components/contact-us/InstantConnectSection";
import VisitNirvaanaSection from "@/components/contact-us/VisitNirvaanaSection";

export const metadata = {
  title: "Contact Us & Book A Site Visit | Nirvaana Hills",
  description:
    "Let's Start The Conversation. Have a question about Nirvaana Hills? Want to see the land, understand ownership, or explore Phase 2? We're here to help.",
  alternates: {
    canonical: "https://www.nirvaanahills.com/contact-us",
  },
  openGraph: {
    title: "Contact Us & Book A Site Visit | Nirvaana Hills",
    description:
      "Have a question about Nirvaana Hills? Book an exclusive private site visit and explore 200 acres of managed farmland in the Aravallis.",
    url: "https://www.nirvaanahills.com/contact-us",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Contact Nirvaana Hills",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us & Book A Site Visit | Nirvaana Hills",
    description:
      "Schedule your curated site visit to Nirvaana Hills. Experience the serenity in the foothills of the Aravallis.",
    images: ["/nirvaana-hills/hero.webp"],
  },
};

export default function ContactUsPage() {
  return (
    <>
      <ContactUsHeroSection />
      <ContactFormTabsSection />
      <InstantConnectSection />
      <VisitNirvaanaSection />
    </>
  );
}
