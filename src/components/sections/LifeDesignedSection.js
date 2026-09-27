"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

const AUTOPLAY_IMAGES = [
  { id: "img-1", src: "/homepage/autoplay-section/1.webp", alt: "Life at Nirvaana Hills 1" },
  { id: "img-2", src: "/homepage/autoplay-section/2.webp", alt: "Life at Nirvaana Hills 2" },
  { id: "img-3", src: "/homepage/autoplay-section/3.webp", alt: "Life at Nirvaana Hills 3" },
  { id: "img-4", src: "/homepage/autoplay-section/4.webp", alt: "Life at Nirvaana Hills 4" },
  { id: "img-5", src: "/homepage/autoplay-section/5.webp", alt: "Life at Nirvaana Hills 5" },
];

export default function LifeDesignedSection() {
  // Duplicate for seamless infinite sliding
  const carouselItems = [...AUTOPLAY_IMAGES, ...AUTOPLAY_IMAGES, ...AUTOPLAY_IMAGES];

  return (
    <section
      id="life-designed-differently"
      className="w-full bg-[#62735B] py-14 sm:py-16 md:py-24 lg:py-32 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-white/90 text-center">
            <FarmIcon className="w-4 h-4 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
              LIFE HERE IS DESIGNED DIFFERENTLY
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white tracking-[-0.01em]">
            Imagine A Saturday Morning Your
            <br />
            Family Actually Remembers.
          </h2>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* SEAMLESS AUTOPLAY SLIDESHOW TRACK                         */}
      {/* ======================================================== */}
      <div className="relative w-full overflow-hidden my-6 sm:my-8 md:my-10">
        <motion.div
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex items-center gap-4 sm:gap-6 md:gap-8 w-max will-change-transform"
        >
          {carouselItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[210px] h-[280px] xs:w-[240px] xs:h-[320px] sm:w-[280px] sm:h-[370px] md:w-[320px] md:h-[420px] lg:w-[360px] lg:h-[460px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-[#2A3426] ring-1 ring-white/10"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* NARRATIVE STATEMENT & EXPLORE CTA                         */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="container max-w-[860px] px-4 sm:px-6 mx-auto flex flex-col items-center text-center mt-8 sm:mt-10 md:mt-12 space-y-6 sm:space-y-8"
      >
        <p className="text-[#FAF9F5] text-[13px] sm:text-[14px] md:text-[15.5px] font-normal leading-relaxed max-w-2xl mx-auto">
          Children running outdoors instead of scrolling phones. Parents walking
          beneath the trees. Friends around the bonfire. A quiet corner to
          read. A place to host, to celebrate, to simply be.
        </p>

        <Link
          href="/gallery"
          className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-[14px] md:rounded-[16px] bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] font-normal text-[12px] md:text-[16px] transition-all duration-300 shadow-md shadow-black/10 hover:shadow-lg active:scale-[0.98] no-underline"
        >
          Explore Life At Nirvaana Hills
        </Link>
      </motion.div>

      {/* ======================================================== */}
      {/* PART 2: BUILT BY A LEGACY OF TRUST                       */}
      {/* ======================================================== */}
      <div className="container max-w-[1400px] px-4 sm:px-6 mt-16 sm:mt-24 md:mt-32 lg:mt-36 pt-4">
        {/* Mobile View (< 1024px): Stacked Layout */}
        <div className="flex flex-col space-y-6 sm:space-y-8 lg:hidden max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center space-y-3 sm:space-y-4"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center justify-center gap-2 text-white/90 text-center">
              <FarmIcon className="w-4 h-4 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px] whitespace-nowrap">
                BUILT BY TRUST
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-white tracking-[-0.01em]">
              Built By A Legacy Of Trust.
            </h2>

            {/* Narrative Paragraph */}
            <p className="text-white/95 font-normal text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed text-center pt-1">
              For 20+ years, SEAD Realty has helped Delhi families build
              meaningful ownership journeys. Over time, what people wanted
              changed - cleaner air, healthier lifestyles, long-term
              appreciating assets, a better quality of life for the next
              generation. Nirvaana Hills is our answer: a new way to own
              nature itself.
            </p>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg isolate bg-[#2A3426] ring-1 ring-white/10"
          >
            <Image
              src="/homepage/legacy-of-trust.avif"
              alt="Built By A Legacy Of Trust - SEAD Realty and Nirvaana Hills"
              fill
              unoptimized
              className="object-cover grayscale contrast-105"
            />
          </motion.div>
        </div>

        {/* Desktop View (>= 1024px): 2-Column Split Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
          {/* Left Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-6 max-w-xl"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-white/90">
              <FarmIcon className="w-4 h-4 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
                BUILT BY TRUST
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-white tracking-[-0.01em]">
              Built By A Legacy Of Trust.
            </h2>

            {/* Narrative Paragraph */}
            <p className="text-white/95 font-normal text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed">
              For 20+ years, SEAD Realty has helped Delhi families build
              meaningful ownership journeys. Over time, what people wanted
              changed - cleaner air, healthier lifestyles, long-term
              appreciating assets, a better quality of life for the next
              generation. Nirvaana Hills is our answer: a new way to own
              nature itself.
            </p>
          </motion.div>

          {/* Right Column: Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <div className="relative w-full aspect-[16/11] xl:aspect-[16/10] rounded-3xl overflow-hidden shadow-xl isolate bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/homepage/legacy-of-trust.avif"
                alt="Built By A Legacy Of Trust - SEAD Realty and Nirvaana Hills"
                fill
                unoptimized
                className="object-cover grayscale contrast-105 transition-transform duration-700 hover:scale-103"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
