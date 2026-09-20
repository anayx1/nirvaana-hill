import React from "react";
import ContactUsHeroSection from "@/components/contact-us/ContactUsHeroSection";
import ContactFormTabsSection from "@/components/contact-us/ContactFormTabsSection";
import InstantConnectSection from "@/components/contact-us/InstantConnectSection";
import VisitNirvaanaSection from "@/components/contact-us/VisitNirvaanaSection";

export const metadata = {
  title: "Contact Us & Book A Site Visit | Nirvaana Hills",
  description:
    "Let's Start The Conversation. Have a question about Nirvaana Hills? Want to see the land, understand ownership, or explore Phase 2? We're here to help.",
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
