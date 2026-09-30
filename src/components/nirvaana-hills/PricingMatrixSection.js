"use client";

import React from "react";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

const PRICING_DATA = [
  {
    id: "size-1",
    farmlandSize: "1,613 Sq Yd",
    area: "⅓ Acre",
    trees: "101 Trees",
    pricing: "₹1.29 Cr*",
  },
  {
    id: "size-2",
    farmlandSize: "2,420 Sq Yd",
    area: "½ Acre",
    trees: "150 Trees",
    pricing: "₹1.93 Cr*",
  },
  {
    id: "size-3",
    farmlandSize: "4,840 Sq Yd",
    area: "1 Acre",
    trees: "301 Mature Trees",
    pricing: "₹3.87 Cr*",
  },
];

export default function PricingMatrixSection() {
  return (
    <section
      id="pricing"
      className="w-full bg-[#FAF9F5] py-10 sm:py-12 md:py-14 lg:py-16 overflow-hidden select-none relative"
    >
      <div id="price" className="absolute top-0 pointer-events-none" />
      <div className="container max-w-[900px] px-4 sm:px-6">
        
        {/* ====================================================== */}
        {/* SECTION HEADER                                         */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-9"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-secondary">
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-secondary" />
            <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap">
              PRICE
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] tracking-[-0.01em]">
            Scarce Land.
            <br />
            Strategic Location.
            <br />
            An Attractive Entry Point.
          </h2>

          {/* Subtitle Highlight */}
          <p className="font-sans font-semibold text-[#1F2922] text-[15px] sm:text-[17px] md:text-[19px] pt-1">
            Phase 2 ownership starts at ₹1.29 Cr*
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* FARM SIZES & TREE ALLOCATION TABLE                     */}
        {/* Maintained identically on mobile & desktop             */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col"
        >
          {/* Table Group Heading */}
          <h3 className="font-sans font-normal text-[#313116] text-[15px] sm:text-[17px] md:text-[18px] mb-3 sm:mb-4">
            Farm Sizes &amp; Tree Allocation
          </h3>

          {/* Table Container */}
          <div className="w-full flex flex-col">
            
            {/* Table Header Pill */}
            <div className="w-full bg-[#E5E8D8] rounded-[12px] sm:rounded-[16px] px-3 sm:px-5 py-3 sm:py-4 grid grid-cols-4 items-center text-center">
              <span className="font-serif text-[#1F2922] text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] font-normal">
                Farmland Size
              </span>
              <span className="font-serif text-[#1F2922] text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] font-normal">
                Area
              </span>
              <span className="font-serif text-[#1F2922] text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] font-normal">
                Trees Planted
              </span>
              <span className="font-serif text-[#1F2922] text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] font-normal">
                Pricing
              </span>
            </div>

            {/* Table Body Rows with dashed dividers */}
            <div className="w-full flex flex-col divide-y divide-dashed divide-[#313116]/25">
              {PRICING_DATA.map((row) => (
                <div
                  key={row.id}
                  className="w-full grid grid-cols-4 items-center text-center py-4 sm:py-5 md:py-6 px-2 sm:px-4"
                >
                  {/* Farmland Size */}
                  <span className="font-sans text-[#313116] text-[12px] xs:text-[14px] sm:text-[16px] md:text-[17px] font-normal">
                    {row.farmlandSize}
                  </span>

                  {/* Area */}
                  <span className="font-sans text-[#313116] text-[12px] xs:text-[14px] sm:text-[16px] md:text-[17px] font-normal">
                    {row.area}
                  </span>

                  {/* Trees Planted */}
                  <span className="font-sans text-[#313116] text-[12px] xs:text-[14px] sm:text-[16px] md:text-[17px] font-normal leading-tight">
                    {row.trees}
                  </span>

                  {/* Pricing */}
                  <span className="font-sans text-[#313116] text-[12px] xs:text-[14px] sm:text-[16px] md:text-[17px] font-normal">
                    {row.pricing}
                  </span>
                </div>
              ))}
              {/* Bottom dashed border */}
              <div className="w-full border-b border-dashed border-[#313116]/25" />
            </div>
          </div>

          {/* Table Concluding Note */}
          <p className="text-[#313116] text-[13px] xs:text-[14px] sm:text-[16px] leading-relaxed pt-5 sm:pt-6 font-normal">
            Every farm comes with a dedicated boundary plantation for a private
            green setting. Limited Phase 2 availability
          </p>
        </motion.div>
      </div>
    </section>
  );
}
