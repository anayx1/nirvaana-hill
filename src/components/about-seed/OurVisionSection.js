"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function OurVisionSection() {
  const sectionRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Parallax reduced scroll speed effect on the background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      id="our-vision"
      className="relative w-full min-h-[600px] md:min-h-[720px] lg:min-h-[780px] overflow-hidden flex items-center py-20 md:py-32 lg:py-36 text-white select-none"
    >
      {/* ====================================================== */}
      {/* PARALLAX REDUCED-SPEED BACKGROUND IMAGE                */}
      {/* ====================================================== */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-[15%] -bottom-[15%] w-full h-[130%] pointer-events-none z-0"
      >
        <Image
          src="/about-seed/our-vision.webp"
          alt="Our Vision - SEAD Realty Nature & Forest Community"
          fill
          unoptimized
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Rich Forest Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2922]/75 via-[#1F2922]/50 to-[#1F2922]/85" />
        <div className="absolute inset-0 bg-[#2C3826]/30 mix-blend-multiply" />
      </motion.div>

      {/* FOREGROUND CONTENT (Right-anchored, left-aligned text) */}
      <div className="container relative z-10 max-w-[1300px] px-4 md:px-6 flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[680px] lg:max-w-[720px] ml-auto flex flex-col space-y-5 md:space-y-7 text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-white/90">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-5 md:h-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] md:text-[13px] whitespace-nowrap">
              OUR VISION
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white text-[30px] md:text-[48px] lg:text-[56px] leading-[1.12] tracking-[-0.01em]">
            Reimagining The Future Of Living For Families.
          </h2>

          {/* Narrative Paragraph */}
          <div className="md:pl-8 space-y-4">
            <p className="font-sans text-white/90 text-[15px] md:text-[18px] leading-[1.65] max-w-2xl font-normal">
              To become one of India&apos;s most trusted names in farmhouse and
              farmland communities - because nature, wellness, and slower living
              should never feel inaccessible. That belief shapes how we think,
              build, and plan for the future.
            </p>

            {/* Expanded Content: Vision Pillars */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden space-y-3 pt-2"
                >
                  <h3 className="font-sans font-semibold text-white text-[16px] md:text-[19px] tracking-wide pt-1">
                    Vision Pillars:
                  </h3>

                  <ul className="space-y-3 text-white/90 font-sans text-[14.5px] md:text-[16.5px] leading-[1.6]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#AFEB63] shrink-0 text-[16px] leading-tight mt-0.5">✦</span>
                      <span>
                        <strong className="text-white font-semibold">Integrated Farmland Communities</strong> - Long-term living, meaningful ownership, premium experiences
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#AFEB63] shrink-0 text-[16px] leading-tight mt-0.5">✦</span>
                      <span>
                        <strong className="text-white font-semibold">Sustainable Infrastructure</strong> - Development that respects biodiversity and natural systems
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#AFEB63] shrink-0 text-[16px] leading-tight mt-0.5">✦</span>
                      <span>
                        <strong className="text-white font-semibold">Holistic Living Ecosystems</strong> - Organic farming, wellness, recreation, and lifestyle balance
                      </span>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Read More CTA (Hidden once clicked) */}
            {!isExpanded && (
              <div className="pt-2 flex flex-col items-start group">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="font-sans italic text-[22px] md:text-[28px] text-white/95 hover:text-white transition-opacity inline-block tracking-tight cursor-pointer focus:outline-none"
                >
                  read more
                </button>
                {/* Decorative Pill Accent */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#AFEB63]" />
                  <div className="w-10 h-[3px] rounded-full bg-[#AFEB63]" />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
