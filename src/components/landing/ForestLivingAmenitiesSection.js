"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-20 overflow-visible select-none"
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
          className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B05B3B] mb-3 sm:mb-4">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              FOREST LIVING AMENITIES
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] xs:text-[28px] sm:text-[34px] md:text-[38px] leading-[1.15] tracking-[-0.01em] mb-4">
            Not a Promise. Already Built.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#525E50] text-[13px] xs:text-[14px] sm:text-[15px] leading-relaxed max-w-xl mx-auto">
            Infrastructure that&apos;s delivered - not brochure promises. Every
            amenity at Nirvaana Hills Phase 2 is designed to elevate forest living.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* COMPLETE STACKING STICKY CARDS CONTAINER                 */}
        {/* ======================================================== */}
        <div className="relative max-w-[680px] md:max-w-[760px] mx-auto flex flex-col pb-[200px] sm:pb-[220px] md:pb-[230px]">
          {AMENITIES.map((card, index) => {
            return (
              <div
                key={card.id}
                style={{ zIndex: index + 1 }}
                className="sticky top-20 sm:top-24 md:top-28 w-full mb-8 sm:mb-12 md:mb-16"
              >
                <div className="w-full h-[225px] xs:h-[240px] sm:h-[265px] md:h-[285px] rounded-[22px] sm:rounded-[28px] bg-[#E5EAD9] p-5 xs:p-6 sm:p-7 md:p-8 border border-black/5 shadow-none flex flex-col justify-between">
                  {/* Icon */}
                  <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0">
                    <Image
                      src={card.icon}
                      alt={card.title}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col space-y-1.5 sm:space-y-2">
                    <h3 className="font-serif !font-normal text-[#1F2922] text-[17px] xs:text-[19px] sm:text-[21px] md:text-[23px] leading-tight">
                      {card.title}
                    </h3>
                    <p className="font-sans text-[#4A5546] text-[12px] xs:text-[13px] sm:text-[14px] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* CONCLUDING PHILOSOPHY LINE (Ensures Clean Scroll Exit)   */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto -mt-[170px] sm:-mt-[190px] md:-mt-[200px] pt-2 sm:pt-4 pb-2 px-2"
        >
          <p className="font-sans italic text-[#525E50] text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.65]">
            Every amenity is built to last, deeply integrated with the natural landscape, and ready for you and your family from day one.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
