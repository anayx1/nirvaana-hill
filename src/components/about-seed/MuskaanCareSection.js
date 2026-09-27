"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function MuskaanCareSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="muskaan-care"
      className="relative w-full min-h-[560px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[740px] overflow-hidden flex items-center py-20 sm:py-24 md:py-30 lg:py-36 text-white select-none bg-[#0E1D24]"
    >
      {/* ====================================================== */}
      {/* BACKGROUND IMAGE WITH PARALLAX                         */}
      {/* ====================================================== */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-[12%] -bottom-[12%] w-full h-[124%] pointer-events-none z-0"
      >
        <Image
          src="/about-seed/muskan-care-bg.webp"
          alt="Muskaan Care Foundation Supporting Children Education"
          fill
          unoptimized
          priority
          className="object-cover object-bottom"
          sizes="100vw"
        />
      </motion.div>

      {/* ====================================================== */}
      {/* SOLID & GRADIENT OVERLAY (Always active on mobile/all) */}
      {/* ====================================================== */}
      <div className="absolute inset-0 bg-[#0E1D24]/70 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E1D24]/45 via-[#0E1D24]/15 to-[#0E1D24]/40 pointer-events-none z-[2]" />

      {/* ====================================================== */}
      {/* FOREGROUND CONTENT                                     */}
      {/* ====================================================== */}
      <div className="container relative z-10 max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[760px] flex flex-col space-y-5 sm:space-y-6 md:space-y-7"
        >
          {/* Circular Foundation Logo */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1.5 shadow-xl flex items-center justify-center ring-2 ring-white/20">
            <Image
              src="/about-seed/muskan-care-logo.avif"
              alt="Muskaan Care Foundation Logo"
              width={64}
              height={64}
              unoptimized
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-white/95">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
              MUSKAAN CARE FOUNDATION
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
            Creating Meaningful Impact For Over 16 Years.
          </h2>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col space-y-4 text-white/90 font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal max-w-xl">
            <p>
              For 16+ years, Muskaan Care Foundation has held one belief: every
              child deserves education. At its heart is Naya Sawera Public
              School, offering completely free education for underprivileged
              children.
            </p>
            <p>
              Since 2009, it has provided free education, books, uniforms, and
              learning support - impacting 2,500+ students.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
