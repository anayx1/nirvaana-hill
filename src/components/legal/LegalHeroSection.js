"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LegalHeroSection() {
  return (
    <section
      id="legal-hero"
      className="w-full bg-[#62735B] py-12 md:py-20 lg:py-24 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1200px] px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto mb-8 md:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-white/90">
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
              LEGAL INFORMATION
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif !font-normal text-white text-[28px] md:text-[46px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
            Transparency, Trust &amp; Compliance
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-white/90 text-[14.5px] md:text-[17px] leading-[1.65] font-normal max-w-2xl">
            Essential legal information, policies, and terms applicable to the
            Nirvaana Hills website and project.
          </p>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[580px] mx-auto overflow-hidden rounded-[20px] md:rounded-[32px] shadow-2xl bg-[#2A3426] ring-1 ring-white/10"
        >
          <div className="relative w-full aspect-[4/4.5] md:aspect-[4/4.2]">
            <Image
              src="/legal/hero-legal.webp"
              alt="Transparency, Trust & Compliance - Nirvaana Hills Legal Information"
              fill
              priority
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 580px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
