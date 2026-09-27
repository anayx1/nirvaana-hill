"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function AboutSeedHeroSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about-seed-hero"
      className="w-full bg-[#62735B] py-12 md:py-20 lg:py-24 xl:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Read More Toggle               */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col space-y-4 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-white/90">
              <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
                ABOUT SEAD
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
              Building More Than Land.
              <br />
              Creating A Legacy Rooted In Purpose.
            </h1>

            {/* Paragraph 1 */}
            <p className="font-sans text-white/90 text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-xl font-normal">
              Every meaningful place begins with a belief. At SEAD Realty, our
              work extends far beyond development - we believe land should
              create lasting value for families, communities, nature, and future
              generations.
            </p>

            {/* Paragraph 2 (Expanded Content on Read More) */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-white/90 text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-xl font-normal pt-1">
                    Nirvaana Hills reflects a vision shaped over decades: to create
                    environments where people reconnect with life, while
                    contributing to something far bigger than themselves. From
                    land development to education, sustainable living, and
                    community impact, every step is guided by one belief - growth
                    should benefit generations, not only individuals.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Read More CTA (Hidden completely once clicked) */}
            {!isExpanded && (
              <div className="pt-2 flex flex-col items-start group">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="font-sans italic text-[16px] md:text-[20px] text-white/95 hover:text-white transition-opacity inline-block tracking-tight cursor-pointer focus:outline-none"
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
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Hero Image                               */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/11] lg:aspect-[4/3.2] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/about-seed/hero.webp"
                alt="Building More Than Land - SEAD Realty"
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
