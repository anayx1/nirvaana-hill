"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function StillHaveQuestionsSection() {
  return (
    <section
      id="questions"
      className="relative w-full bg-[#FAF9F5] py-12 sm:py-14 md:py-16 lg:py-20 overflow-hidden select-none"
    >
      {/* ====================================================== */}
      {/* BOTANICAL FLOWER BACKGROUND IMAGE (RIGHT SIDE)         */}
      {/* ====================================================== */}
      <div className="absolute right-2 sm:right-8 md:right-14 lg:right-24 top-1/2 -translate-y-1/2 w-[160px] xs:w-[200px] sm:w-[280px] md:w-[360px] lg:w-[420px] h-[85%] sm:h-[90%] pointer-events-none select-none z-0">
        <Image
          src="/nirvaana-hills/flower-bg.avif"
          alt="Nirvaana Hills Flora"
          fill
          unoptimized
          priority
          className="object-contain object-right opacity-40"
        />
      </div>

      <div className="container max-w-[1200px] px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start space-y-4 max-w-xl"
        >
          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.12] tracking-[-0.01em]">
            Still Have Questions?
          </h2>

          {/* Description */}
          <p className="text-[#313116] text-[13.5px] sm:text-[15px] md:text-[16px] leading-relaxed font-normal max-w-lg">
            Land that offers more than ownership - a place to use, enjoy and hold
            for the long term.
          </p>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4">
            <Link
              href="/faqs#faq-list"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95"
            >
              Explore All FAQs
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
