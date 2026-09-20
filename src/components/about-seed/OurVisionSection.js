"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home } from "lucide-react";

export default function OurVisionSection() {
  const sectionRef = useRef(null);

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
      className="relative w-full min-h-[600px] sm:min-h-[650px] md:min-h-[720px] lg:min-h-[780px] overflow-hidden flex items-center py-20 sm:py-24 md:py-32 lg:py-36 text-white select-none"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F2922]/70 via-[#1F2922]/45 to-[#1F2922]/85" />
        <div className="absolute inset-0 bg-[#2C3826]/30 mix-blend-multiply" />
      </motion.div>

      {/* ====================================================== */}
      {/* FOREGROUND CONTENT                                     */}
      {/* ====================================================== */}
      <div className="container relative z-10 max-w-[1100px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[760px] flex flex-col space-y-5 sm:space-y-6 md:space-y-7"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 text-white/90">
            <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
              OUR VISION
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white text-[32px] xs:text-[38px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.12] tracking-[-0.01em]">
            Reimagining The Future Of Living For Families.
          </h2>

          {/* Narrative Paragraph */}
          <p className="font-sans text-white/90 text-[15px] sm:text-[16px] md:text-[18px] leading-[1.65] max-w-2xl font-normal sm:pl-6 md:pl-8 border-l border-white/20 sm:border-white/30">
            To become one of India&apos;s most trusted names in farmhouse and
            farmland communities - because nature, wellness, and slower living
            should never feel inaccessible. That belief shapes how we think,
            build, and plan for the future.
          </p>

          {/* Read More Link & Pill Indicator */}
          <div className="pt-2 sm:pt-4 flex flex-col items-start self-end sm:self-auto sm:pl-6 md:pl-8 group">
            <Link
              href="#vision-details"
              className="font-sans italic text-[22px] sm:text-[26px] md:text-[28px] text-white/95 group-hover:text-white transition-opacity inline-block tracking-tight"
            >
              read more
            </Link>
            {/* Decorative Pill Accent */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-10 h-[3px] rounded-full bg-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
