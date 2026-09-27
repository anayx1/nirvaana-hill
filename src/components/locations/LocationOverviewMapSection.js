"use client";

import React from "react";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

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
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              LOCATION OVERVIEW
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[26px] sm:text-[34px] md:text-[42px] leading-[1.15] tracking-[-0.01em]">
            Find Your Way To Forever.
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-[#313116] text-[13.5px] sm:text-[15px] md:text-[16px] leading-[1.6] max-w-2xl font-normal">
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.508893632435!2d76.0706328!3d28.403897599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d45898c3ccf2339%3A0xbcdd42083f79e894!2sNirvaana%20Hills%20by%20SEAD%20Realty!5e0!3m2!1sen!2sin!4v1790501903936!5m2!1sen!2sin"
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
