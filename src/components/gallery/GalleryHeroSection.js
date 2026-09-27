"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
              <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-white" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
                GALLERY &amp; LIFE AT NIRVAANA
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] tracking-[-0.01em]">
              The Real Story,
              <br />
              As It&apos;s Happening.
            </h1>

            {/* Description Paragraph */}
            <p className="font-sans text-white/90 text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-xl font-normal pt-1">
              Real land. Real progress. Real moments. Explore original site visuals, development updates, walkthroughs, community moments, and the evolving journey of Nirvaana Hills.
            </p>

            {/* Explore Gallery CTA Button */}
            <div className="pt-2 md:pt-3">
              <a
                href="#original-site-visuals"
                className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
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
