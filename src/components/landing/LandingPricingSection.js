"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
              PHASE 2 PRICING
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] leading-[1.15] tracking-[-0.01em] mb-4">
            Choose Your Forest Plot
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#525E50] text-[14px] xs:text-[15px] sm:text-[16px] leading-relaxed max-w-xl mx-auto">
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
            <span className="font-serif text-[#1F2922] text-[15px] sm:text-[17px] md:text-[19px] font-normal">
              Category
            </span>
            <span className="font-serif text-[#1F2922] text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-tight">
              Price
              <br className="sm:hidden" />{" "}
              <span className="text-[12px] sm:text-[14px] opacity-80">(Onwards)</span>
            </span>
            <span className="font-serif text-[#1F2922] text-[15px] sm:text-[17px] md:text-[19px] font-normal">
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
                <div className="w-full grid grid-cols-3 items-center text-center py-4 sm:py-5 px-2 sm:px-4">
                  {/* Category */}
                  <span className="font-sans text-[#434E41] text-[13px] sm:text-[15px] md:text-[16px] font-medium">
                    {item.category}
                  </span>

                  {/* Price */}
                  <span className="font-sans text-[#434E41] text-[13px] sm:text-[15px] md:text-[16px] font-normal">
                    {item.price}
                  </span>

                  {/* Size */}
                  <span className="font-sans text-[#434E41] text-[13px] sm:text-[15px] md:text-[16px] font-normal">
                    {item.size}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimers & Info */}
          <div className="text-center space-y-2 text-[#556051] text-[12px] sm:text-[13.5px] leading-relaxed max-w-[580px] mx-auto mt-7 sm:mt-9">
            <p>
              *All prices are indicative and subject to revision without notice.
              T&amp;C apply. RERA registration details available on request.
            </p>
            <p>
              Phase 2 plots are available on first-come-first-served basis. Phase 1
              is completely sold out.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-7 sm:pt-9">
            <Link
              href="/contact-us"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
            >
              Book A Site Visit
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
