"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AMENITIES = [
  {
    id: "miyawaki",
    icon: "/landing/miyawaki.webp",
    title: "Miyawaki Afforestation",
    description:
      "Science-backed native forest restoration - 10x faster than conventional planting. Carbon-positive community.",
  },
  {
    id: "golf",
    icon: "/landing/golf.webp",
    title: "Golf Range",
    description:
      "Exclusive in-community golf range surrounded by natural forest. Rare in any NCR development.",
  },
  {
    id: "the-sanctuary",
    icon: "/landing/the-sanctuary.webp",
    title: "The Sanctuary (Club)",
    description:
      "Premium clubhouse experience. Wellness facilities, lounge, and curated community events.",
  },
  {
    id: "cctv",
    icon: "/landing/cctv.webp",
    title: "2-Tier Security",
    description:
      "24/7 manned entry, CCTV surveillance, biometric access. Your investment is protected always.",
  },
  {
    id: "wide-roads",
    icon: "/landing/wide-roads.webp",
    title: "33ft Wide Roads",
    description:
      "Wider than most Gurugram residential colonies. All-weather internal roads with solar lighting.",
  },
  {
    id: "solar-light",
    icon: "/landing/solar-light.webp",
    title: "Solar Street Lighting",
    description:
      "100% solar-powered community lighting. Zero dependency on grid for infrastructure.",
  },
  {
    id: "open-recreation",
    icon: "/landing/open-recreation.webp",
    title: "Open Recreation Zone",
    description:
      "Yoga lawns, forest trails, children's play zones, and natural gathering spaces.",
  },
  {
    id: "central-water",
    icon: "/landing/central-water.webp",
    title: "Central Water Feature",
    description:
      "Landscaped water body at the community heart - a natural gathering and serenity zone.",
  },
  {
    id: "experience-centre",
    icon: "/landing/experience-centre.webp",
    title: "Experience Centre",
    description:
      "25,038 sq yd flagship centre showcasing the Nirvaana Hills vision, available year-round.",
  },
  {
    id: "hilltop-mandir",
    icon: "/landing/hilltop-mandir.webp",
    title: "Hilltop Mandir",
    description:
      "A dedicated pathway to the hilltop mandir - spiritual and scenic - within the community.",
  },
  {
    id: "rainwater-harvesting",
    icon: "/landing/rainwater-harvesting.webp",
    title: "Rainwater Harvesting",
    description:
      "Community-wide water conservation systems. Climate-resilient infrastructure.",
  },
  {
    id: "organic",
    icon: "/landing/organic.webp",
    title: "Organic Farm Zones",
    description:
      "Community organic farming areas. Grow your own produce or participate in the harvest programme.",
  },
];

export default function ForestLivingAmenitiesSection() {
  return (
    <section
      id="forest-living-amenities"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 overflow-visible select-none"
    >
      <div className="container max-w-[1200px] px-4 sm:px-6 mx-auto">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14 md:mb-16"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B05B3B] mb-3 sm:mb-4">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
              FOREST LIVING AMENITIES
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[30px] xs:text-[36px] sm:text-[42px] md:text-[48px] leading-[1.15] tracking-[-0.01em] mb-4">
            Not a Promise. Already Built.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#525E50] text-[14px] xs:text-[15px] sm:text-[16px] leading-relaxed max-w-xl mx-auto">
            Infrastructure that&apos;s delivered - not brochure promises. Every
            amenity at Nirvaana Hills Phase 2 is designed to elevate forest living.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* COMPLETE STACKING STICKY CARDS CONTAINER                 */}
        {/* ======================================================== */}
        <div className="relative max-w-[620px] sm:max-w-[680px] mx-auto flex flex-col pb-8 sm:pb-12">
          {AMENITIES.map((card, index) => {
            const isLast = index === AMENITIES.length - 1;

            return (
              <div
                key={card.id}
                style={{ zIndex: index + 1 }}
                className={`sticky top-20 sm:top-24 md:top-28 w-full ${
                  !isLast ? "mb-8 sm:mb-12 md:mb-14" : "mb-0"
                }`}
              >
                <div className="w-full rounded-[24px] sm:rounded-[32px] bg-[#E5EAD9] p-6 xs:p-8 sm:p-10 border border-[#D5DFC6] shadow-sm flex flex-col justify-start space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className="relative w-11 h-11 sm:w-13 sm:h-13">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif !font-normal text-[#1F2922] text-[22px] xs:text-[24px] sm:text-[28px] md:text-[30px] leading-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[#4A5546] text-[14px] sm:text-[15.5px] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
