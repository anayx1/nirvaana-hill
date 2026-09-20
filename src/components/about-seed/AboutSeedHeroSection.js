"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function AboutSeedHeroSection() {
  return (
    <section
      id="about-seed-hero"
      className="w-full bg-[#62735B] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Link                          */}
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
              <Home className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
              <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
                ABOUT SEAD
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.15] tracking-[-0.01em]">
              Building More Than Land.
              <br />
              Creating A Legacy Rooted In Purpose.
            </h1>

            {/* Narrative Body */}
            <p className="font-sans text-white/90 text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[1.65] max-w-xl font-normal">
              Every meaningful place begins with a belief. At SEAD Realty, our
              work extends far beyond development - we believe land should
              create lasting value for families, communities, nature, and future
              generations.
            </p>

            {/* Read More Link & Pill Indicator */}
            <div className="pt-2 flex flex-col items-start group">
              <Link
                href="#story-of-sead"
                className="font-sans italic text-[22px] sm:text-[26px] md:text-[28px] text-white/95 group-hover:text-white transition-opacity inline-block tracking-tight"
              >
                read more
              </Link>
              {/* Decorative Pill Accent */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <div className="w-10 h-[3px] rounded-full bg-primary" />
              </div>
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
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/about-seed/hero.webp"
                alt="Building More Than Land - SEAD Realty"
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
