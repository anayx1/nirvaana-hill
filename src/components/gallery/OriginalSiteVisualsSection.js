"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export default function OriginalSiteVisualsSection({
  initialItems = [],
  initialCategories = [],
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize items to ensure 'src' is populated from DB 'image' or 'src'
  const allItems = (initialItems || []).map((item) => ({
    ...item,
    src: item.image || item.src,
  }));

  const categories =
    initialCategories && initialCategories.length > 0
      ? initialCategories
      : [{ id: "all", label: "All", slug: "all", name: "All" }];

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  const totalItems = filteredItems.length;
  const currentItem = totalItems > 0 ? filteredItems[currentIndex % totalItems] : null;

  const handleNext = () => {
    if (totalItems > 1) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  };

  const handlePrev = () => {
    if (totalItems > 1) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  };

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentIndex(0);
  };

  return (
    <section
      id="original-site-visuals"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922] scroll-mt-12"
    >
      <div id="gallery-grid" className="container max-w-[900px] px-4 sm:px-6 flex flex-col items-center text-center">
        
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
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              ORIGINAL SITE VISUALS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em]">
            Walk The Land Before You Set Foot On It.
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal pt-1"
          >
            The land exactly as it exists - real footage, hill views, forest zones, and sunrise moments, captured directly from the ground.
          </p>

          {/* Italic Tagline */}
          <p
            style={{ color: "#5C6051" }}
            className="font-serif italic text-[13.5px] sm:text-[15px] font-normal"
          >
            No filters, no staged photography. Only reality.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* STICKY CATEGORY FILTER TABS BAR                        */}
        {/* ====================================================== */}
        <div className="sticky top-[56px] lg:top-[64px] z-30 w-full bg-[#FAF9F5]/95 backdrop-blur-md py-3.5 sm:py-4 mb-6 sm:mb-8 border-b border-[#E5E8D8]/60 transition-all">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 sm:gap-x-7 text-[12.5px] sm:text-[14px] font-sans">
            {categories.map((cat) => {
              const catKey = cat.slug || cat.id;
              const catLabel = cat.name || cat.label;
              const isActive = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => handleCategoryChange(catKey)}
                  className={`relative pb-1.5 transition-colors cursor-pointer select-none ${
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
            {currentItem ? (
              <motion.div
                key={currentItem.id || `${activeCategory}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt || currentItem.title || "Nirvaana Hills Site Visual"}
                  fill
                  sizes="(max-width: 768px) 100vw, 620px"
                  className="object-cover object-center w-full h-full"
                  style={{ objectFit: "cover" }}
                  priority
                  unoptimized
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white/80 bg-[#2A3426]">
                <p className="font-serif text-[18px] sm:text-[20px] text-[#FAF9F5]">
                  No visuals uploaded for this category yet.
                </p>
                <p className="font-sans text-[13px] sm:text-[14px] text-white/70 mt-1">
                  Upload images from the admin panel to display here.
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* Navigation Arrows - shown only when multiple images exist */}
          {totalItems > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-xs transition-all active:scale-90 cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
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
            href="/contact-us"
            className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
          >
            Discover Nirvaana
          </a>
        </motion.div>

      </div>
    </section>
  );
}
