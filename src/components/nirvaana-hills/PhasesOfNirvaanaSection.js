"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function PhasesOfNirvaanaSection() {
  return (
    <section
      id="phases"
      className="w-full bg-[#FAF9F5] py-10 sm:py-12 md:py-14 lg:py-16 overflow-hidden select-none"
    >
      <div className="container max-w-[1200px] px-4 sm:px-6">
        
        {/* ====================================================== */}
        {/* SECTION HEADER                                         */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 sm:space-y-4 mb-8 sm:mb-10 md:mb-12 max-w-3xl"
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
              PHASES OF NIRVAANA HILLS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.14] tracking-[-0.01em]">
            A Community Built In Stages,
            <br className="hidden sm:inline" />
            Trusted Right From The Start.
          </h2>
        </motion.div>

        {/* ====================================================== */}
        {/* PHASES CARDS VERTICAL FLOW                             */}
        {/* ====================================================== */}
        <div className="flex flex-col items-center max-w-[620px] mx-auto w-full">
          
          {/* ---------------------------------------------------- */}
          {/* PHASE 01 CARD                                        */}
          {/* ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-[28px] bg-[#82927C] text-white p-6 sm:p-8 shadow-sm"
          >
            {/* Top row: Number and Sold Out badge */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <span className="font-serif text-[48px] sm:text-[56px] leading-none text-white/90 font-normal">
                01
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-white/90 text-[11px] sm:text-[12px] font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                SOLD OUT
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80 mb-1.5">
              PHASE 1
            </p>

            {/* Title */}
            <h3 className="font-serif !font-normal text-white text-[24px] sm:text-[28px] md:text-[30px] leading-snug mb-3">
              Phase 1 Is Now Fully Reserved.
            </h3>

            {/* Description */}
            <p className="text-white/85 text-[14px] sm:text-[15px] leading-relaxed">
              Launched September 2025 with 87 farmland parcels.
            </p>
          </motion.div>

          {/* ---------------------------------------------------- */}
          {/* CONNECTOR LINE & DOWN ARROW                          */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col items-center justify-center my-3 sm:my-4">
            <div className="w-[1px] h-8 sm:h-10 bg-black/25" />
            <ArrowDown className="w-4 h-4 text-black/50 -mt-0.5" />
          </div>

          {/* ---------------------------------------------------- */}
          {/* PHASE 02 CARD                                        */}
          {/* ---------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-[28px] bg-[#5C6E56] text-white p-6 sm:p-8 md:p-9 shadow-md"
          >
            {/* Top row: Number and Now Open badge */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <span className="font-serif text-[48px] sm:text-[56px] leading-none text-white font-normal">
                02
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-white text-[11px] sm:text-[12px] font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AFEB63]" />
                NOW OPEN
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 mb-1.5">
              PHASE 2
            </p>

            {/* Title */}
            <h3 className="font-serif !font-normal text-white text-[24px] sm:text-[28px] md:text-[30px] leading-snug mb-3">
              Limited Inventory Now Open.
            </h3>

            {/* Description */}
            <div className="space-y-3 text-white/90 text-[14px] sm:text-[15px] leading-relaxed">
              <p>
                Launched June 2026, carefully planned, limited in availability,
                and designed for families seeking both lifestyle value and
                long-term appreciation.
              </p>
              <p className="font-medium text-white">
                Phase 2 is a controlled release of limited ownership within a
                200-acre ecosystem
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20 my-5 sm:my-6" />

            {/* Pricing Details */}
            <div className="space-y-1 mb-6">
              <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-white/80">
                STARTING FROM
              </p>
              <p className="font-serif text-[32px] sm:text-[38px] md:text-[44px] leading-tight text-white font-normal">
                ₹1.29 Cr
              </p>
              <p className="text-[12px] text-white/70 italic">
                *Indicative
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/contact-us"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 sm:px-9 py-3.5 rounded-full transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95"
              >
                Find Your Answers
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
