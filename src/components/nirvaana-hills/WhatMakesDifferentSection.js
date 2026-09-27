"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

// ========================================================
// STACKING CARDS DATA
// ========================================================
export const DIFFERENT_CARDS = [
  {
    id: "card-1",
    title: "360° Aravalli views",
    image: "/nirvaana-hills/360-arravali.avif",
    alt: "360 Degree Aravalli views at Nirvaana Hills",
  },
  {
    id: "card-2",
    title: "A single integrated 200-acre community, not scattered parcels",
    image: "/nirvaana-hills/singleintegrated.webp",
    alt: "Single integrated 200-acre farmland community",
  },
  {
    id: "card-3",
    title: "1 lakh+ trees forming a living forest ecosystem",
    image: "/nirvaana-hills/1-lakh-tree.avif",
    alt: "1 lakh plus trees living forest ecosystem",
  },
  {
    id: "card-4",
    title: "Golf range and a clubhouse experience",
    image: "/nirvaana-hills/golf-range.avif",
    alt: "Golf range and clubhouse experience at Nirvaana Hills",
  },
  {
    id: "card-5",
    title: "2 hours from Delhi & Gurgaon",
    image: "/nirvaana-hills/2hourdrivefromdelhi.avif",
    alt: "2 hours drive from Delhi and Gurgaon",
  },
  {
    id: "card-6",
    title: "33-ft internal roads",
    image: "/nirvaana-hills/33ft-road.avif",
    alt: "33-ft wide internal roads",
  },
  {
    id: "card-7",
    title: "Solar-powered sustainable infrastructure",
    image: "/nirvaana-hills/solar-powered.avif",
    alt: "Solar-powered sustainable infrastructure",
  },
  {
    id: "card-8",
    title: "Surrounded by 9,600+ acres of forest",
    image: "/nirvaana-hills/sorrounded-by.avif",
    alt: "Surrounded by 9,600 plus acres of natural forest",
  },
];

export default function WhatMakesDifferentSection() {
  return (
    <section
      id="different"
      className="w-full bg-[#FAF9F5] py-12 sm:py-14 md:py-16 lg:py-20 overflow-visible select-none"
    >
      <div className="container max-w-[1200px] px-4 sm:px-6">
        
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12 md:mb-14 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-secondary text-center">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px] whitespace-nowrap">
              WHAT MAKES NIRVAANA HILLS DIFFERENT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] tracking-[-0.01em]">
            Land Can Be Owned.
            <br />
            A Place Must Be Lived.
          </h2>

          {/* Description */}
          <p className="text-[#313116] text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed max-w-2xl text-center font-normal">
            Raw farmland offers possession - but possession alone doesn&apos;t
            create usage. Nirvaana Hills brings land, planning, infrastructure,
            accessibility, community, and long-term vision into one integrated
            ecosystem.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* COMPLETE OVERLAPPING STACKING CARDS CONTAINER           */}
        {/* (All cards are direct children of the same parent)      */}
        {/* ======================================================== */}
        <div className="relative max-w-[680px] md:max-w-[760px] mx-auto flex flex-col pb-6 sm:pb-8 md:pb-10">
          {DIFFERENT_CARDS.map((card, index) => {
            const isLast = index === DIFFERENT_CARDS.length - 1;

            return (
              <div
                key={card.id}
                style={{ zIndex: index + 1 }}
                className={`sticky top-20 sm:top-24 md:top-28 w-full ${
                  !isLast ? "mb-8 sm:mb-12 md:mb-16" : "mb-0"
                }`}
              >
                <div className="w-full h-[275px] xs:h-[300px] sm:h-[350px] md:h-[390px] rounded-[22px] sm:rounded-[28px] bg-[#E5E8D8] p-4 sm:p-6 md:p-7 border border-black/5 shadow-none flex flex-col justify-between">
                  {/* Card Title with uniform height to prevent top/bottom shifts */}
                  <div className="h-[44px] sm:h-[52px] flex items-center shrink-0 mb-2.5 sm:mb-3">
                    <h3 className="font-serif !font-normal text-[#1F2922] text-[16px] xs:text-[18px] sm:text-[21px] md:text-[23px] leading-snug line-clamp-2">
                      {card.title}
                    </h3>
                  </div>

                  {/* Card Image with uniform flex fill */}
                  <div className="flex-1 w-full relative rounded-[15px] sm:rounded-[18px] overflow-hidden bg-[#242A1F] shadow-none">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 760px"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* CONCLUDING PHILOSOPHY LINE                               */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto pt-4 sm:pt-6 md:pt-8 pb-2 px-2"
        >
          <p className="font-sans italic text-[#353D2C] text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.65]">
            Because for many families, value isn&apos;t only what they own -
            it&apos;s how often they return to it, and how naturally it becomes
            part of life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
