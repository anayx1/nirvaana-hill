"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const PILLARS = [
  {
    id: "nature",
    title: "Nature",
    description: "More trees, open skies and room to breathe.",
  },
  {
    id: "family",
    title: "Family",
    description: "Spaces for meaningful experiences across generations.",
  },
  {
    id: "wellbeing",
    title: "Wellbeing",
    description: "Movement, fresh air, mindful routines, slower mornings.",
  },
  {
    id: "community",
    title: "Community",
    description: "The best experiences become richer when shared.",
  },
  {
    id: "legacy",
    title: "Legacy",
    description: "A place to return to, grow with, and pass forward.",
  },
];

export default function LifestylePillarsSection() {
  const sectionRef = useRef(null);

  // Parallax scroll effect for the background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spring smoothing to completely remove jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.2,
    restDelta: 0.0005,
  });

  // Very slow, subtle, and silky smooth parallax movement
  const bgY = useTransform(smoothProgress, [0, 1], ["-4%", "4%"]);

  const handleDiscoverLifestyle = (e) => {
    e.preventDefault();
    console.log("Discover The Lifestyle clicked");
  };

  return (
    <section
      ref={sectionRef}
      id="forest-crafted-living"
      className="relative w-full py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden select-none"
    >
      {/* ======================================================== */}
      {/* PARALLAX BACKGROUND IMAGE (Ultra-smooth & Low Speed)     */}
      {/* ======================================================== */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-[6%] left-0 right-0 h-[112%] -z-20 pointer-events-none will-change-transform"
      >
        <Image
          src="/homepage/sec8/sec8.webp"
          alt="Nirvaana Hills Forest Living Background"
          fill
          unoptimized
          priority={false}
          className="object-cover grayscale brightness-90 contrast-105"
        />
      </motion.div>

      {/* Dark tint gradient overlay for contrast & readability */}
      <div className="absolute inset-0 bg-black/45 -z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="container max-w-[1200px] px-4 sm:px-6 relative z-10">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14 md:mb-18 max-w-3xl mx-auto text-white"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-white/90 text-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 3l-8 7h16l-8-7z" />
              <path d="M5 14c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
              <path d="M5 19c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
            </svg>
            <span className="font-semibold tracking-[0.12em] uppercase text-[11px] xs:text-[12px] sm:text-[13px] whitespace-nowrap">
              A FOREST CRAFTED FOR LIVING
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white tracking-[-0.01em]">
            A Community Built Around The Things
            <br />
            Modern Life Quietly Took Away.
          </h2>

          {/* Subtitle */}
          <p className="text-white/90 pt-1">
            Five ideas shape every part of Nirvaana Hills:
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* 5 PILLAR CARDS (Stacked on mobile, 2/3-col on desktop)    */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`rounded-2xl sm:rounded-3xl bg-[#FAF9F5]/95 backdrop-blur-xs p-6 sm:p-7 md:p-8 shadow-md border border-white/20 hover:shadow-lg transition-shadow duration-300 ${index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
            >
              <h3 className="font-serif !font-normal text-[#1F2922] !text-[26px] sm:!text-[30px] md:!text-[34px] leading-tight mb-2">
                {pillar.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* BOTTOM NARRATIVE & CTA BUTTON                            */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto"
        >
          <p className="text-white font-normal leading-relaxed">
            Because the most meaningful places eventually become part of your
            life story.
          </p>

          <button
            type="button"
            onClick={handleDiscoverLifestyle}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] font-sans font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            Discover The Lifestyle
          </button>
        </motion.div>
      </div>
    </section>
  );
}
