"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";
import ExperienceSlideCard from "@/components/common/ExperienceSlideCard";

// ========================================================
// 5 MAIN SLIDE CARDS (Each contains an internal carousel)
// Mapped to public/homepage/slide1 through slide5
// ========================================================
export const SLIDE_CARDS = [
  {
    id: "slide-1",
    theme: "Wellness & Restoration",
    initialIndex: 1, // Nature Walks default display
    items: [
      {
        id: "yoga-decks",
        number: "1",
        title: "Yoga Decks",
        category: "Wellness & Restoration",
        image: "/homepage/slide1/2.webp",
      },
      {
        id: "nature-walks",
        number: "2",
        title: "Nature Walks",
        category: "Wellness & Restoration",
        image: "/homepage/slide1/2.webp",
      },
      {
        id: "wellness-centre",
        number: "3",
        title: "Wellness Centre",
        category: "Wellness & Restoration",
        image: "/homepage/slide1/3.webp",
      },
      {
        id: "jogging-trails",
        number: "4",
        title: "Jogging Trails",
        category: "Wellness & Restoration",
        image: "/homepage/slide1/1.webp",
      },
    ],
  },
  {
    id: "slide-2",
    theme: "Gather & Belong",
    initialIndex: 0, // Clubhouse
    items: [
      {
        id: "clubhouse",
        number: "1",
        title: "Clubhouse",
        category: "Gather & Belong",
        image: "/homepage/slide2/2.webp",
      },
      {
        id: "restaurant",
        number: "2",
        title: "Restaurant",
        category: "Gather & Belong",
        image: "/homepage/slide2/5.webp",
      },
      {
        id: "gazebos",
        number: "3",
        title: "Gazebos",
        category: "Gather & Belong",
        image: "/homepage/slide2/3.webp",
      },
      {
        id: "bonfire-spaces",
        number: "4",
        title: "Bonfire Spaces",
        category: "Gather & Belong",
        image: "/homepage/slide2/1.webp",
      },
      {
        id: "community-greens",
        number: "5",
        title: "Community Greens",
        category: "Gather & Belong",
        image: "/homepage/slide2/4.webp",
      },
    ],
  },
  {
    id: "slide-3",
    theme: "Play & Recreation",
    initialIndex: 0, // Golf Range
    items: [
      {
        id: "golf-range",
        number: "1",
        title: "Golf Range",
        category: "Play & Recreation",
        image: "/homepage/slide3/2.webp",
      },
      {
        id: "pickleball",
        number: "2",
        title: "Pickleball",
        category: "Play & Recreation",
        image: "/homepage/slide3/4.webp",
      },
      {
        id: "swimming-pool",
        number: "3",
        title: "Swimming Pool",
        category: "Play & Recreation",
        image: "/homepage/slide3/5.webp",
      },
      {
        id: "cricket-nets",
        number: "4",
        title: "Cricket Nets",
        category: "Play & Recreation",
        image: "/homepage/slide3/1.webp",
      },
      {
        id: "indoor-games",
        number: "5",
        title: "Indoor Games",
        category: "Play & Recreation",
        image: "/homepage/slide3/3.webp",
      },
    ],
  },
  {
    id: "slide-4",
    theme: "Family Living",
    initialIndex: 0, // Eco Kids Zone
    items: [
      {
        id: "eco-kids-zone",
        number: "1",
        title: "Eco Kids Zone",
        category: "Family Living",
        image: "/homepage/slide4/1.webp",
      },
      {
        id: "library",
        number: "2",
        title: "Library",
        category: "Family Living",
        image: "/homepage/slide4/2.webp",
      },
      {
        id: "pet-friendly-spaces",
        number: "3",
        title: "Pet Friendly Spaces",
        category: "Family Living",
        image: "/homepage/slide4/4.webp",
      },
      {
        id: "vegetables-gardens",
        number: "4",
        title: "Vegetables Gardens",
        category: "Family Living",
        image: "/homepage/slide4/5.webp",
      },
      {
        id: "mandir-trails",
        number: "5",
        title: "Mandir Trails",
        category: "Family Living",
        image: "/homepage/slide4/3.webp",
      },
    ],
  },
  {
    id: "slide-5",
    theme: "Rooted In Nature",
    initialIndex: 0, // 1 Lakh+ Trees
    items: [
      {
        id: "1-lakh-trees",
        number: "1",
        title: "1 Lakh+ Trees",
        category: "Rooted In Nature",
        image: "/homepage/slide5/1.webp",
      },
      {
        id: "natural-pond",
        number: "2",
        title: "Natural pond",
        category: "Rooted In Nature",
        image: "/homepage/slide5/4.webp",
      },
      {
        id: "fruit-orchards",
        number: "3",
        title: "Fruit Orchards",
        category: "Rooted In Nature",
        image: "/homepage/slide5/3.webp",
      },
      {
        id: "plantation-zones",
        number: "4",
        title: "Plantation Zones",
        category: "Rooted In Nature",
        image: "/homepage/slide5/2.webp",
      },
      {
        id: "forest-ecosystem",
        number: "5",
        title: "Forest Ecosystem",
        category: "Rooted In Nature",
        image: "/homepage/slide5/5.webp",
      },
    ],
  },
];

// ========================================================
// SECTION CONTAINER
// ========================================================
export default function ExperiencesSection() {
  return (
    <section
      id="features-amenities"
      className="w-full bg-[#FAF9F5] py-12 md:py-16 lg:py-24 overflow-hidden"
    >
      <div className="container max-w-[1400px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 md:space-y-4 mb-8 md:mb-12 lg:mb-16"
        >
          {/* Overline with Farm Icon */}
          <div className="flex items-center gap-2 text-secondary">
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-secondary" />
            <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase">
              EXPERIENCES DESIGNED AROUND LIVING
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.14] tracking-[-0.01em]">
            More Than Amenities.
            <br />
            A Way Of Living, Thoughtfully Created.
          </h2>

          {/* Subheading Paragraph */}
          <p className="text-[#313116] text-[13.5px] sm:text-[15px] md:text-[16px] font-normal leading-relaxed max-w-3xl pt-1">
            Every space here is built around how people actually want to live -
            not facilities to look at, but experiences to be lived.
          </p>
        </motion.div>

        {/* 5 Slide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {SLIDE_CARDS.map((slide, idx) => (
            <ExperienceSlideCard
              key={slide.id}
              slide={slide}
              priority={idx === 0}
            />
          ))}
        </div>

        {/* Centered CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-10 md:mt-14"
        >
          <Link
            href="/nirvaana-hills#features-amenities"
            className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-xs"
          >
            Explore Amenities &amp; Experiences
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
