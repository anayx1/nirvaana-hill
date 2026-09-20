"use client";

import React from "react";
import { motion } from "framer-motion";

const DISTANCE_DATA = [
  {
    id: "1",
    location: "New Delhi IGI Airport",
    distance: "130 km",
    approxTime: "125 mins",
  },
  {
    id: "2",
    location: "Gurugram (Rajiv Chowk)",
    distance: "125 km",
    approxTime: "130 mins",
  },
  {
    id: "3",
    location: "Gurgaon (SPR Road)",
    distance: "118 km",
    approxTime: "120 mins",
  },
  {
    id: "4",
    location: "Gurgaon (Dwarka Expressway)",
    distance: "110 km",
    approxTime: "100 mins",
  },
  {
    id: "5",
    location: "Delhi (Peeragarhi)",
    distance: "120 km",
    approxTime: "130 mins",
  },
  {
    id: "6",
    location: "South Delhi (Saket)",
    distance: "140 km",
    approxTime: "160 mins",
  },
  {
    id: "7",
    location: "East Delhi (Mayur Vihar)",
    distance: "160 km",
    approxTime: "130 mins",
  },
  {
    id: "8",
    location: "Rohtak",
    distance: "70 km",
    approxTime: "60 mins",
  },
  {
    id: "9",
    location: "Rewari",
    distance: "65 km",
    approxTime: "60 mins",
  },
  {
    id: "10",
    location: "Hisar",
    distance: "110 km",
    approxTime: "120 mins",
  },
  {
    id: "11",
    location: "Jhajjar",
    distance: "72 km",
    approxTime: "90 mins",
  },
  {
    id: "12",
    location: "Narnaul",
    distance: "45 km",
    approxTime: "45 mins",
  },
  {
    id: "13",
    location: "Mahendragarh",
    distance: "20 km",
    approxTime: "20 mins",
  },
  {
    id: "14",
    location: "Charkhi Dadri",
    distance: "30 km",
    approxTime: "30 mins",
  },
  {
    id: "15",
    location: "Pilani",
    distance: "50 km",
    approxTime: "50 mins",
  },
  {
    id: "16",
    location: "Farrukh Nagar",
    distance: "95 km",
    approxTime: "100 mins",
  },
];

export default function LocationDistanceTableSection() {
  return (
    <section
      id="distance-matrix"
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
              LOCATION &amp; CONNECTIVITY
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[32px] xs:text-[38px] sm:text-[44px] md:text-[50px] leading-[1.15] tracking-[-0.01em]">
            How Close Nirvaana Hills Really Is?
          </h2>
        </motion.div>

        {/* ====================================================== */}
        {/* DISTANCE & TIME TABLE                                  */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-[#313116]"
        >
          {/* Table Header Bar */}
          <div className="w-full bg-[#E5E8D8] rounded-xl sm:rounded-2xl px-3 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-[#313116] font-serif text-[15px] sm:text-[17px] md:text-[18px]">
            <div className="w-[42%] sm:w-[40%] text-center font-normal">Location</div>
            <div className="w-[28%] sm:w-[30%] text-center font-normal">Distance</div>
            <div className="w-[30%] text-center font-normal">Approx. Time</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col divide-y divide-dashed divide-[#5C6051]/20">
            {DISTANCE_DATA.map((row) => (
              <div
                key={row.id}
                className="py-3.5 sm:py-4 px-3 sm:px-6 flex items-center justify-between transition-colors hover:bg-black/[0.015]"
                style={{ color: "#5C6051" }}
              >
                {/* Location Column */}
                <div
                  className="w-[42%] sm:w-[40%] text-center font-sans text-[13.5px] sm:text-[15.5px] leading-snug font-normal"
                  style={{ color: "#5C6051" }}
                >
                  {row.location}
                </div>

                {/* Distance Column */}
                <div
                  className="w-[28%] sm:w-[30%] text-center font-sans text-[13.5px] sm:text-[15.5px] font-normal"
                  style={{ color: "#5C6051" }}
                >
                  {row.distance}
                </div>

                {/* Approx Time Column */}
                <div
                  className="w-[30%] text-center font-sans text-[13.5px] sm:text-[15.5px] font-normal"
                  style={{ color: "#5C6051" }}
                >
                  {row.approxTime}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
