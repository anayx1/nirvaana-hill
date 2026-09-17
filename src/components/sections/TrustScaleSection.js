"use client";

import React from "react";
import { motion } from "framer-motion";

const TRUST_STATS = [
  { id: "acres", label: "200 Acres" },
  { id: "farmlands", label: "240+ Farmlands" },
  { id: "phase1", label: "100% Phase 1 Reserved" },
  { id: "trees", label: "1,00,000+ Trees" },
  { id: "price", label: "₹1.29 Cr Starting Price" },
  { id: "distance", label: "2 Hours from Delhi & Gurgaon" },
  { id: "freehold", label: "100% Freehold Land" },
  { id: "aqi", label: "50-70% Better AQI than Delhi NCR" },
];

export default function TrustScaleSection() {
  return (
    <section
      id="different"
      className="w-full bg-[#FAF9F5] py-10 md:py-0 overflow-hidden"
    >
      <div className="container max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 md:space-y-4 mb-8 md:mb-12"
        >
          {/* Overline with Hill Icon */}
          <div className="flex items-center gap-2 text-secondary">
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
            <span className="text-[13px] md:text-[15px] font-semibold tracking-[0.12em] uppercase">
              TRUST & SCALE
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="font-serif !font-normal text-[#1F2922] !text-[32px] sm:!text-[38px] md:!text-[46px] lg:!text-[52px] leading-[1.12] tracking-[-0.01em]">
            Built On Real Land.
            <br />
            Real Scale.
            <br />
            Real Ownership.
          </h2>
        </motion.div>

        {/* 8-Card Responsive Grid: 2 cols on mobile, 4 cols on tablet & desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center justify-center text-center p-4 sm:p-5 md:p-6 min-h-[110px] sm:min-h-[120px] md:min-h-[135px] lg:min-h-[150px] bg-[#F5F3EC]/70 border border-slate-200 rounded-xl md:rounded-3xl hover:border-[#D5D0C0] hover:bg-[#F2EFE6] transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              <p className="font-serif !font-normal text-slate-500 text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] xl:text-[22px] leading-snug px-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
