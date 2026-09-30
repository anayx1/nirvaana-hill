"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function MasterPlanSection() {
  return (
    <section
      id="master-plan"
      className="w-full bg-[#FAF9F5] py-10 sm:py-12 md:py-14 lg:py-16 overflow-hidden select-none"
    >
      <div className="container max-w-[1200px] px-4 sm:px-6">

        {/* ====================================================== */}
        {/* SECTION HEADER & INTRO                                 */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start space-y-4 max-w-3xl"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-secondary">
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-secondary" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase whitespace-nowrap">
              MASTER PLAN
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.14] tracking-[-0.01em]">
            A Community Designed As One
          </h2>

          {/* Description */}
          <div className="space-y-1 text-[#313116] text-[13.5px] sm:text-[15px] md:text-[16px] leading-relaxed max-w-2xl font-normal">
            <p>
              200 acres thoughtfully shaped around nature, private farmland and
              the experiences that bring people.
            </p>
            <p className="font-medium text-[#1F2922]">
              Every element has a place. Every place has a purpose.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-3">
            <Link
              href="#master-plan-map"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95"
            >
              Explore The Nirvaana Layout
            </Link>
          </div>
        </motion.div>

        {/* ====================================================== */}
        {/* MASTER PLAN MAP CARD                                   */}
        {/* ====================================================== */}
        <motion.div
          id="master-plan-map"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9] lg:h-[620px] rounded-xl overflow-hidden bg-[#FAF9F5] border border-black/5 mt-8 sm:mt-10 md:mt-12"
        >
          <Image
            src="/nirvaana-hills/masterplan-map.avif"
            alt="Nirvaana Hills Master Plan - A Community Designed As One"
            fill
            unoptimized
            priority
            className="object-contain sm:object-cover transition-transform duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </motion.div>
      </div>
    </section>
  );
}
