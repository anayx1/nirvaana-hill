"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
              <FarmIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
                SITE VISIT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[36px] xs:text-[44px] sm:text-[54px] md:text-[64px] lg:text-[72px] leading-[1.0] tracking-[-0.02em]">
              See It.
              <br />
              Feel It.
              <br />
              Own It.
            </h2>

            {/* Description */}
            <p className="font-sans text-[#353D2C] text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-xl">
              Walk the land. Feel the air. Imagine life at Nirvaana Hills. Bring
              your family, ask your questions, and see the progress for
              yourself.
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-3">
              <Link
                href="/contact-us"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
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
