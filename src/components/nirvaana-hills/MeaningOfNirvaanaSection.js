"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MeaningOfNirvaanaSection() {
  return (
    <section className="w-full bg-[#FAF9F5] pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-8 sm:pb-10 md:pb-12 select-none">
      <div className="container max-w-[1200px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 sm:space-y-4 max-w-3xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-secondary">
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
              <path d="M12 3l-8 7h16l-8-7z" />
              <path d="M5 14c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
              <path d="M5 19c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
            </svg>
            <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap">
              THE MEANING OF NIRVAANA
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.14] tracking-[-0.01em]">
            Nirvaana Is Not Just A Name.
            <br />
            It Is A State Of Being.
          </h2>

          {/* Description */}
          <p className="text-[#313116] text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-relaxed max-w-3xl pt-1">
            Derived from Sanskrit, Nirvaana (निर्वाण) represents liberation -
            freedom from noise, stress, and daily entanglement. Balance. Stillness.
            Peace. The ultimate calm in a chaotic world.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
