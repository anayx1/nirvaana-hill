import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { getBlogByIdOrSlug, getAdjacentBlogs } from "@/lib/db";
import SubscribeNewsletterSection from "@/components/blogs/SubscribeNewsletterSection";

function formatDate(dateStr) {
  if (!dateStr) return "August 03, 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogByIdOrSlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Nirvaana Hills",
    };
  }

  return {
    title: blog.metaTitle || `${blog.title} | Nirvaana Hills`,
    description: blog.metaDescription || blog.excerpt || blog.title,
    keywords: blog.metaKeywords || "",
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogByIdOrSlug(slug);

  if (!blog || (blog.status !== "PUBLISHED" && process.env.NODE_ENV === "production")) {
    notFound();
  }

  const { prev, next } = getAdjacentBlogs(blog.publishedAt || blog.createdAt, blog.id);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#1F2922] min-h-screen">
      
      {/* Top Header / Breadcrumb Bar */}
      <div className="border-b border-[#E5E8D8] bg-[#F4F6EC]/60">
        <div className="container max-w-[900px] px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#5C6051] hover:text-[#1F2922] text-[13.5px] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </Link>

          <span className="inline-block bg-[#AFEB63] text-[#1F2922] font-semibold text-[11.5px] uppercase tracking-wider px-3 py-1 rounded-full">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="container max-w-[860px] px-4 sm:px-6 py-10 sm:py-14 md:py-18 space-y-8 sm:space-y-10">
        
        {/* Article Header */}
        <div className="space-y-4 sm:space-y-6">
          <h1 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[36px] sm:text-[44px] md:text-[50px] leading-[1.16] tracking-[-0.015em]">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-[#5C6051] text-[17px] sm:text-[19px] md:text-[20px] leading-relaxed font-sans">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 pb-6 border-b border-[#E5E8D8] text-[#5C6051] text-[13.5px] sm:text-[14.5px] font-sans">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#5C6051]" />
              <span className="font-medium text-[#1F2922]">{blog.author || "Nirvaana Hills Team"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5C6051]" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#5C6051]" />
              <span>{blog.readDuration || "5 mins read"}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md bg-[#2A3426] border border-[#E5E8D8]">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div
          className="blog-article-content text-[#383C30] font-sans leading-[1.7] text-[16px] sm:text-[17px] pt-2
            [&_h2]:font-serif [&_h2]:!font-normal [&_h2]:text-[24px] [&_h2]:sm:text-[28px] [&_h2]:text-[#1F2922] [&_h2]:mt-6 [&_h2]:mb-2
            [&_h3]:font-serif [&_h3]:!font-normal [&_h3]:text-[20px] [&_h3]:sm:text-[24px] [&_h3]:text-[#1F2922] [&_h3]:mt-5 [&_h3]:mb-2
            [&_p]:!text-[16px] [&_p]:sm:!text-[17px] [&_p]:!mb-2.5 [&_p]:!leading-[1.7]
            [&_div]:!text-[16px] [&_div]:sm:!text-[17px] [&_div]:!leading-[1.7]
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1 [&_ul]:text-[#383C30]
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1 [&_ol]:text-[#383C30]
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#AFEB63] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#1F2922] [&_blockquote]:my-4
            [&_a]:text-[#B3482B] [&_a]:underline [&_a]:font-medium hover:[&_a]:text-[#8d3720]
            [&_img]:rounded-2xl [&_img]:my-4 [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />

        {/* Article Navigation (Next / Prev Articles) */}
        <div className="pt-10 border-t border-[#E5E8D8] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/blogs/${prev.slug}`}
              className="p-5 rounded-2xl bg-[#F3F5ED] hover:bg-[#EBEEDD] border border-[#E5E8D8] transition-all group flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider">
                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Previous Article</span>
              </div>
              <span className="font-serif text-[16.5px] text-[#1F2922] group-hover:text-[#B3482B] line-clamp-2 transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/blogs/${next.slug}`}
              className="p-5 rounded-2xl bg-[#F3F5ED] hover:bg-[#EBEEDD] border border-[#E5E8D8] transition-all group flex flex-col justify-between space-y-2 text-right sm:items-end"
            >
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#5C6051] uppercase tracking-wider">
                <span>Next Article</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="font-serif text-[16.5px] text-[#1F2922] group-hover:text-[#B3482B] line-clamp-2 transition-colors">
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>

      </article>

      {/* Newsletter Subscription Footer */}
      <SubscribeNewsletterSection />

    </div>
  );
}
