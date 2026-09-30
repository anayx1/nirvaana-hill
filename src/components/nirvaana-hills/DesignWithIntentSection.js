"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import FarmIcon from "@/components/icons/FarmIcon";
import ExperienceSlideCard from "@/components/common/ExperienceSlideCard";

// ========================================================
// NIRVAANA HILLS FEATURES & AMENITIES DATA (4 Slide Cards)
// ========================================================
export const NIRVAANA_FEATURES_SLIDES = [
  {
    id: "project-features",
    theme: "Project Features",
    initialIndex: 0,
    items: [
      {
        id: "golf-course",
        title: "Golf Course",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/golf-course.webp",
      },
      {
        id: "360-scenic-hill",
        title: "360° Scenic Hill & Sunset View",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/360-scenic-hill-and-sunset-view.webp",
      },
      {
        id: "forest-ecosystem",
        title: "Forest Ecosystem (1 Lakh+ Trees)",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/forest-ecosytem-1-lack-trees.webp",
      },
      {
        id: "three-villa-concepts",
        title: "Three Villa Concepts: Stone, Wood, and Mud",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/three-villa-concepts-stone-wood-and-mud.webp",
      },
      {
        id: "organic-farming",
        title: "Organic Farming",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/organic-farming.webp",
      },
      {
        id: "holistic-wellness",
        title: "Holistic Wellness Center",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/holistic-wellness-center.webp",
      },
      {
        id: "jogging-trails",
        title: "Jogging & Natural Trails",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/jogging-and-natural-trails.webp",
      },
      {
        id: "gazebo-sit-outs",
        title: "Gazebo Sit-Outs",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/gazebo-sit-outs.webp",
      },
      {
        id: "solar-lighting",
        title: "Common Solar Lighting",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/common-solar-lighting.webp",
      },
      {
        id: "internal-roads",
        title: "33-ft Wide Internal Roads",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/33-ft-wide-internal-roads.webp",
      },
      {
        id: "emergency-support",
        title: "24/7 Emergency Support",
        category: "Project Features",
        image: "/nirvaana-hills/slide-1/24-7-emergency-support.webp",
      },
    ],
  },
  {
    id: "clubhouse-experience",
    theme: "The Nirvana Sanctuary - Clubhouse Experience",
    initialIndex: 0,
    items: [
      {
        id: "restaurant",
        title: "Multi-cuisine Restaurant",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image:
          "/nirvaana-hills/slide-2/multi-cuisine-restaurant-the-nirvana-santuary-clubhouse-ecperience.webp",
      },
      {
        id: "swimming-pool",
        title: "Swimming Pool",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/swimming-pool.webp",
      },
      {
        id: "wellness-center",
        title: "Wellness & Fitness Center",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/wellness-fitness-center.webp",
      },
      {
        id: "indoor-games",
        title: "Indoor Games Lounge (Pool Table, TT)",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image:
          "/nirvaana-hills/slide-2/indoor-games-lounge-pool-table-table-tennis.webp",
      },
      {
        id: "pickleball-court",
        title: "Pickleball & Tennis Court",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/pickleball-and-tennis-court.webp",
      },
      {
        id: "badminton-court",
        title: "Badminton Court",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/badminton.webp",
      },
      {
        id: "cricket-nets",
        title: "Cricket Nets",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/cricket-nets.webp",
      },
      {
        id: "eco-kids-zone",
        title: "Eco Kids Zone",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/eco-kids-zone.webp",
      },
      {
        id: "library",
        title: "Wi-Fi Enabled Curated Library",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/wi-fi-enabled-curated-library.webp",
      },
      {
        id: "convenience-store",
        title: "Convenience Store",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image:
          "/nirvaana-hills/slide-2/convinience-store-the-nirvana-sanctuary-clubhouse-experience.webp",
      },
      {
        id: "community-garden",
        title: "Community Garden",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/community-garden.webp",
      },
      {
        id: "yoga-deck",
        title: "Hilltop Yoga Deck",
        category: "The Nirvana Sanctuary - Clubhouse Experience",
        image: "/nirvaana-hills/slide-2/hilltop-yoga-deck.webp",
      },
    ],
  },
  {
    id: "plot-features",
    theme: "Individual Farm Features",
    initialIndex: 0,
    items: [
      {
        id: "private-entry-gate",
        title: "Private Entry Gate",
        category: "Individual Farm Features",
        image: "/nirvaana-hills/slide-3/private-entry-gate.webp",
      },
      {
        id: "boundary-walls",
        title: "Boundary Walls",
        category: "Individual Farm Features",
        image: "/nirvaana-hills/slide-3/boundary-walls.webp",
      },
      {
        id: "boundary-plantation",
        title: "Curated Boundary Plantation",
        category: "Individual Farm Features",
        image: "/nirvaana-hills/slide-3/curated-boundary-plantation.webp",
      },
      {
        id: "plot-wide-roads",
        title: "33-ft Wide Roads",
        category: "Individual Farm Features",
        image: "/nirvaana-hills/slide-3/33-ft-wide-roads.webp",
      },
      {
        id: "electricity-provision",
        title: "Electricity Connection Provision",
        category: "Individual Farm Features",
        image: "/nirvaana-hills/slide-3/electricity-connection-provision.webp",
      },
      {
        id: "water-provision",
        title: "Water Connection Provision",
        category: "Individual Farm Features",
        image: "/nirvaana-hills/slide-3/water-connction-provision.webp",
      },
    ],
  },
  {
    id: "sustainability-features",
    theme: "Sustainability Features",
    initialIndex: 0,
    items: [
      {
        id: "solar-power",
        title: "Solar Power",
        category: "Sustainability Features",
        image: "/nirvaana-hills/slide-4/solar-power.webp",
      },
      {
        id: "rain-water",
        title: "Rain Water Harvesting",
        category: "Sustainability Features",
        image: "/nirvaana-hills/slide-4/rain-water-harvesting.webp",
      },
      {
        id: "sewage-plant",
        title: "Sewage Treatment Plant",
        category: "Sustainability Features",
        image: "/nirvaana-hills/slide-4/sewage-treatment-plant.webp",
      },
      {
        id: "compost-plant",
        title: "Compost Plant",
        category: "Sustainability Features",
        image: "/nirvaana-hills/slide-4/compost-plant.webp",
      },
      {
        id: "green-cover",
        title: "Green Cover",
        category: "Sustainability Features",
        image: "/nirvaana-hills/slide-4/green-cover.webp",
      },
    ],
  },
];

