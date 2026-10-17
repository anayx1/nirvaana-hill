"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const BEYOND_EDUCATION_IMAGES = [
  {
    id: "carousel-1",
    src: "/about-seed/carousal-1.webp",
    alt: "Naya Sawera Public School Children Craft and Learning",
  },
  {
    id: "carousel-2",
    src: "/about-seed/carousal-2.webp",
    alt: "Muskaan Care Foundation School Children Waving",
  },
];

export default function BeyondEducationSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat items for seamless continuous marquee looping
  const loopedImages = [
    ...BEYOND_EDUCATION_IMAGES,
    ...BEYOND_EDUCATION_IMAGES,
    ...BEYOND_EDUCATION_IMAGES,
    ...BEYOND_EDUCATION_IMAGES,
    ...BEYOND_EDUCATION_IMAGES,
    ...BEYOND_EDUCATION_IMAGES,
  ];

  return (
    <section
      id="beyond-education"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none overflow-hidden"
    >
      <div className="container max-w-[860px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-6 sm:space-y-7 md:space-y-8"
        >
          {/* ====================================================== */}
          {/* NARRATIVE HEADER                                       */}
          {/* ====================================================== */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h2 className="font-serif !font-normal text-[#1F2922] text-[18px] sm:text-[20px] md:text-[22px] tracking-tight">
              Beyond Education
            </h2>

            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
            >
              Plantation Drives· Project Human Aid – Rabb Da Dhaba · Blood &amp;
              Clothes Donation Drives · Project Waqif Awareness Campaigns ·
              Large-Scale COVID Relief
            </p>

            <p className="font-sans font-medium text-[#1F2922] text-[14px] sm:text-[15px] md:text-[16px] pt-1">
              Because meaningful success creates responsibility.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ====================================================== */}
      {/* FULL-WIDTH BLEED AUTOPLAY CAROUSEL WITH EDGE GRADIENTS */}
      {/* ====================================================== */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full overflow-hidden py-4 my-2"
      >
        {/* Left Viewport Edge Fade Mask */}
        <div
          style={{
            background:
              "linear-gradient(to right, #FAF9F5 0%, #FAF9F5 15%, rgba(250, 249, 245, 0.85) 45%, rgba(250, 249, 245, 0) 100%)",
          }}
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 pointer-events-none z-20"
        />

        {/* Right Viewport Edge Fade Mask */}
        <div
          style={{
            background:
              "linear-gradient(to left, #FAF9F5 0%, #FAF9F5 15%, rgba(250, 249, 245, 0.85) 45%, rgba(250, 249, 245, 0) 100%)",
          }}
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-36 pointer-events-none z-20"
        />

        {/* Continuous Horizontal Marquee Track */}
        <motion.div
          animate={isPaused ? { x: undefined } : { x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 18,
          }}
          className="flex gap-4 sm:gap-6 w-max will-change-transform pl-4"
        >
          {loopedImages.map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              className="relative w-[180px] xs:w-[210px] sm:w-[240px] md:w-[260px] aspect-[3/4.2] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-lg bg-[#E4EAD9] ring-1 ring-black/5 shrink-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 640px) 210px, 260px"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container max-w-[860px] px-4 sm:px-6">
        {/* ====================================================== */}
        {/* CTA BUTTON                                             */}
        {/* ====================================================== */}
        <div className="pt-2 sm:pt-4">
          <Link
            href="https://muskaancare.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
          >
            Explore The Foundation
          </Link>
        </div>
      </div>
    </section>
  );
}
