"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home } from "lucide-react";

export default function FounderVisionSection() {
  const sectionRef = useRef(null);

  // Reverse parallax scroll effect on background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Reverse scroll: moves upward as you scroll down
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);

  return (
    <section
      ref={sectionRef}
      id="founder-vision"
      className="relative w-full min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[700px] overflow-hidden flex items-center justify-center py-20 sm:py-24 md:py-30 lg:py-36 text-white select-none"
    >
      {/* ====================================================== */}
      {/* REVERSE PARALLAX BACKGROUND IMAGE                      */}
      {/* ====================================================== */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-[15%] -bottom-[15%] w-full h-[130%] pointer-events-none z-0"
      >
        <Image
          src="/about-seed/neeraj-vision.webp"
          alt="Neeraj Bansal Founder Vision - Nirvaana Hills Countryside"
          fill
          unoptimized
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark Editorial Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141A12]/65 via-[#141A12]/45 to-[#141A12]/75" />
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      {/* ====================================================== */}
      {/* FOREGROUND QUOTE CONTENT                               */}
      {/* ====================================================== */}
      <div className="container relative z-10 max-w-[960px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-5 sm:space-y-6 md:space-y-8"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2.5 text-white/95">
            <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
              FOUNDER VISION
            </span>
          </div>

          {/* Quote Headline */}
          <blockquote className="font-serif !font-normal text-white text-[24px] xs:text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] leading-[1.22] tracking-[-0.01em] max-w-[840px]">
            &ldquo;We are not simply developing land. We are shaping environments
            families can return to for generations. A place designed to become a
            destination for everyone.&rdquo;
          </blockquote>

          {/* Attribution */}
          <p className="font-serif italic text-white/90 text-[18px] sm:text-[22px] md:text-[26px] tracking-wide pt-1 sm:pt-2">
            ~ Neeraj Bansal
          </p>
        </motion.div>
      </div>
    </section>
  );
}
