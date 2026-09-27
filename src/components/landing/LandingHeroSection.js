"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function LandingHeroSection() {
  return (
    <section
      id="landing-hero"
      className="w-full bg-[#FAF9F5] pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 overflow-hidden text-[#1F2922] select-none"
    >
      <div className="container max-w-[1200px] px-4 sm:px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#E5EAD9] text-[#2F3E28] border border-[#D5DFC6] shadow-2xs mb-6 sm:mb-8"
          >
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 text-[#3B4D33]" />
            <span className="font-semibold tracking-[0.14em] uppercase text-[11px] sm:text-[12px] whitespace-nowrap">
              PHASE 2 &middot; NOW OPEN &middot; LIMITED FARMLANDS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[34px] sm:text-[42px] md:text-[50px] lg:text-[56px] leading-[1.12] tracking-[-0.015em] mb-4 sm:mb-5"
          >
            Real Estate ka FD i.e.
            <br />
            Forest Dividend
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-1 font-sans text-[13.5px] sm:text-[14.5px] md:text-[15.5px] text-[#4A5546] leading-relaxed max-w-xl mx-auto"
          >
            <p className="font-normal text-[#1F2922]">
              Where the Aravallis Become Your Address
            </p>
            <p className="text-[#556051]">
              Own your piece of nature in the heart of the Aravallis.
            </p>
          </motion.div>
        </div>

        {/* Dual Hero Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 items-center max-w-[740px] mx-auto mt-8 sm:mt-10 md:mt-12"
        >
          {/* Left Image (Taller Aspect Ratio) */}
          <div className="relative aspect-[9/15] sm:aspect-[1/1.55] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden shadow-md bg-[#232F20]/5 group">
            <Image
              src="/landing/hero-left.webp"
              alt="Nirvaana Hills Luxury Farmhouse Architecture"
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 370px"
            />
          </div>

          {/* Right Image */}
          <div className="relative aspect-[3/3.8] sm:aspect-[4/5] rounded-[18px] sm:rounded-[24px] md:rounded-[28px] overflow-hidden shadow-md bg-[#232F20]/5 group">
            <Image
              src="/landing/hero-right.webp"
              alt="Nirvaana Hills Green Aravalli Rolling Farmlands"
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 370px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
