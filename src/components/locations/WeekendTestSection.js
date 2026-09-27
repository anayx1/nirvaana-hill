"use client";

import React from "react";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              THE WEEKEND TEST
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.18] tracking-[-0.01em]">
            Can Your Family Leave On A Saturday Morning And Still Feel The Weekend Belongs To You?
          </h2>

          {/* Body Paragraph 1 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal pt-1"
          >
            The true test of a second home: will it naturally become part of your lifestyle? A day outdoors, real time together, and a return that feels genuinely refreshed.
          </p>

          {/* Body Paragraph 2 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
          >
            Nirvaana Hills is built around one principle - a place you&apos;ll actually keep using. Because value isn&apos;t only what you own. It&apos;s how often you return to it.
          </p>

          {/* CTA Button */}
          <div className="pt-3">
            <a
              href="#site-visit"
              className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
            >
              Experience A Weekend Visit
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
