"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DroneExperienceSection() {
  return (
    <section
      id="drone-experience"
      className="relative w-full min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden py-16 sm:py-24 px-4 sm:px-6"
    >
      {/* ======================================================== */}
      {/* BACKGROUND VIDEO (Full-bleed, Loop, Muted)              */}
      {/* ======================================================== */}
      <video
        src="/gallery/drone.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Atmospheric Dark & Blur Overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* ======================================================== */}
      {/* CENTERED FLOATING GLASS CARD                            */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[480px] sm:max-w-[520px] rounded-xl bg-black/5 backdrop-blur-sm border border-white/20 p-5 sm:p-7 shadow-2xl flex flex-col space-y-6 text-white text-center"
      >
        {/* Inner Video Window */}
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/40 border border-white/15 shadow-inner">
          <video
            src="/gallery/drone.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-col items-center space-y-3 px-1 sm:px-2 pb-1">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-white/90">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[11.5px] sm:text-[12.5px]">
              DRONE EXPERIENCE
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-white text-[26px] sm:text-[32px] md:text-[36px] leading-[1.18] tracking-[-0.01em]">
            See Nirvaana From Above.
          </h2>

          {/* Description */}
          <p className="font-sans text-white/90 text-[13.5px] sm:text-[15px] leading-[1.65] font-normal">
            200 acres surrounded by 9,600 acres of forest. Original drone footage and 360° aerial views capture the true scale - rolling hills, open skies, and protected forest stretching to the horizon.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
