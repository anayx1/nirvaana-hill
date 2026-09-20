"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyDistanceChangesSection() {
  return (
    <section
      id="why-distance-changes-everything"
      className="w-full bg-[#FAF9F5] py-10 sm:py-14 md:py-18 text-[#1F2922]"
    >
      <div className="container max-w-[1000px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10 lg:gap-14">
          
          {/* ====================================================== */}
          {/* LEFT CONTENT COLUMN                                    */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center md:items-start md:text-left space-y-4 sm:space-y-5"
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
                WHY DISTANCE CHANGES EVERYTHING
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[32px] sm:text-[38px] md:text-[40px] lg:text-[44px] leading-[1.15] tracking-[-0.01em]">
              The Best Places Are Not The Furthest Away.
              <br />
              They Are The Ones You Keep Returning To.
            </h2>

            {/* Body Paragraph 1 */}
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal pt-1"
            >
              Too close to escape. Too far to enjoy. Nirvaana Hills offers the right balance. Peaceful enough to disconnect and close enough for regular weekends.
            </p>

            {/* Body Paragraph 2 */}
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal"
            >
              Because ownership matters when you truly enjoy it.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#connectivity-tabs"
                className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-2xl hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-sm"
              >
                Explore Connectivity
              </a>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT IMAGE COLUMN                                     */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E8D8] aspect-[4/3] md:aspect-[5/4]"
          >
            <Image
              src="/locations/why-distance-changes-everything.avif"
              alt="Scenic road leading towards Nirvaana Hills Aravalli green landscape"
              width={800}
              height={640}
              sizes="(max-width: 768px) 100vw, 500px"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
