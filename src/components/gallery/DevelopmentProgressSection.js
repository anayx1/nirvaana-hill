"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MARQUEE_TEXT = "Because promises matter less when progress becomes visible.";

export default function DevelopmentProgressSection() {
  // Repeat marquee text to ensure smooth infinite loop
  const repeatedMarquee = Array(8).fill(MARQUEE_TEXT);

  return (
    <section
      id="development-progress"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      <div className="container max-w-[900px] px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* ====================================================== */}
        {/* HEADER BLOCK                                           */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-2xl mb-8 sm:mb-10 text-center"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
              DEVELOPMENT PROGRESS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] leading-[1.15] tracking-[-0.01em]">
            Don&apos;t Take Our Word For It.
            <br className="hidden sm:inline" /> Watch It Happen.
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal pt-1 max-w-xl"
          >
            Every meaningful project reveals its credibility through progress that can actually be seen. Track the real evolution of Nirvaana Hills - plantation growth, road development, and community spaces taking shape on the ground.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* PROGRESS IMAGE WITH MARQUEE OVERLAY                   */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[640px] aspect-[4/5] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#E5E8D8] relative bg-[#1F241C] select-none"
        >
          <Image
            src="/gallery/development-progress.avif"
            alt="Real ground development progress and excavation at Nirvaana Hills with Aravalli mountains background"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
            priority
          />

          {/* Bottom Gradient and Marquee Text Strip */}
          <div className="absolute bottom-0 left-0 right-0 py-3.5 sm:py-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent overflow-hidden select-none pointer-events-none">
            <div className="flex w-max animate-marquee font-sans items-center">
              {repeatedMarquee.map((text, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="text-white font-semibold text-[14px] sm:text-[16px] md:text-[17px] tracking-tight whitespace-nowrap px-4 drop-shadow-md">
                    {text}
                  </span>
                  <span className="text-white/50 text-[12px] select-none">•</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
