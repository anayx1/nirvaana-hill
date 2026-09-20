"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExperienceTheJourneySection() {
  return (
    <section
      id="experience-the-journey"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      <div className="container max-w-[900px] px-4 sm:px-6">
        
        {/* ====================================================== */}
        {/* SECTION HEADER & NARRATIVE                             */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 mb-8 sm:mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
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
              EXPERIENCE THE JOURNEY
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[32px] xs:text-[38px] sm:text-[46px] md:text-[52px] leading-[1.12] tracking-[-0.01em]">
            Before You Arrive, Experience The Journey.
          </h2>

          {/* Body Paragraph 1 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] max-w-3xl font-normal pt-1"
          >
            Imagine leaving home on a Saturday morning. A comfortable drive. Open highways. A day outdoors with family - time to walk, talk, eat, explore, and slow down. An evening return without feeling rushed.
          </p>

          {/* Body Paragraph 2 */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] max-w-3xl font-normal"
          >
            A meaningful weekend destination should fit naturally into real life. That&apos;s exactly how the Nirvaana Hills location has been planned.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* VIDEO DISPLAY CONTAINER (Vertical Portrait)            */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[540px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-[#E5E8D8] bg-[#1F241C] aspect-[314/382]"
        >
          <video
            src="/locations/video/experince-the-journey.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ====================================================== */}
        {/* BOTTOM CTA BUTTON                                      */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <a
            href="#site-visit"
            className="inline-flex items-center justify-center bg-[#AFEB63] text-[#1F2922] font-sans font-semibold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-2xl hover:bg-[#9de04e] active:scale-[0.98] transition-all duration-300 shadow-sm"
          >
            Watch Route Walkthrough
          </a>
        </motion.div>

      </div>
    </section>
  );
}
