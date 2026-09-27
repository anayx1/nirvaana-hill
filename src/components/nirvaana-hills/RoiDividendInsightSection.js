"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RoiCalculatorModal from "@/components/modals/RoiCalculatorModal";

const WHY_IT_MATTERS_ITEMS = [
  "Freehold land ownership",
  "Growing NCR connectivity with Gurgaon-Jhajjar Highway/ UER-2/ NH-352W/ NH-148B/ NH-152D/ NH-334B-/ Jhajjar- Charkhi Dadri Highway.",
  "40-50% long-term appreciation in 3 years",
  "Weekend & lifestyle value",
  "Limited farmland in the Aravalli region",
];

export default function RoiDividendInsightSection() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section
      id="roi"
      className="w-full bg-[#5C6E56] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden select-none scroll-mt-12"
    >
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
            <Image
              src="/farm.svg"
              alt="farm"
              width={18}
              height={18}
              className="w-4 h-4 md:w-5 md:h-5 shrink-0 [filter:brightness(0)_saturate(100%)_invert(47%)_sepia(18%)_saturate(1175%)_hue-rotate(37deg)_brightness(94%)_contrast(89%)]"
            />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase whitespace-nowrap">
              ROI &amp; FOREST DIVIDEND INSIGHT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[22px] sm:text-[26px] md:text-[30px] leading-[1.18] tracking-[-0.01em]">
            The Forest Dividend - Beyond Traditional Returns.
          </h2>

          {/* Description */}
          <p className="text-[#313116] text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed font-normal">
            Land that offers more than ownership - a place to use, enjoy and hold
            for the long term.
          </p>

          {/* Why It Matters Header */}
          <div className="pt-1">
            <h3 className="font-sans font-medium text-[#1F2922] text-[14px] sm:text-[15px] mb-2.5">
              Why It Matters
            </h3>

            {/* Checklist items */}
            <ul className="flex flex-col space-y-2.5">
              {WHY_IT_MATTERS_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[#313116]">
                  <span className="text-[#2F3827] font-bold text-[13px] sm:text-[14px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="font-sans text-[13px] sm:text-[14px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concluding Italic Quote */}
          <p className="font-sans italic text-[#555E4E] text-[13px] sm:text-[14px] leading-relaxed pt-1">
            Because the strongest assets aren&apos;t only those that grow in
            numbers - they&apos;re the ones families continue to use, return to,
            and value over time.
          </p>

          {/* Interactive Calculator Trigger CTA */}
          <div className="pt-2 sm:pt-3">
            <button
              type="button"
              onClick={() => setIsCalculatorOpen(true)}
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95 cursor-pointer"
            >
              Calculate Your Forest Dividend &amp; ROI
            </button>
          </div>
        </motion.div>
      </div>

      {/* ROI Calculator Modal */}
      <RoiCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
}
