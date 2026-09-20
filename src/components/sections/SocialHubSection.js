"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ========================================================
// SOCIAL SLIDES DATA
// Pattern: 1 Office -> 2 Woman -> 1 Office -> 2 Woman...
// ========================================================
const BASE_SOCIAL_ITEMS = [
  { id: "office-1", src: "/homepage/sec10-office.avif", alt: "Nirvaana Hills Experience" },
  { id: "woman-1", src: "/homepage/sec10-woman.avif", alt: "Community Member" },
  { id: "woman-2", src: "/homepage/sec10-woman.avif", alt: "Community Member" },
  { id: "office-2", src: "/homepage/sec10-office.avif", alt: "Nirvaana Hills Experience" },
  { id: "woman-3", src: "/homepage/sec10-woman.avif", alt: "Community Member" },
  { id: "woman-4", src: "/homepage/sec10-woman.avif", alt: "Community Member" },
];

export default function SocialHubSection() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(1);
  const animationFrameId = useRef(null);

  // Duplicate list to achieve seamless infinite track
  const slideItems = [
    ...BASE_SOCIAL_ITEMS,
    ...BASE_SOCIAL_ITEMS,
    ...BASE_SOCIAL_ITEMS,
    ...BASE_SOCIAL_ITEMS,
  ];

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Smooth deceleration/acceleration between normal (1.0) and slowed (0.22) speed
      const targetSpeed = isHovered ? 0.22 : 1.0;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;

      // Base speed in pixels per second
      const baseSpeedPx = 65;
      offsetRef.current += baseSpeedPx * currentSpeedRef.current * delta;

      if (contentRef.current) {
        // Half of the total duplicated content width for seamless wrapping
        const halfWidth = contentRef.current.scrollWidth / 2;
        if (halfWidth > 0 && offsetRef.current >= halfWidth) {
          offsetRef.current -= halfWidth;
        }

        contentRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isHovered]);

  return (
    <section
      id="social-hub"
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-8 sm:mb-12"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-secondary text-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
              <path d="M3 21c4-2 8-2 12 0" />
              <path d="M9 17c2-1 4-1 6 0" />
            </svg>
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
              OUR SOCIAL HUB
            </span>
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* SEAMLESS AUTOPLAY SLIDER WITH HOVER SLOWDOWN TRACK       */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <div
          ref={contentRef}
          className="flex items-center gap-4 sm:gap-6 md:gap-7 w-max will-change-transform py-2"
        >
          {slideItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[210px] h-[280px] xs:w-[240px] xs:h-[320px] sm:w-[270px] sm:h-[360px] md:w-[300px] md:h-[400px] lg:w-[330px] lg:h-[440px] shrink-0 rounded-[24px] sm:rounded-[30px] md:rounded-[34px] overflow-hidden bg-[#242A1F] shadow-md transition-transform duration-500 hover:scale-[1.02]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 300px, 330px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
