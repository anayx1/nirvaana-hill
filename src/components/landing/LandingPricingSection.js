"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

const PLOT_PRICING = [
  {
    category: "Hill View",
    price: "₹1.29 Cr",
    size: "1,613 sq yd",
  },
  {
    category: "Forest Frontage",
    price: "₹1.85 Cr",
    size: "2,420 sq yd",
  },
  {
    category: "Hilltop Premium",
    price: "₹2.75 Cr",
    size: "4,840 sq yd",
  },
];

export default function LandingPricingSection() {
  return (
    <section
      id="landing-pricing"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 overflow-hidden text-[#1F2922] select-none"
    >
      <div className="container max-w-[800px] px-4 sm:px-6 mx-auto">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B05B3B] mb-3 sm:mb-4">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              PHASE 2 PRICING
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.15] tracking-[-0.01em] mb-3 sm:mb-4">
            Choose Your Forest Plot
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#525E50] text-[13px] xs:text-[14px] sm:text-[15px] leading-relaxed max-w-xl mx-auto">
            Three plot categories designed for different ownership goals &ndash;
            weekend retreat, investment, or full farmhouse living.
          </p>
        </motion.div>

        {/* Pricing Matrix Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[640px] mx-auto"
        >
          {/* Table Header */}
          <div className="w-full bg-[#E5EAD9] rounded-[8px] sm:rounded-[10px] px-3 sm:px-6 py-3.5 sm:py-4 grid grid-cols-3 items-center text-center">
            <span className="font-serif text-[#1F2922] text-[14px] sm:text-[15.5px] md:text-[17px] font-normal">
              Category
            </span>
            <span className="font-serif text-[#1F2922] text-[14px] sm:text-[15.5px] md:text-[17px] font-normal leading-tight">
              Price
              <br className="sm:hidden" />{" "}
              <span className="text-[11px] sm:text-[12.5px] opacity-80">(Onwards)</span>
            </span>
            <span className="font-serif text-[#1F2922] text-[14px] sm:text-[15.5px] md:text-[17px] font-normal">
              Farmland Size
            </span>
          </div>

          {/* Table Rows */}
          <div className="w-full flex flex-col">
            {PLOT_PRICING.map((item, idx) => (
              <div
                key={idx}
                className="w-full border-b border-dashed border-[#B8B7A8]"
              >
                <div className="w-full grid grid-cols-3 items-center text-center py-3.5 sm:py-4 px-2 sm:px-4">
                  {/* Category */}
                  <span className="font-sans text-[#434E41] text-[12px] sm:text-[13.5px] md:text-[14.5px] font-medium">
                    {item.category}
                  </span>

                  {/* Price */}
                  <span className="font-sans text-[#434E41] text-[12px] sm:text-[13.5px] md:text-[14.5px] font-normal">
                    {item.price}
                  </span>

                  {/* Size */}
                  <span className="font-sans text-[#434E41] text-[12px] sm:text-[13.5px] md:text-[14.5px] font-normal">
                    {item.size}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimers & Info */}
          <div className="text-center space-y-2 text-[#556051] text-[11.5px] sm:text-[12.5px] leading-relaxed max-w-[580px] mx-auto mt-6 sm:mt-8">
            <p>
              *All prices are indicative and subject to revision without notice.
              T&amp;C apply. RERA registration details available on request.
            </p>
            <p>
              Phase 2 plots are available on first-come-first-served basis. Phase 1
              is completely sold out.
            </p>
          </div>

          {/* CTA Buttons: Call CTA + Book A Site Visit */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
            <a
              href="tel:+919589585050"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xs active:scale-95"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call Us: +91 95895 85050</span>
            </a>

            <Link
              href="/contact-us#enquiry"
              className="border border-[#1F2922]/20 hover:border-[#1F2922] bg-white/40 text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
            >
              Book A Site Visit
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
