"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SiteVisitSection() {
  return (
    <section
      id="site-visit"
      className="w-full bg-[#FAF9F5] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden select-none"
    >
      <div className="container max-w-[1300px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#E5E8D8] p-7 sm:p-12 md:p-16 lg:p-20 shadow-sm border border-black/5"
        >
          <div className="max-w-3xl flex flex-col space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-secondary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
                <path d="M3 21c4-2 8-2 12 0" />
                <path d="M9 17c2-1 4-1 6 0" />
              </svg>
              <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
                SITE VISIT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[48px] xs:text-[58px] sm:text-[72px] md:text-[84px] lg:text-[96px] leading-[1.0] tracking-[-0.02em]">
              See It.
              <br />
              Feel It.
              <br />
              Own It.
            </h2>

            {/* Description */}
            <p className="font-sans text-[#353D2C] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] max-w-xl">
              Walk the land. Feel the air. Imagine life at Nirvaana Hills. Bring
              your family, ask your questions, and see the progress for
              yourself.
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <Link
                href="/contact-us"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 py-3.5 sm:px-9 sm:py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
              >
                Book A Site Visit
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