// ========================================================
// DESIGN WITH INTENT SECTION
// ========================================================
export default function DesignWithIntentSection() {
  return (
    <section
      id="features-amenities"
      className="w-full bg-[#FAF9F5] py-12 sm:py-14 md:py-16 lg:py-20 overflow-hidden select-none relative"
    >
      <div id="features" className="absolute top-0 pointer-events-none" />
      <div id="amenities" className="absolute top-0 pointer-events-none" />
      <div className="container max-w-[1400px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-3 md:space-y-4 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          {/* Eyebrow with Farm Icon */}
          <div className="inline-flex items-center justify-center gap-2 text-secondary">
            <FarmIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 text-secondary" />
            <span className="text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase whitespace-nowrap">
              FEATURES &amp; AMENITIES
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.14] tracking-[-0.01em]">
            Design With Intent
          </h2>

          {/* Description */}
          <p className="text-[#313116] text-[13.5px] sm:text-[15px] md:text-[16px] font-normal leading-relaxed max-w-2xl">
            Nirvaana Hills isn&apos;t defined by infrastructure alone, but by how
            life feels inside it.
          </p>
        </motion.div>

        {/* 4 Slide Cards Grid (1-col on mobile, 2-col on desktop/tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8 max-w-[1200px] mx-auto">
          {NIRVAANA_FEATURES_SLIDES.map((slide, idx) => (
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
          className="flex justify-center mt-10 sm:mt-12 md:mt-14"
        >
          <Link
            href="/faqs#amenities"
            className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs inline-flex items-center justify-center active:scale-95"
          >
            Find Your Answers
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
