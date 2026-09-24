import React from "react";
import BlogsHeroSection from "@/components/blogs/BlogsHeroSection";
import JournalAndBlogsIntroSection from "@/components/blogs/JournalAndBlogsIntroSection";
import SocialMediaHubSection from "@/components/blogs/SocialMediaHubSection";
import SubscribeNewsletterSection from "@/components/blogs/SubscribeNewsletterSection";
import { getAllBlogs, getCategories } from "@/lib/db";

export const metadata = {
  title: "Blogs & Insights | Nirvaana Hills",
  description:
    "Explore. Understand. Decide Better. Thoughtful reads around living, ownership & nature at Nirvaana Hills.",
};

export default function BlogsPage() {
  const publishedBlogs = getAllBlogs({ status: "PUBLISHED" });
  const blogCategories = getCategories("blog");

  return (
    <>
      <BlogsHeroSection />
      <JournalAndBlogsIntroSection
        initialBlogs={publishedBlogs}
        initialCategories={blogCategories}
      />
      <SocialMediaHubSection />
      <SubscribeNewsletterSection />
    </>
  );
}
