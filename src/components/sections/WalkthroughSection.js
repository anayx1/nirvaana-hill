"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// ========================================================
// 5 ORBIT IMAGES (Mathematically positioned on R = 38%)
// Orbit center: (50%, 50%), Orbit Ring: width/height = 76% (inset 12%)
// ========================================================
const ORBIT_ITEMS = [
  {
    id: "orbit-img-1",
    src: "/homepage/orbit-section/1.webp",
    alt: "Nirvaana Hills Architecture and Clubhouse",
    // Top-Right: -30 deg
    x: 82.9,
    y: 31.0,
    sizeClass:
      "w-[76px] h-[76px] xs:w-[88px] xs:h-[88px] sm:w-[120px] sm:h-[120px] md:w-[155px] md:h-[155px] lg:w-[185px] lg:h-[185px]",
    roundedClass: "rounded-xl sm:rounded-2xl md:rounded-3xl",
    floatDelay: 0,
    floatDuration: 5.2,
    entryDelay: 0.15,
  },
  {
    id: "orbit-img-2",
    src: "/homepage/orbit-section/2.webp",
    alt: "Green Pathway and Jogging Trails",
    // Mid-Right: +35 deg
    x: 81.1,
    y: 71.8,
    sizeClass:
      "w-[72px] h-[80px] xs:w-[82px] xs:h-[92px] sm:w-[110px] sm:h-[125px] md:w-[145px] md:h-[165px] lg:w-[170px] lg:h-[195px]",
    roundedClass: "rounded-xl sm:rounded-2xl md:rounded-3xl",
    floatDelay: 0.7,
    floatDuration: 5.8,
    entryDelay: 0.3,
  },
  {
    id: "orbit-img-3",
    src: "/homepage/orbit-section/3.webp",
    alt: "Forest Nature and Wellness",
    // Bottom-Center: +90 deg
    x: 50.0,
    y: 88.0,
    sizeClass:
      "w-[76px] h-[76px] xs:w-[88px] xs:h-[88px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]",
    roundedClass: "rounded-xl sm:rounded-2xl md:rounded-3xl",
    floatDelay: 1.3,
    floatDuration: 5.4,
    entryDelay: 0.45,
  },
  {
    id: "orbit-img-4",
    src: "/homepage/orbit-section/4.webp",
    alt: "Sunset Gathering and Community",
    // Bottom-Left: +155 deg
    x: 15.6,
    y: 66.1,
    sizeClass:
      "w-[72px] h-[80px] xs:w-[82px] xs:h-[92px] sm:w-[110px] sm:h-[125px] md:w-[145px] md:h-[165px] lg:w-[170px] lg:h-[195px]",
    roundedClass: "rounded-xl sm:rounded-2xl md:rounded-3xl",
    floatDelay: 1.9,
    floatDuration: 6.2,
    entryDelay: 0.6,
  },
  {
    id: "orbit-img-5",
    src: "/homepage/orbit-section/5.webp",
    alt: "Outdoor Recreation and Lawn Games",
    // Top-Left: +215 deg (-145 deg)
    x: 18.9,
    y: 28.2,
    sizeClass:
      "w-[76px] h-[76px] xs:w-[88px] xs:h-[88px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]",
    roundedClass: "rounded-xl sm:rounded-2xl md:rounded-3xl",
    floatDelay: 1.1,
    floatDuration: 5.6,
    entryDelay: 0.75,
  },
];

export default function WalkthroughSection({
  buttonUrl = "",
  videoUrl,
  buttonText = "WATCH THE WALKTHROUGH",
  className = "",
}) {
  const targetUrl = buttonUrl || videoUrl || "";

  return (
    <section
      id="walkthrough-vision"
      className={`w-full bg-[#FAF9F5] py-14 sm:py-16 md:py-24 lg:py-32 overflow-hidden select-none ${className}`}
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
          className="flex flex-col items-center text-center space-y-3 md:space-y-4 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          {/* Eyebrow / Tag */}
          <div className="flex items-center gap-2 text-secondary">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 md:w-5 md:h-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M12 3l-8 7h16l-8-7z" />
              <path d="M5 14c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
              <path d="M5 19c2.5-1.5 5-1.5 7 0s4.5 1.5 7 0" />
            </svg>
            <span className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold tracking-[0.14em] uppercase">
              WALK THROUGH THE FUTURE
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] !text-[32px] sm:!text-[40px] md:!text-[48px] lg:!text-[56px] leading-[1.12] tracking-[-0.01em]">
            Imagine What’s Coming.
            <br />
            Walk Through The Vision.
          </h2>

          {/* Subheading Narrative */}
          <p className="text-[#313116] text-[15px] sm:text-[17px] md:text-[19px] font-normal leading-relaxed max-w-2xl pt-1 text-center">
            See Nirvaana Hills as it is being brought to life. Take a visual
            journey through the roads, farms, green spaces, clubhouse,
            experiences and everyday moments that are shaping the future of the
            community.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* ORBIT VISUAL CONTAINER                                   */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[560px] md:max-w-[700px] lg:max-w-[800px] mx-auto aspect-square flex items-center justify-center">
          {/* Orbital Circle Ring Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[12%] left-[12%] w-[76%] h-[76%] rounded-full border border-[#9EB84E]/35 pointer-events-none"
          />

          {/* Center Button */}
          <motion.a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 120,
              delay: 0.1,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-20 w-[120px] h-[120px] xs:w-[135px] xs:h-[135px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] rounded-full bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] flex flex-col items-center justify-center p-3 sm:p-5 text-center shadow-lg shadow-[#AFEB63]/25 transition-colors cursor-pointer group no-underline"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-[#1F2922] stroke-none shrink-0 transition-transform group-hover:scale-110" />
              <span className="font-sans font-semibold text-[9px] xs:text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] tracking-[0.08em] uppercase text-[#1F2922] leading-tight">
                {buttonText}
              </span>
            </div>
          </motion.a>

          {/* 5 Floating Orbit Images */}
          {ORBIT_ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: `${item.y}%`,
                left: `${item.x}%`,
              }}
              className="z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 110,
                  delay: item.entryDelay,
                }}
              >
                {/* Floating Animation Wrapper */}
                <motion.div
                  animate={{
                    y: [0, -5, 0, 5, 0],
                    rotate: [0, 1, 0, -1, 0],
                  }}
                  transition={{
                    duration: item.floatDuration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: item.floatDelay,
                  }}
                  className={`relative ${item.sizeClass} ${item.roundedClass} overflow-hidden shadow-md shadow-black/10 bg-[#1F2518] ring-1 ring-black/5`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 hover:scale-108"
                  />
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
