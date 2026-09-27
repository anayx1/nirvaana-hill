"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const BG_IMAGE_SRC = "/landing/site-visit-bg.webp";

const STATS_DATA = [
  {
    value: "200+ Acres",
    label: "Managed Farmland Community",
  },
  {
    value: "₹1.29 Cr",
    label: "Starting Price",
  },
  {
    value: "Investment Returns",
    label: "8% Rental Yield p.a. + 30% Avg. Annual Appreciation",
  },
  {
    value: "1 Lakh+",
    label: "Trees Being Planted",
  },
  {
    value: "9,600+ Acres",
    label: "Surrounding Natural Forest",
  },
  {
    value: "2 Hours",
    label: "From Delhi & Gurugram",
  },
];

export default function InvestInNatureSection() {
  return (
    <section
      id="invest-in-nature"
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden select-none"
    >
      {/* Background Image Preload & Prefetch */}
      <link rel="preload" href={BG_IMAGE_SRC} as="image" type="image/webp" />
      <link rel="prefetch" href={BG_IMAGE_SRC} as="image" type="image/webp" />

      {/* High-Performance Next.js Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={BG_IMAGE_SRC}
          alt="Nirvaana Hills Farmland Site"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />
      </div>

      {/* Subtle Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Centered Floating White/Cream Card */}
      <div className="relative z-10 container max-w-[760px] px-4 sm:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF9F5] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] shadow-2xl p-6 xs:p-8 sm:p-10 md:p-12 border border-[#E8E6DB]"
        >
          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.18] tracking-[-0.01em]">
            Invest in Nature.
            <br />
            Grow with Confidence.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#2A3528] text-[13.5px] sm:text-[14.5px] md:text-[15.5px] font-normal mt-3">
            Premium managed farmlands designed for long-term value.
          </p>

          {/* Paragraph */}
          <p className="font-sans text-[#525E50] text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65] mt-5 sm:mt-6">
            Invest in premium managed farmland spread across 200 acres,
            surrounded by 9,600 acres of Aravalli forest, just 2 hrs from Delhi
            &amp; Gurugram. Legally secured, sustainably designed,
            infrastructure-ready, and professionally managed to deliver
            long-term appreciation and passive income.
          </p>

          {/* Divider line */}
          <div className="w-full h-px bg-[#E2E1D7] my-6 sm:my-8" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {STATS_DATA.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F5] border border-[#E3E2D8] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[96px] sm:min-h-[110px] transition-all duration-300 hover:border-[#CBD5C0] hover:shadow-xs"
              >
                <div className="font-serif !font-normal text-[#1F2922] text-[16px] sm:text-[18px] md:text-[20px] leading-tight">
                  {stat.value}
                </div>
                <div className="font-sans text-[#616E5F] text-[11px] sm:text-[12.5px] leading-snug mt-1.5 max-w-[200px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center gap-5 pt-7 sm:pt-8">
            {/* Primary Button */}
            <Link
              href="#landing-pricing"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
            >
              Explore Phase 2
            </Link>

            {/* Secondary CTA: Download Brochure */}
            <div className="flex flex-col items-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1.5 text-[#1F2922] hover:text-[#1F2922]/80 font-sans text-[12px] md:text-[16px] font-normal transition-colors group"
              >
                <span>Download Brochure</span>
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {/* Decorative Pill Accent */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <div className="w-8 h-[2px] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
