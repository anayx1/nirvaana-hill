"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FaqClarifySection() {
  return (
    <section
      id="questions-welcome"
      className="relative w-full bg-[#FAF9F5] py-14 md:py-20 lg:py-28 overflow-hidden select-none border-t border-[#ECEEE4]/60"
    >
      {/* ====================================================== */}
      {/* BOTANICAL FLOWER BACKGROUND IMAGE (RIGHT SIDE)         */}
      {/* ====================================================== */}
      <div className="absolute right-0 md:right-10 lg:right-20 top-1/2 -translate-y-1/2 w-[220px] md:w-[380px] lg:w-[460px] h-[90%] md:h-[95%] pointer-events-none select-none z-0">
        <Image
          src="/nirvaana-hills/flower-bg.avif"
          alt="Nirvaana Hills Flora"
          fill
          unoptimized
          priority
          className="object-contain object-right opacity-40"
        />
      </div>

      <div className="container max-w-[1200px] px-4 md:px-6 relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start space-y-4 md:space-y-5 max-w-xl lg:max-w-2xl"
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
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] md:text-[13px] whitespace-nowrap">
              QUESTIONS ARE ALWAYS WELCOME
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] md:text-[44px] lg:text-[50px] leading-[1.15] tracking-[-0.01em]">
            Questions Are Part Of The Journey.
          </h2>

          {/* Narrative Body */}
          <div className="space-y-3 text-[#313116] font-normal">
            <p className="text-[14px] leading-tight">
              Whether you&apos;re curious about ownership, development progress,
              location, lifestyle possibilities, or the philosophy behind
              Nirvaana Hills - clarity should always come first. You&apos;ll find
              detailed answers here: clear, transparent, without unnecessary
              complexity.
            </p>
            <p className="italic text-gray-800 font-light pt-1 text-[14px] leading-tight">
              Because important decisions deserve complete understanding.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-3 md:pt-4">
            <Link
              href="/contact-us"
              className="bg-[#AFEB63] hover:bg-[#9EE837] text-[#1F2922] font-sans font-medium text-[15px] md:text-[16px] px-8 md:px-9 py-3.5 md:py-4 rounded-[14px] md:rounded-[18px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
            >
              Get More Clarity
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
