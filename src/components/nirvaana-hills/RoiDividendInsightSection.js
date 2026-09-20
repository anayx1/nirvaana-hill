"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const WHY_IT_MATTERS_ITEMS = [
  "Freehold land ownership",
  "Growing NCR connectivity with Gurgaon-Jhajjar Highway/ UER-2/ NH-352W/ NH-148B/ NH-152D/ NH-334B-/ Jhajjar- Charkhi Dadri Highway.",
  "40-50% long-term appreciation in 3 years",
  "Weekend & lifestyle value",
  "Limited farmland in the Aravalli region",
];

export default function RoiDividendInsightSection() {
  return (
    <section className="w-full bg-[#5C6E56] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden select-none">
      <div className="container max-w-[760px] px-4 sm:px-6">
        
        {/* ====================================================== */}
        {/* CENTERED CREAM CARD CONTAINER                          */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#FAF9F5] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 shadow-md flex flex-col space-y-5 sm:space-y-6"
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
              ROI &amp; FOREST DIVIDEND INSIGHT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[32px] md:text-[38px] leading-[1.18] tracking-[-0.01em]">
            The Forest Dividend - Beyond Traditional Returns.
          </h2>

          {/* Description */}
          <p className="text-[#313116] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-normal">
            Land that offers more than ownership - a place to use, enjoy and hold
            for the long term.
          </p>

          {/* Why It Matters Header */}
          <div className="pt-1">
            <h3 className="font-sans font-semibold text-[#1F2922] text-[16px] sm:text-[17px] mb-3">
              Why It Matters
            </h3>

            {/* Checklist items */}
            <ul className="flex flex-col space-y-3">
              {WHY_IT_MATTERS_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#313116]">
                  <span className="text-[#2F3827] font-bold text-[14px] sm:text-[15px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="font-sans text-[14px] sm:text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concluding Italic Quote */}
          <p className="font-sans italic text-[#555E4E] text-[14px] sm:text-[15px] leading-relaxed pt-2">
            Because the strongest assets aren&apos;t only those that grow in
            numbers - they&apos;re the ones families continue to use, return to,
            and value over time.
          </p>

          {/* WhatsApp CTA Button */}
          <div className="pt-2 sm:pt-4">
            <Link
              href="https://wa.me/919589585050"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[15px] sm:text-[16px] px-8 sm:px-9 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95"
            >
              Discuss My Investment On WhatsApp
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
