"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GalleryHeroSection() {
  return (
    <section
      id="gallery-hero"
      className="w-full bg-[#62735B] py-12 md:py-20 lg:py-24 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1300px] px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-center">
          
          {/* ====================================================== */}
          {/* LEFT COLUMN: NARRATIVE CONTENT                         */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start space-y-4 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-white/90">
              <svg
                width="20"
                height="20"
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
                GALLERY &amp; LIFE AT NIRVAANA
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[32px] xs:text-[38px] sm:text-[46px] md:text-[54px] lg:text-[60px] leading-[1.12] tracking-[-0.01em]">
              The Real Story,
              <br />
              As It&apos;s Happening.
            </h1>

            {/* Description Paragraph */}
            <p className="font-sans text-white/90 leading-[1.65] max-w-xl font-normal pt-1">
              Real land. Real progress. Real moments. Explore original site visuals, development updates, walkthroughs, community moments, and the evolving journey of Nirvaana Hills.
            </p>

            {/* Explore Gallery CTA Button */}
            <div className="pt-2 md:pt-3">
              <a
                href="#original-site-visuals"
                className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-2xl hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-sm"
              >
                Explore Gallery
              </a>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: HERO VISUAL IMAGE                        */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-white/10"
          >
            <Image
              src="/gallery/hero.avif"
              alt="Real moments, nature, and community life at Nirvaana Hills"
              width={1000}
              height={1300}
              sizes="(max-width: 1024px) 100vw, 500px"
              className="w-full h-auto max-h-[520px] object-cover"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
