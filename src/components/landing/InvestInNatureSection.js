"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const STATS_DATA = [
  {
    value: "200+ Acres",
    label: "Managed Farmland Community",
  },
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
    value: "2 Hours",
    label: "From Delhi & Gurugram",
  },
];

export default function InvestInNatureSection() {
  return (
    <section
      id="invest-in-nature"
      className="relative w-full bg-fixed bg-cover bg-center py-16 sm:py-20 md:py-28 overflow-hidden select-none"
      style={{
        backgroundImage: "url('/landing/site-visit-bg.webp')",
      }}
    >
      {/* Subtle Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

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
          <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[32px] sm:text-[38px] md:text-[42px] leading-[1.18] tracking-[-0.01em]">
            Invest in Nature.
            <br />
            Grow with Confidence.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#2A3528] text-[15px] sm:text-[16px] md:text-[17px] font-normal mt-3">
            Premium managed farmlands designed for long-term value.
          </p>

          {/* Paragraph */}
          <p className="font-sans text-[#525E50] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65] mt-6 sm:mt-8">
            Invest in premium managed farmland spread across 200 acres,
            surrounded by 9,600 acres of Aravalli forest, just 2 hrs from Delhi
            &amp; Gurugram. Legally secured, sustainably designed,
            infrastructure-ready, and professionally managed to deliver
            long-term appreciation and passive income.
          </p>

          {/* Divider line */}
          <div className="w-full h-px bg-[#E2E1D7] my-7 sm:my-9" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {STATS_DATA.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9F5] border border-[#E3E2D8] rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 flex flex-col items-center justify-center text-center min-h-[96px] sm:min-h-[110px] transition-all duration-300 hover:border-[#CBD5C0] hover:shadow-xs"
              >
                <div className="font-serif !font-normal text-[#1F2922] text-[17px] sm:text-[20px] md:text-[22px] leading-tight">
                  {stat.value}
                </div>
                <div className="font-sans text-[#616E5F] text-[11px] sm:text-[13px] leading-snug mt-1.5 max-w-[200px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center gap-6 pt-8 sm:pt-10">
            {/* Primary Button */}
            <Link
              href="#landing-pricing"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
            >
              Explore Phase 2
            </Link>

            {/* Secondary CTA: Download Brochure */}
            <div className="flex flex-col items-center">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-1.5 text-[#1F2922] hover:text-[#1F2922]/80 font-sans text-[15px] sm:text-[16px] font-medium transition-colors group"
              >
                <span>Download Brochure</span>
                <ArrowUpRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
