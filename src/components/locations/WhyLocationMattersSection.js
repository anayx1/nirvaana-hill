"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
              <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
                WHY THIS LOCATION MATTERS
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[1.15] tracking-[-0.01em]">
              Why Mahendragarh.
              <br />
              Why The Aravallis.
            </h2>

            {/* Description Paragraph */}
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] font-normal pt-1"
            >
              Some places are chosen for convenience, others for quality of life. Mahendragarh and the Aravalli belt offer something rare near Delhi, where the location itself becomes part of the experience and offers 60-70% lower AQI.
            </p>

            {/* Why It Matters Subheading */}
            <div className="pt-2 flex flex-col space-y-1.5">
              <h3 className="font-sans font-medium text-[#1F2922] text-[14px] sm:text-[15.5px]">
                Why It Matters
              </h3>
              <p
                style={{ color: "#5C6051" }}
                className="font-sans text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] font-normal"
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
