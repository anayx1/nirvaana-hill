"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function LocationHeroRadarSection() {
  return (
    <section
      id="location-radar-hero"
      className="w-full bg-[#62735B] py-14 sm:py-18 md:py-24 lg:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[900px] px-4 sm:px-6">

        {/* ====================================================== */}
        {/* TOP NARRATIVE HEADER                                   */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 mb-10 sm:mb-14 md:mb-16"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-white/90">
            <FarmIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px] whitespace-nowrap">
              LOCATION
            </span>
          </div>

          {/* Location Badge Pill */}
          <div>
            <span className="inline-block bg-[#E5E8D8] text-[#1F2922] font-sans font-medium text-[11px] px-2 py-1.5 sm:py-2 rounded-full shadow-xs">
              Mahendragarh, Haryana • Aravalli Foothills • 200 Acres
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif !font-normal text-white text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] tracking-[-0.01em]">
            Your Escape Starts Here.
            <br />
            2 Hours From Delhi &amp; Gurgaon.
            <br />
            Surrounded By 9,600 Acres Of Forest.
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-white/90 text-[15px] sm:text-[17px] font-normal pt-1">
            Closer than you think. Greener than you imagine.
          </p>

          {/* Description Paragraph */}
          <p className="font-sans text-white/90 text-[13.5px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] max-w-2xl font-normal">
            Nestled in the Aravalli foothills near Mahendragarh, Nirvaana Hills
            feels far from the city, without being far from it.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* SVG RADAR COMPASS MAP                                  */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[620px] mx-auto aspect-square flex items-center justify-center p-2 sm:p-4 select-none"
        >
          <svg
            viewBox="0 0 600 600"
            className="w-full h-full overflow-visible drop-shadow-sm"
            aria-label="Nirvaana Hills Location & Scale Radar Map"
          >
            {/* Concentric Radar Rings */}
            <circle
              cx="300"
              cy="300"
              r="230"
              fill="none"
              stroke="rgba(255, 255, 255, 0.28)"
              strokeWidth="1.5"
            />
            <circle
              cx="300"
              cy="300"
              r="150"
              fill="none"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />
            <circle
              cx="300"
              cy="300"
              r="75"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
            />

            {/* Cardinal Direction Ticks (crossing the outer ring) */}
            {/* North Tick */}
            <line
              x1="300"
              y1="50"
              x2="300"
              y2="88"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.5"
            />
            {/* South Tick */}
            <line
              x1="300"
              y1="512"
              x2="300"
              y2="550"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.5"
            />
            {/* East Tick */}
            <line
              x1="512"
              y1="300"
              x2="550"
              y2="300"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.5"
            />
            {/* West Tick */}
            <line
              x1="50"
              y1="300"
              x2="88"
              y2="300"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.5"
            />

            {/* Cardinal Letters (N, E, S, W) */}
            <text
              x="300"
              y="32"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="16"
              fontWeight="600"
              fontFamily="var(--font-sans), sans-serif"
            >
              N
            </text>
            <text
              x="576"
              y="306"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="16"
              fontWeight="600"
              fontFamily="var(--font-sans), sans-serif"
            >
              E
            </text>
            <text
              x="300"
              y="584"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="16"
              fontWeight="600"
              fontFamily="var(--font-sans), sans-serif"
            >
              S
            </text>
            <text
              x="24"
              y="306"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="16"
              fontWeight="600"
              fontFamily="var(--font-sans), sans-serif"
            >
              W
            </text>

            {/* Diagonal Lime Dotted Accent Rays (contained within radar, not overlapping text) */}
            {/* Top-Left (NW) */}
            <line
              x1="300"
              y1="300"
              x2="185"
              y2="185"
              stroke="#AFEB63"
              strokeWidth="1.5"
              strokeDasharray="3 3.5"
            />
            {/* Top-Right (NE) */}
            <line
              x1="300"
              y1="300"
              x2="415"
              y2="185"
              stroke="#AFEB63"
              strokeWidth="1.5"
              strokeDasharray="3 3.5"
            />
            {/* Bottom-Left (SW) */}
            <line
              x1="300"
              y1="300"
              x2="185"
              y2="415"
              stroke="#AFEB63"
              strokeWidth="1.5"
              strokeDasharray="3 3.5"
            />
            {/* Bottom-Right (SE) */}
            <line
              x1="300"
              y1="300"
              x2="415"
              y2="415"
              stroke="#AFEB63"
              strokeWidth="1.5"
              strokeDasharray="3 3.5"
            />

            {/* Center Core Dot */}
            <circle cx="300" cy="300" r="7" fill="#AFEB63" />

            {/* Center Core Label: Nirvaana Hills */}
            <text
              x="300"
              y="336"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="20"
              fontStyle="italic"
              fontWeight="700"
              fontFamily="var(--font-serif), Georgia, serif"
            >
              Nirvaana Hills
            </text>

            {/* ==================================================== */}
            {/* 4 QUADRANT METRIC LABELS                             */}
            {/* ==================================================== */}

            {/* Top-Left: 2 hrs / Gurgaon & Delhi */}
            <g transform="translate(142, 95)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="34"
                fontWeight="800"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="-0.02em"
              >
                2 hrs
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="#AFEB63"
                fontSize="14.5"
                fontWeight="700"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="0.02em"
              >
                Gurgaon &amp; Delhi
              </text>
            </g>

            {/* Top-Right: 1,00,000 / Trees */}
            <g transform="translate(470, 95)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="34"
                fontWeight="800"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="-0.02em"
              >
                1,00,000
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="#AFEB63"
                fontSize="14.5"
                fontWeight="700"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="0.02em"
              >
                Trees
              </text>
            </g>

            {/* Bottom-Left: 9,600 / Ac. Forest */}
            <g transform="translate(130, 485)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="34"
                fontWeight="800"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="-0.02em"
              >
                9,600
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="#AFEB63"
                fontSize="14.5"
                fontWeight="700"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="0.02em"
              >
                Ac. Forest
              </text>
            </g>

            {/* Bottom-Right: 200 / Ac. Project */}
            <g transform="translate(480, 485)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="34"
                fontWeight="800"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="-0.02em"
              >
                200
              </text>
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fill="#AFEB63"
                fontSize="14.5"
                fontWeight="700"
                fontFamily="var(--font-sans), sans-serif"
                letterSpacing="0.02em"
              >
                Ac. Project
              </text>
            </g>
          </svg>
        </motion.div>

        {/* ====================================================== */}
        {/* HIGHWAY CONNECTIVITY & CTA ACTIONS                     */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-14 pt-8 border-t border-white/20 flex flex-col space-y-7"
        >
          {/* Highway Access List */}
          <p className="font-sans text-white/85 text-[15px] sm:text-[17px] md:text-[18px] leading-[1.6] max-w-2xl font-normal">
            Access via UER-2 / NH-352W / NH-148B / NH-152D / NH-334B – Highways
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col items-start space-y-5 pt-1">
            {/* Book A Site Visit Button */}
            <a
              href="/contact-us#enquiry"
              className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
            >
              Book A Site Visit
            </a>

            {/* Get Directions Link with Brand Accent Underline */}
            <a
              href="#location-overview"
              className="group inline-flex flex-col items-start gap-1.5 text-white hover:text-white transition-colors duration-300 cursor-pointer pt-2"
            >
              <div className="flex items-center gap-1.5 md:gap-2 font-sans text-[12px] md:text-[16px] font-normal tracking-tight">
                <span>Get Directions</span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-[#AFEB63] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>

              {/* Signature Accent: Dot + Line */}
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#AFEB63]" />
                <span className="w-8 h-[2px] rounded-full bg-[#AFEB63] transition-all duration-300 group-hover:w-12" />
              </div>
            </a>
          </div>

          {/* Location Landscape Visual Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full mt-4 sm:mt-6 overflow-hidden rounded-xl"
          >
            <Image
              src="/locations/hero.avif"
              alt="Nirvaana Hills Aravalli Landscape"
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 900px"
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
