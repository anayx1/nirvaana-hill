"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyLocationMattersSection() {
  return (
    <section
      id="why-location-matters"
      className="w-full bg-[#FAF9F5] py-5 text-[#1F2922]"
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
            className="flex flex-col space-y-4 sm:space-y-5"
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
                WHY THIS LOCATION MATTERS
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[32px] sm:text-[38px] md:text-[40px] lg:text-[44px] leading-[1.15] tracking-[-0.01em]">
              Why Mahendragarh.
              <br />
              Why The Aravallis.
            </h2>

            {/* Description Paragraph */}
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal pt-1"
            >
              Some places are chosen for convenience, others for quality of life. Mahendragarh and the Aravalli belt offer something rare near Delhi, where the location itself becomes part of the experience and offers 60-70% lower AQI.
            </p>

            {/* Why It Matters Subheading */}
            <div className="pt-2 flex flex-col space-y-2">
              <h3 className="font-sans font-bold text-[#1F2922] text-[16px] sm:text-[18px]">
                Why It Matters
              </h3>
              <p
                style={{ color: "#5C6051" }}
                className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal"
              >
                Scenic Aravalli Landscape · Cleaner Environment · Lower Congestion · Weekend Accessibility from NCR · Strong Long-Term Potential.
              </p>
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
              src="/locations/hero.avif"
              alt="Scenic Aravalli Foothills and Mahendragarh Landscape"
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
