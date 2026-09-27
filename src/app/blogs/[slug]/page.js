import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
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

      {/* Main Article Container */}
      <article className="container max-w-[860px] px-4 sm:px-6 py-8 sm:py-12 md:py-14 space-y-8 sm:space-y-10">

        {/* Go back Link */}
        <div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-[#B3482B] hover:text-[#8D3720] text-[12px] md:text-[16px] font-normal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go back</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
              {blog.category || "LIFESTYLE"}
            </span>
          </div>

          <h1 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.16] tracking-[-0.015em] max-w-[800px]">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-[#5C6051] text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed font-sans max-w-[720px] font-normal">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Information Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 pb-6 text-[#5C6051] text-[11px] md:text-[12px] font-sans w-full">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#5C6051]" />
              <span className="font-normal text-[#1F2922]">{blog.author || "Nirvaana Hills Team"}</span>
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
          className="blog-article-content text-[#383C30] font-sans leading-[1.7] text-[13px] sm:text-[14.5px] md:text-[15.5px] pt-2
            [&_h2]:font-serif [&_h2]:!font-normal [&_h2]:text-[20px] [&_h2]:sm:text-[24px] [&_h2]:text-[#1F2922] [&_h2]:mt-6 [&_h2]:mb-2
            [&_h3]:font-serif [&_h3]:!font-normal [&_h3]:text-[18px] [&_h3]:sm:text-[20px] [&_h3]:text-[#1F2922] [&_h3]:mt-5 [&_h3]:mb-2
            [&_p]:!text-[13px] [&_p]:sm:!text-[14.5px] [&_p]:md:!text-[15.5px] [&_p]:!mb-2.5 [&_p]:!leading-[1.7]
            [&_div]:!text-[13px] [&_div]:sm:!text-[14.5px] [&_div]:md:!text-[15.5px] [&_div]:!leading-[1.7]
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ul]:space-y-1 [&_ul]:text-[#383C30]
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_ol]:space-y-1 [&_ol]:text-[#383C30]
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#AFEB63] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#1F2922] [&_blockquote]:my-4
            [&_a]:text-[#B3482B] [&_a]:underline [&_a]:font-normal hover:[&_a]:text-[#8d3720]
            [&_img]:rounded-2xl [&_img]:my-4 [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />

        {/* Article Navigation (Simple Minimal Next / Prev CTA) */}
        <div className="pt-10 border-t border-[#E5E8D8] flex items-center justify-between">
          {prev ? (
            <Link
              href={`/blogs/${prev.slug}`}
              className="group inline-flex flex-col items-start transition-opacity hover:opacity-85"
            >
              <span className="font-serif italic text-[28px] sm:text-[34px] text-[#1F2922] group-hover:text-[#B3482B] transition-colors leading-none">
                Previous
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-8 h-[2px] rounded-full bg-[#AFEB63]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#AFEB63]" />
              </div>
            </Link>
          ) : <div />}

          <Link
            href={next ? `/blogs/${next.slug}` : "/blogs"}
            className="group inline-flex flex-col items-end text-right transition-opacity hover:opacity-85 ml-auto"
          >
            <span className="font-serif italic text-[28px] sm:text-[34px] text-[#1F2922] group-hover:text-[#B3482B] transition-colors leading-none">
              Next
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#AFEB63]" />
              <span className="w-8 h-[2px] rounded-full bg-[#AFEB63]" />
            </div>
          </Link>
        </div>

      </article>

      {/* Newsletter Subscription Footer */}
      <SubscribeNewsletterSection />

    </div>
  );
}
