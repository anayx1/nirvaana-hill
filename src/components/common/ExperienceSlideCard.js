"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Reusable Experience Slide Card with Internal Carousel
 * @param {Object} props
 * @param {Object} props.slide - Slide data containing items array and optional theme/initialIndex
 * @param {Array} props.slide.items - Array of items: { id, title, category (or description), image, number }
 * @param {string} [props.slide.theme] - Theme name for accessibility labels
 * @param {number} [props.slide.initialIndex] - Starting item index
 * @param {string} [props.aspectRatio] - Custom aspect ratio class (defaults to "aspect-[4/3.2] sm:aspect-[4/3]")
 * @param {boolean} [props.priority] - Whether first image should have priority loading
 */
export default function ExperienceSlideCard({
  slide,
  aspectRatio = "aspect-[4/2.9] md:aspect-[4/3]",
  priority = false,
}) {
  const items = slide?.items || [];
  const [currentIndex, setCurrentIndex] = useState(slide?.initialIndex ?? 0);
  const total = items.length;

  if (total === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const currentItem = items[currentIndex] || items[0];
  const subtitle = currentItem.category || currentItem.description || "";

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl md:rounded-3xl overflow-hidden shadow-sm isolate group bg-[#1F2518] select-none`}
    >
      {/* Background Image Carousel with Cross-fade */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentItem.id || currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentItem.image}
            alt={currentItem.title || "Feature"}
            fill
            unoptimized
            priority={priority && currentIndex === 0}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Natural Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#182310]/85 via-transparent to-transparent pointer-events-none" />

      {/* Navigation Arrows (rendered if more than 1 item) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label={`Previous ${slide.theme || "item"}`}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 active:scale-90"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={`Next ${slide.theme || "item"}`}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 active:scale-90"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </>
      )}

      {/* Card Content (Shifted Upward from Bottom) */}
      <div className="absolute bottom-6 md:bottom-7 left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 z-10 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id || currentIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-serif !font-normal text-white text-[17px] sm:text-[19px] md:text-[21px] lg:text-[23px] leading-tight mb-1">
              {currentItem.title}
            </h3>
            {subtitle && (
              <p className="font-sans text-[11.5px] sm:text-[12.5px] md:text-[13px] text-white/90 font-normal">
                {subtitle}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
