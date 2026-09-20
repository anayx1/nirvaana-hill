"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WeekendTestSection() {
  return (
    <section
      id="weekend-test"
      className="w-full bg-[#FAF9F5] py-5 text-[#1F2922]"
    >
      <div className="container max-w-[820px] px-4 sm:px-6 flex flex-col items-center text-center">

        {/* ====================================================== */}
        {/* SECTION HEADER & CONTENT                               */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center space-y-5 sm:space-y-6"
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
              THE WEEKEND TEST
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] leading-[1.18] tracking-[-0.01em]">
            Can Your Family Leave On A Saturday Morning And Still Feel The Weekend Belongs To You?
          </h2>

          {/* Body Paragraph 1 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] font-normal pt-1"
          >
            The true test of a second home: will it naturally become part of your lifestyle? A day outdoors, real time together, and a return that feels genuinely refreshed.
          </p>

          {/* Body Paragraph 2 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] font-normal"
          >
            Nirvaana Hills is built around one principle - a place you&apos;ll actually keep using. Because value isn&apos;t only what you own. It&apos;s how often you return to it.
          </p>

          {/* CTA Button */}
          <div className="pt-3">
            <a
              href="#site-visit"
              className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-2xl hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-sm"
            >
              Experience A Weekend Visit
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
