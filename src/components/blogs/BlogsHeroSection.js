"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function BlogsHeroSection() {
  return (
    <section
      id="blogs-hero"
      className="w-full bg-[#62735B] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Action CTA                    */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-white/90">
              <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
                BLOGS
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
              Explore. Understand. Decide Better.
            </h1>

            {/* Narrative Paragraph */}
            <p className="font-sans text-white/90 text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-xl font-normal">
              Explore Nirvaana Hills through stories, ideas, updates, and
              perspectives designed to help you understand ownership, lifestyle,
              nature, and long-term value more clearly.
            </p>

            {/* Tagline */}
            <p className="font-sans italic text-white/85 text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.6] font-normal">
              Because meaningful decisions deserve deeper understanding.
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <Link
                href="#articles"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
              >
                Explore Articles
              </Link>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Hero Image                               */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full aspect-[4/3.2] sm:aspect-[16/11] lg:aspect-[4/3.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/blogs/hero.webp"
                alt="Explore Nirvaana Hills Stories, Ideas, and Insights"
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
