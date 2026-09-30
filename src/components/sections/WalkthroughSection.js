"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

// ========================================================
// 5 ORBIT IMAGES (Balanced orbital distribution matching design)
// ========================================================
const ORBIT_ITEMS = [
  {
    id: "orbit-img-clubhouse",
    src: "/homepage/orbit-section/1.webp",
    alt: "Nirvaana Hills Architecture and Clubhouse",
    // Top-Right: ~1:15 o'clock (Hero prominent image)
    x: 72.0,
    y: 15.0,
    sizeClass:
      "w-[102px] h-[90px] xs:w-[114px] xs:h-[100px] sm:w-[150px] sm:h-[132px] md:w-[180px] md:h-[158px] lg:w-[205px] lg:h-[180px]",
    roundedClass: "rounded-2xl md:rounded-3xl",
    floatDelay: 1.2,
    floatDuration: 3.8,
    entryDelay: 0.1,
  },
  {
    id: "orbit-img-kids",
    src: "/homepage/orbit-section/5.webp",
    alt: "Outdoor Recreation and Lawn Games",
    // Top-Left: ~10:30 o'clock
    x: 20.0,
    y: 28.0,
    sizeClass:
      "w-[82px] h-[82px] xs:w-[92px] xs:h-[92px] sm:w-[120px] sm:h-[120px] md:w-[145px] md:h-[145px] lg:w-[170px] lg:h-[170px]",
    roundedClass: "rounded-2xl md:rounded-3xl",
    floatDelay: 0,
    floatDuration: 3.6,
    entryDelay: 0.2,
  },
  {
    id: "orbit-img-sunset",
    src: "/homepage/orbit-section/4.webp",
    alt: "Sunset Gathering and Community",
    // Mid-Left: ~8:00 o'clock (Edge position)
    x: 9.0,
    y: 66.0,
    sizeClass:
      "w-[82px] h-[90px] xs:w-[92px] xs:h-[100px] sm:w-[120px] sm:h-[130px] md:w-[145px] md:h-[156px] lg:w-[170px] lg:h-[182px]",
    roundedClass: "rounded-2xl md:rounded-3xl",
    floatDelay: 0.6,
    floatDuration: 4.0,
    entryDelay: 0.3,
  },
  {
    id: "orbit-img-trail",
    src: "/homepage/orbit-section/2.webp",
    alt: "Green Pathway and Jogging Trails",
    // Mid-Right: ~3:30 o'clock (Edge position)
    x: 90.0,
    y: 56.0,
    sizeClass:
      "w-[82px] h-[88px] xs:w-[92px] xs:h-[98px] sm:w-[120px] sm:h-[128px] md:w-[145px] md:h-[152px] lg:w-[170px] lg:h-[178px]",
    roundedClass: "rounded-2xl md:rounded-3xl",
    floatDelay: 1.8,
    floatDuration: 4.2,
    entryDelay: 0.4,
  },
  {
    id: "orbit-img-meditate",
    src: "/homepage/orbit-section/3.webp",
    alt: "Forest Nature and Wellness",
    // Bottom-Center: ~5:30 o'clock
    x: 60.0,
    y: 88.0,
    sizeClass:
      "w-[82px] h-[82px] xs:w-[92px] xs:h-[92px] sm:w-[120px] sm:h-[120px] md:w-[145px] md:h-[145px] lg:w-[170px] lg:h-[170px]",
    roundedClass: "rounded-2xl md:rounded-3xl",
    floatDelay: 0.9,
    floatDuration: 3.5,
    entryDelay: 0.5,
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
      className={`w-full bg-[#FAF9F5] pt-14 sm:pt-16 md:pt-24 lg:pt-32 pb-20 sm:pb-24 md:pb-32 lg:pb-36 overflow-x-clip overflow-y-visible select-none ${className}`}
    >
      <div className="container max-w-[1400px] px-2 sm:px-6 overflow-visible">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 md:space-y-4 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-2 sm:px-0"
        >
          {/* Eyebrow / Tag */}
          <div className="flex items-center gap-2 text-secondary">
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-secondary" />
            <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase">
              WALK THROUGH THE FUTURE
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.12] tracking-[-0.01em]">
            Imagine What’s Coming.
            <br />
            Walk Through The Vision.
          </h2>

          {/* Subheading Narrative */}
          <p className="text-[#313116] text-[13.5px] sm:text-[15px] md:text-[16px] font-normal leading-relaxed max-w-2xl pt-1 text-center">
            See Nirvaana Hills as it is being brought to life. Take a visual
            journey through the roads, farms, green spaces, clubhouse,
            experiences and everyday moments that are shaping the future of the
            community.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* ORBIT VISUAL CONTAINER                                   */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-[420px] xs:max-w-[460px] sm:max-w-[580px] md:max-w-[720px] lg:max-w-[820px] mx-auto aspect-square flex items-center justify-center overflow-visible">
          {/* Orbital Circle Ring Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[8%] left-[8%] w-[84%] h-[84%] rounded-full border border-[#9EB84E]/40 pointer-events-none"
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
            className="relative z-20 w-[108px] h-[108px] xs:w-[120px] xs:h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[205px] lg:h-[205px] rounded-full bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] flex flex-col items-center justify-center p-3 text-center shadow-lg shadow-[#AFEB63]/25 transition-colors cursor-pointer group no-underline"
          >
            <div className="flex items-center justify-center gap-1.5">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 fill-[#1F2922] stroke-none shrink-0 transition-transform group-hover:scale-110" />
              <span className="font-sans font-bold text-[8px] xs:text-[9px] sm:text-[11px] md:text-[12.5px] tracking-[0.06em] uppercase text-[#1F2922] text-left leading-[1.15]">
                WATCH THE
                <br />
                WALKTHROUGH
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
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 110,
                  delay: item.entryDelay,
                }}
              >
                {/* Smooth 4-5px Floating Animation on Y-axis */}
                <motion.div
                  animate={{
                    y: [-4, 4, -4],
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
