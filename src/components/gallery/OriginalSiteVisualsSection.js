"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ========================================================
// CATEGORIES & INITIAL MOCK DATA (API READY)
// ========================================================
export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "raw-site", label: "Raw Site Images" },
  { id: "landscape", label: "Landscape Views" },
  { id: "aravalli", label: "Aravalli Hills View" },
  { id: "sunrise-sunset", label: "Sunrise & Sunset Moments" },
  { id: "drive-through", label: "Drive Through Experience" },
];

export const INITIAL_GALLERY_ITEMS = [
  {
    id: "visual-1",
    category: "aravalli",
    title: "Aravalli Foothills Panoramic Ground View",
    src: "/locations/hero.avif",
    alt: "Raw site footage of Aravalli hills and natural terrain at Nirvaana Hills",
  },
  {
    id: "visual-2",
    category: "landscape",
    title: "Scenic Aravalli Farmland Landscape",
    src: "/locations/why-distance-changes-everything.avif",
    alt: "Scenic Aravalli green landscape near Mahendragarh",
  },
  {
    id: "visual-3",
    category: "raw-site",
    title: "Community and Mature Tree Canopy",
    src: "/gallery/hero.avif",
    alt: "Real ground moments and natural tree plantation",
  },
  {
    id: "visual-4",
    category: "sunrise-sunset",
    title: "360° Aravalli Mountain Horizon",
    src: "/nirvaana-hills/360-arravali.avif",
    alt: "360 Degree Aravalli mountain views",
  },
];

export default function OriginalSiteVisualsSection({
  initialItems = INITIAL_GALLERY_ITEMS,
  initialCategories = GALLERY_CATEGORIES,
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize items to support both 'image' and 'src' properties
  const allItems = (initialItems && initialItems.length > 0
    ? initialItems
    : INITIAL_GALLERY_ITEMS
  ).map((item) => ({
    ...item,
    src: item.src || item.image,
  }));

  const categories =
    initialCategories && initialCategories.length > 0
      ? initialCategories
      : GALLERY_CATEGORIES;

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  const totalItems = filteredItems.length > 0 ? filteredItems.length : 1;
  const currentItem =
    filteredItems[currentIndex % totalItems] || allItems[0] || INITIAL_GALLERY_ITEMS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentIndex(0);
  };

  return (
    <section
      id="original-site-visuals"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      <div className="container max-w-[900px] px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* ====================================================== */}
        {/* HEADER BLOCK                                           */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-2xl mb-8 sm:mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
              ORIGINAL SITE VISUALS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] leading-[1.15] tracking-[-0.01em]">
            Walk The Land Before You Set Foot On It.
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal pt-1"
          >
            The land exactly as it exists - real footage, hill views, forest zones, and sunrise moments, captured directly from the ground.
          </p>

          {/* Italic Tagline */}
          <p
            style={{ color: "#5C6051" }}
            className="font-serif italic text-[15px] sm:text-[16px] md:text-[17px] font-normal"
          >
            No filters, no staged photography. Only reality.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* CATEGORY FILTER TABS                                   */}
        {/* ====================================================== */}
        <div className="w-full flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7 text-[13.5px] sm:text-[15px] font-sans mb-8 sm:mb-10">
          {categories.map((cat) => {
            const catKey = cat.id || cat.slug;
            const catLabel = cat.label || cat.name;
            const isActive = activeCategory === catKey;
            return (
              <button
                key={catKey}
                type="button"
                onClick={() => handleCategoryChange(catKey)}
                className={`relative pb-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? "text-[#1F2922] font-semibold"
                    : "text-[#5C6051]/60 hover:text-[#1F2922] font-normal"
                }`}
              >
                <span>{catLabel}</span>
                {isActive && (
                  <motion.div
                    layoutId="categoryActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#AFEB63] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ====================================================== */}
        {/* INTERACTIVE CAROUSEL CONTAINER                         */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[620px] aspect-[4/5] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#E5E8D8] relative bg-[#1F241C] select-none"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id || currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full relative"
            >
              <Image
                src={currentItem.src}
                alt={currentItem.alt}
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 cursor-pointer shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* ====================================================== */}
        {/* BOTTOM CTA BUTTON                                      */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <a
            href="#site-visit"
            className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-2xl hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-sm"
          >
            Discover Nirvaana
          </a>
        </motion.div>

      </div>
    </section>
  );
}
