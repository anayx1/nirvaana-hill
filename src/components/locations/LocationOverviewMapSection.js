"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LocationOverviewMapSection() {
  return (
    <section
      id="location-overview"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      <div className="container max-w-[900px] px-4 sm:px-6">
        
        {/* ====================================================== */}
        {/* HEADER BLOCK                                           */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 sm:space-y-4 mb-8 sm:mb-10"
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
              LOCATION OVERVIEW
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[32px] xs:text-[38px] sm:text-[44px] md:text-[50px] leading-[1.15] tracking-[-0.01em]">
            Find Your Way To Forever.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#313116] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.6] max-w-2xl font-normal">
            Because meaningful places should feel peaceful. Not unreachable.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* INTERACTIVE GOOGLE MAP IFRAME CONTAINER                */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E5E8D8] shadow-md bg-[#EBEFE5] relative aspect-[4/3] sm:aspect-[16/10] md:h-[460px]"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d39696.42541686602!2d76.10922562776766!3d28.428264054751768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI1JzE4LjgiTiA3NsKwMDgnMjYuNSJF!5e0!3m2!1sen!2sin!4v1789839041372!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Nirvaana Hills Google Maps Location"
            className="w-full h-full"
          />
        </motion.div>

        {/* ====================================================== */}
        {/* CAPTION BELOW MAP                                      */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 sm:mt-5"
        >
          <p className="font-sans text-[#1F2922]/90 text-[15px] sm:text-[17px] font-normal leading-relaxed">
            Peacefully tucked away. Conveniently connected.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
