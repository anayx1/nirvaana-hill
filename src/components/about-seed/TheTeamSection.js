"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

export const TEAM_IMAGES = [
  {
    id: "team-1",
    src: "/about-seed/team-photo.webp",
    alt: "Nirvaana Hills & SEAD Realty Core Team",
  },
  {
    id: "team-2",
    src: "/about-seed/team-photo-2.webp",
    alt: "Nirvaana Hills On-Ground Planning & Execution Team",
  },
  {
    id: "team-3",
    src: "/about-seed/team-photo-3.webp",
    alt: "Nirvaana Hills Team Collaborative Moments",
  },
  {
    id: "team-4",
    src: "/about-seed/team-photo-4.webp",
    alt: "Nirvaana Hills Project Development Team",
  },
];

export default function TheTeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEAM_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TEAM_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="the-team"
      className="w-full bg-[#62735B] py-14 sm:py-18 md:py-22 lg:py-26 xl:py-30 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Details                       */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-white/95">
              <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
                THE PEOPLE BEHIND THE VISION
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-white text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
              Great Communities Are Built By
              <br />
              People.
            </h2>

            {/* Narrative Paragraphs */}
            <div className="flex flex-col space-y-4 text-white/90 font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal max-w-xl">
              <p>
                Behind Nirvaana Hills is a team of planners, partners, advisors,
                and on-ground experts working together every day - from
                infrastructure planning to supporting families through their
                journey.
              </p>
              <p>
                Because meaningful places are never created alone. They are built
                by people who genuinely believe in what they are creating.
              </p>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Team Image Carousel                      */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full aspect-[4/3.2] sm:aspect-[16/11] lg:aspect-[4/3.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10 group">
              {/* Carousel Image with Smooth Fade/Slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={TEAM_IMAGES[currentIndex].id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={TEAM_IMAGES[currentIndex].src}
                    alt={TEAM_IMAGES[currentIndex].alt}
                    fill
                    unoptimized
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Team Photo"
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 z-10 shadow-lg cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Team Photo"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-xs flex items-center justify-center transition-all active:scale-90 z-10 shadow-lg cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full">
                {TEAM_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentIndex === idx
                        ? "w-5 h-1.5 bg-primary"
                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
