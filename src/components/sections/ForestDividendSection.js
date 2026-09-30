"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

const HIGHLIGHTS = [
  "Freehold Land Ownership",
  "Approx. 8% Rental Yield Potential",
  "Nature-Protected Long-Term Asset for Generations",
  "40-50% Appreciation Potential in 3 years.",
];

export default function ForestDividendSection() {
  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    console.log("Download Brochure clicked");
  };

  return (
    <section
      id="forest-dividend"
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* MOBILE VIEW (< 1024px): Stacked Layout                   */}
        {/* ======================================================== */}
        <div className="flex flex-col space-y-6 md:space-y-8 lg:hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center space-y-2.5"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-secondary">
              <FarmIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-secondary" />
              <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase">
                THE FOREST DIVIDEND
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] tracking-[-0.01em]">
              F.D. Doesn&apos;t Always Mean
              <br />
              Fixed Deposit.
            </h2>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[4/4.8] sm:aspect-[4/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm isolate bg-[#1F2518]"
          >
            <Image
              src="/homepage/sec6.avif"
              alt="Nirvaana Hills Farmland and Forest Dividend"
              fill
              unoptimized
              className="object-cover"
            />
          </motion.div>

          {/* Description & Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col space-y-5 text-left"
          >
            <p className="text-[#313116] text-[13.5px] sm:text-[14.5px] leading-[1.65]">
              At Nirvaana Hills, F.D. means Forest Dividend. Surrounded by
              9,600+ acres of forest, this is a managed farmland opportunity
              built for ~8% annual rental yield while preserving long-term
              ownership value.
            </p>

            {/* Checkmark List */}
            <ul className="flex flex-col space-y-2.5">
              {HIGHLIGHTS.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-[#313116] text-[13.5px] sm:text-[14.5px]"
                >
                  <Check className="w-4 h-4 text-[#5D6B38] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Download Brochure CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="w-fit inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] shadow-xs hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= 1024px): 2-Column Split Layout          */}
        {/* ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
          {/* Left Column: Nature Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <div className="relative w-full aspect-[4/4.5] xl:aspect-[4/4.3] rounded-3xl overflow-hidden shadow-md isolate bg-[#1F2518]">
              <Image
                src="/homepage/sec6.avif"
                alt="Nirvaana Hills Farmland and Forest Dividend"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 hover:scale-103"
              />
            </div>
          </motion.div>

          {/* Right Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-6 max-w-xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-secondary">
              <FarmIcon className="w-4 h-4 shrink-0 text-secondary" />
              <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase">
                THE FOREST DIVIDEND
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] lg:text-[38px] tracking-[-0.01em]">
              F.D. Doesn&apos;t Always Mean
              <br />
              Fixed Deposit.
            </h2>

            {/* Paragraph */}
            <p className="text-[#313116] text-[14.5px] md:text-[15.5px] leading-[1.65]">
              At Nirvaana Hills, F.D. means Forest Dividend. Surrounded by
              9,600+ acres of forest, this is a managed farmland opportunity
              built for ~8% annual rental yield while preserving long-term
              ownership value.
            </p>

            {/* Checkmark List */}
            <ul className="flex flex-col space-y-3 pt-1">
              {HIGHLIGHTS.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-[#313116] text-[14px] md:text-[15px]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#AFEB63]/25 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#3A461E] stroke-[2.8]" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleDownloadBrochure}
                className="inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                Download Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
