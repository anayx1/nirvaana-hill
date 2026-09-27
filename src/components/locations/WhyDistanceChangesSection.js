"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
              <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
                WHY DISTANCE CHANGES EVERYTHING
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[28px] md:text-[34px] lg:text-[38px] leading-[1.15] tracking-[-0.01em]">
              The Best Places Are Not The Furthest Away.
              <br />
              They Are The Ones You Keep Returning To.
            </h2>

            {/* Body Paragraph 1 */}
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] font-normal pt-1"
            >
              Too close to escape. Too far to enjoy. Nirvaana Hills offers the right balance. Peaceful enough to disconnect and close enough for regular weekends.
            </p>

            {/* Body Paragraph 2 */}
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] font-normal"
            >
              Because ownership matters when you truly enjoy it.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#connectivity-tabs"
                className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
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
