"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

// Format date into "August 03, 2026"
function formatDate(dateStr) {
  if (!dateStr) return "August 03, 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Convert "LIFESTYLE" or "development-updates" to "Lifestyle" or "Development Updates"
function formatCategoryName(name) {
  if (!name) return "Lifestyle";
  return name
    .replace(/[-_]/g, " ")
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function JournalAndBlogsIntroSection({
  initialBlogs = [],
  initialCategories = [],
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(10);

  // Normalize categories from DB (deduplicate and filter out empty)
  const categoriesList = [
    { id: "all", slug: "all", label: "All" },
    ...initialCategories.map((c) => ({
      id: c.id || c.slug,
      slug: (c.slug || c.name || "").toLowerCase().trim(),
      name: c.name,
      label: formatCategoryName(c.name || c.slug),
    })),
  ];

  // Filter blogs based on activeCategory
  const filteredBlogs = initialBlogs.filter((blog) => {
    if (activeCategory === "all") return true;

    const blogCatName = (blog.category || "").toLowerCase().trim().replace(/[-_]/g, " ");
    const selectedCat = categoriesList.find((c) => c.slug === activeCategory);
    const targetSlug = (selectedCat?.slug || activeCategory).replace(/[-_]/g, " ");
    const targetName = (selectedCat?.name || "").toLowerCase().trim().replace(/[-_]/g, " ");

    return blogCatName === targetSlug || blogCatName === targetName;
  });

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    setVisibleCount(10);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <section
      id="articles"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6 space-y-10 sm:space-y-12 md:space-y-14">
        
        {/* ====================================================== */}
        {/* SECTION HEADER / INTRO                                 */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6 max-w-3xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
              JOURNAL AND BLOGS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.18] tracking-[-0.01em]">
            Thoughtful Reads Around Living, Ownership &amp; Nature.
          </h2>

          {/* Subheading Lead Line */}
          <p className="font-sans font-medium text-[#1F2922] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.5]">
            Read. Reflect. Reconsider what &ldquo;home&rdquo; really means.
          </p>

          {/* Body Narrative */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.68] font-normal"
          >
            At Nirvaana Hills, we believe buying farmland is never simply a
            transaction - it&apos;s often a shift in how people think about life
            itself. This is where we unpack that shift, through writing on
            nature-led living, land ownership, family wellbeing, slower living,
            investment philosophy, and the deeper thinking behind Nirvaana
            Hills. Only ideas worth spending time with.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* CATEGORY TABS                                          */}
        {/* ====================================================== */}
        <div className="border-b border-[#E5E8D8] pb-1">
          <div className="flex flex-nowrap md:justify-center items-center gap-6 sm:gap-8 md:gap-10 overflow-x-auto no-scrollbar scroll-smooth">
            {categoriesList.map((category) => {
              const isActive = activeCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`relative whitespace-nowrap pb-3 text-[12px] md:text-[16px] transition-all cursor-pointer ${
                    isActive
                      ? "text-[#1F2922] font-medium"
                      : "text-[#8C9280] hover:text-[#1F2922] font-normal"
                  }`}
                >
                  <span>{category.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#AFEB63] rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ====================================================== */}
        {/* BLOGS GRID: 3 CARDS PER ROW IN DESKTOP                 */}
        {/* ====================================================== */}
        <div>
          <AnimatePresence mode="popLayout">
            {visibleBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
                {visibleBlogs.map((blog, idx) => (
                  <motion.div
                    key={blog.id || blog.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="group flex flex-col h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#EBEEDD] border border-[#DDE2CD] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-xs"
                    >
                      {/* Featured Image */}
                      {blog.featuredImage ? (
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#2A3426] shrink-0">
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full aspect-[16/10] bg-[#62735B] flex items-center justify-center p-6 text-center shrink-0">
                          <span className="font-serif text-white/90 text-[18px] sm:text-[20px] line-clamp-2">
                            {blog.title}
                          </span>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 lg:p-7 space-y-4">
                        <div className="space-y-3">
                          {/* Category Pill */}
                          <div>
                            <span className="inline-block bg-[#AFEB63] text-[#1F2922] font-medium text-[11px] md:text-[12px] px-3 py-1 rounded-full capitalize shadow-2xs">
                              {formatCategoryName(blog.category)}
                            </span>
                          </div>

                          {/* Article Title */}
                          <h3 className="font-serif !font-normal text-[#1F2922] text-[18px] sm:text-[20px] md:text-[21px] leading-[1.26] tracking-[-0.01em] group-hover:text-[#B3482B] transition-colors line-clamp-3">
                            {blog.title}
                          </h3>
                        </div>

                        {/* Meta Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#DDE2CD]/80 text-[#5C6051] text-[11px] md:text-[12px] font-sans mt-auto">
                          {/* Date */}
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#5C6051]" />
                            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                          </div>

                          {/* Read Duration */}
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#5C6051]" />
                            <span>{blog.readDuration || "5 mins read"}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center bg-[#EBEEDD]/50 border border-dashed border-[#D2D8C0] rounded-3xl p-8"
              >
                <p className="text-[#5C6051] text-[14px] sm:text-[15px] font-normal">
                  No articles found in this category yet.
                </p>
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className="mt-4 inline-flex items-center gap-1.5 text-[12px] md:text-[16px] font-normal text-[#1F2922] bg-[#AFEB63] px-5 py-2.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] transition-colors cursor-pointer"
                >
                  View All Articles
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====================================================== */}
        {/* LOAD MORE BUTTON (PAGINATION: 10 BLOGS AT A TIME)      */}
        {/* ====================================================== */}
        {visibleCount < filteredBlogs.length && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-4 sm:pt-6"
          >
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] bg-[#AFEB63] hover:bg-[#9de04e] text-[#1F2922] font-normal text-[12px] md:text-[16px] transition-all shadow-sm hover:shadow-md active:scale-97 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Load More Articles</span>
              <span className="text-[11px] md:text-[13px] font-mono text-[#1F2922]/70">
                ({filteredBlogs.length - visibleCount} remaining)
              </span>
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
