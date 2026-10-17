"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export default function NirvaanaHillsHero() {
  return (
    <section
      id="nirvaana-hills-hero"
      className="w-full bg-[#62735B] py-14 sm:py-16 md:py-20 lg:py-24 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Action CTAs                   */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6 md:space-y-7"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-white/90">
              <FarmIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px] whitespace-nowrap">
                NIRVAANA HILLS
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] tracking-[-0.01em]">
              More Than Farmland.
              <br />
              A 200-Acre Thoughtfully Planned, Nature-Led Community.
            </h1>

            {/* Narrative Body */}
            <p className="font-sans text-white/90 text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-2xl font-normal">
              Nirvaana Hills is a farmland community near Delhi & Gurgaon, built
              around family, wellness, meaningful experiences, and long-term
              belonging - not simply a parcel of land, but a place designed to
              give ownership a larger purpose: a reason to return, reconnect, and
              spend better time with the people who matter most.
            </p>

            {/* Tagline */}
            <p className="font-serif italic text-white/80 text-[15px] sm:text-[17px] font-normal">
              A Forest Crafted For Living.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2 sm:pt-4">
              <Link
                href="/contact-us#enquiry"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 inline-flex items-center justify-center shadow-xs active:scale-95"
              >
                Book A Site Visit
              </Link>

              {/* Secondary CTA: Explore The Community Vision */}
              <div className="flex flex-col items-start">
                <Link
                  href="/about-seed#founder-vision"
                  className="inline-flex items-center gap-1.5 text-white hover:text-white/90 font-sans text-[12px] md:text-[16px] font-normal transition-colors group"
                >
                  <span>Explore The Community Vision</span>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {/* Decorative Pill Accent */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <div className="w-8 h-[2px] rounded-full bg-primary" />
                </div>
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
            className="lg:col-span-5 w-full"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.3] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/nirvaana-hills/hero.webp"
                alt="Nirvaana Hills 200-Acre Nature-Led Community"
                fill
                priority
                unoptimized
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
