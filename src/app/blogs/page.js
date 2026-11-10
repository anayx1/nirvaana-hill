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
  alternates: {
    canonical: "https://www.nirvaanahills.com/blogs",
  },
  openGraph: {
    title: "Blogs & Insights | Nirvaana Hills",
    description:
      "Explore. Understand. Decide Better. Thoughtful reads around living, ownership & nature at Nirvaana Hills.",
    url: "https://www.nirvaanahills.com/blogs",
    siteName: "Nirvaana Hills",
    images: [
      {
        url: "/nirvaana-hills/hero.webp",
        width: 1200,
        height: 630,
        alt: "Nirvaana Hills Editorial & Blogs",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs & Insights | Nirvaana Hills",
    description:
      "Explore. Understand. Decide Better. Thoughtful reads around living, ownership & nature at Nirvaana Hills.",
    images: ["/nirvaana-hills/hero.webp"],
  },
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
