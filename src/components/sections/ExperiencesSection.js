"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
// INDIVIDUAL SLIDE CARD WITH INTERNAL CAROUSEL
// ========================================================
function ExperienceSlideCard({ slide }) {
  const [currentIndex, setCurrentIndex] = useState(slide.initialIndex ?? 0);
  const [direction, setDirection] = useState(1);
  const total = slide.items.length;

  const handlePrev = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const currentItem = slide.items[currentIndex];

  return (
    <div className="relative w-full aspect-[4/3.2] sm:aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-sm isolate group bg-[#1F2518] select-none">
      {/* Background Image Carousel with Cross-fade */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={currentItem.image}
            alt={currentItem.title}
            fill
            unoptimized
            priority={slide.id === "slide-1"}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle Natural Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

      {/* Left Navigation Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label={`Previous ${slide.theme} item`}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 active:scale-90"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        onClick={handleNext}
        aria-label={`Next ${slide.theme} item`}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-black/45 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all z-20 active:scale-90"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Card Content (Bottom-Left) */}
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-4 sm:left-5 md:left-6 right-16 z-10 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-serif !font-normal text-white text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] leading-tight mb-1">
              {currentItem.title}
            </h3>
            <p className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-white/90 font-normal">
              {currentItem.category}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators (Bottom-Right) */}
      <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 right-4 sm:right-5 md:right-6 z-10 flex items-center gap-1.5">
        {slide.items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to ${item.title}`}
            className={`transition-all duration-300 rounded-full ${idx === currentIndex
              ? "w-4 h-1.5 bg-[#AFEB63]"
              : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

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
          {/* Overline with Terrace/Hill Icon */}
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
            <span className="text-[13px] md:text-[15px] font-semibold tracking-[0.12em] uppercase">
              EXPERIENCES DESIGNED AROUND LIVING
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-serif !font-normal text-[#1F2922] !text-[32px] sm:!text-[38px] md:!text-[46px] lg:!text-[54px] leading-[1.14] tracking-[-0.01em]">
            More Than Amenities.
            <br />
            A Way Of Living, Thoughtfully Created.
          </h2>

          {/* Subheading Paragraph */}
          <p className="text-[#313116] text-[16px] sm:text-[18px] md:text-[20px] font-normal leading-relaxed max-w-3xl pt-1">
            Every space here is built around how people actually want to live -
            not facilities to look at, but experiences to be lived.
          </p>
        </motion.div>

        {/* 5 Slide Cards Grid (Responsive 1-col on mobile, 2-col on tablet/desktop, 3-col on large) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {SLIDE_CARDS.map((slide) => (
            <ExperienceSlideCard key={slide.id} slide={slide} />
          ))}
        </div>
      </div>
    </section>
  );
}

