"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

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
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-secondary" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase whitespace-nowrap">
              PHASES OF NIRVAANA HILLS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.14] tracking-[-0.01em]">
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
              <span className="font-serif text-[40px] sm:text-[48px] leading-none text-white/90 font-normal">
                01
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-white/90 text-[10.5px] sm:text-[11.5px] font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                SOLD OUT
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[10.5px] sm:text-[11.5px] font-medium uppercase tracking-[0.14em] text-white/80 mb-1.5">
              PHASE 1
            </p>

            {/* Title */}
            <h3 className="font-serif !font-normal text-white text-[20px] sm:text-[24px] md:text-[26px] leading-snug mb-2">
              Phase 1 Is Now Fully Reserved.
            </h3>

            {/* Description */}
            <p className="text-white/85 text-[13px] sm:text-[14px] leading-relaxed">
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
              <span className="font-serif text-[40px] sm:text-[48px] leading-none text-white font-normal">
                02
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-white text-[10.5px] sm:text-[11.5px] font-medium tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AFEB63]" />
                NOW OPEN
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[10.5px] sm:text-[11.5px] font-medium uppercase tracking-[0.14em] text-white/85 mb-1.5">
              PHASE 2
            </p>

            {/* Title */}
            <h3 className="font-serif !font-normal text-white text-[20px] sm:text-[24px] md:text-[26px] leading-snug mb-2">
              Limited Inventory Now Open.
            </h3>

            {/* Description */}
            <div className="space-y-2.5 text-white/90 text-[13px] sm:text-[14px] leading-relaxed">
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
            <div className="border-t border-white/20 my-4 sm:my-5" />

            {/* Pricing Details */}
            <div className="space-y-1 mb-5">
              <p className="text-[10.5px] sm:text-[11.5px] font-medium uppercase tracking-[0.14em] text-white/80">
                STARTING FROM
              </p>
              <p className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-tight text-white font-normal">
                ₹1.29 Cr
              </p>
              <p className="text-[11.5px] text-white/70 italic">
                *Indicative
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/faqs#phases"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95"
              >
                Find Phase Answers
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
