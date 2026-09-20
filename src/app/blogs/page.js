import React from "react";
import BlogsHeroSection from "@/components/blogs/BlogsHeroSection";
import JournalAndBlogsIntroSection from "@/components/blogs/JournalAndBlogsIntroSection";
import SocialMediaHubSection from "@/components/blogs/SocialMediaHubSection";
import SubscribeNewsletterSection from "@/components/blogs/SubscribeNewsletterSection";

export const metadata = {
  title: "Blogs & Insights | Nirvaana Hills",
  description:
    "Explore. Understand. Decide Better. Thoughtful reads around living, ownership & nature at Nirvaana Hills.",
};

export default function BlogsPage() {
  return (
    <>
      <BlogsHeroSection />
      <JournalAndBlogsIntroSection />
      <SocialMediaHubSection />
      <SubscribeNewsletterSection />
    </>
  );
}
