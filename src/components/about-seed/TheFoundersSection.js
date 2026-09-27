"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export const FOUNDERS = [
  {
    id: "neeraj-bansal",
    name: "Mr. Neeraj Bansal",
    role: "Founder",
    image: "/about-seed/neeraj-bansal.webp",
    imagePosition: "object-[bottom]",
    bio: "With 26+ years of entrepreneurial experience across construction, real estate, manufacturing, retail, food & beverage, and large-scale business development, Neeraj Bansal's commitment to meaningful impact led to the Muskaan Care Foundation, focused on education, healthcare, and long-term social welfare. At SEAD Realty, his vision continues to shape communities built around trust, sustainability, and long-term thinking.",
  },
  {
    id: "satpal-harsana",
    name: "Mr. Satpal Harsana",
    role: "Co-Founder",
    image: "/about-seed/satpal.webp",
    imagePosition: "object-top",
    bio: "With 15+ years of deep real estate expertise in agricultural farms, farmland development, farmhouses, and R-Zone land, Satpal Harsana brings strong on-ground execution and market understanding. His expertise in land documentation, legal clarity, compliance, and buyer transparency ensures every SEAD development is approached with confidence and trust.",
  },
];

export default function TheFoundersSection() {
  return (
    <section
      id="founders"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[1240px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-4 sm:space-y-5 mb-10 sm:mb-12 md:mb-16"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
              THE FOUNDERS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.18] tracking-[-0.01em] max-w-2xl">
            Built By People Who Believe In
            <br />
            Long-Term Value.
          </h2>
        </motion.div>

        {/* ====================================================== */}
        {/* FOUNDERS GRID                                          */}
        {/* ====================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-[1100px] mx-auto">
          {FOUNDERS.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[#E4EAD9] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col items-center text-center space-y-6 sm:space-y-7 shadow-xs border border-[#D5DDC9]"
            >
              {/* Founder Image */}
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/4.6] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#D3DEC6] shadow-sm">
                <Image
                  src={founder.image}
                  alt={`${founder.name} - ${founder.role} of SEAD Realty`}
                  fill
                  unoptimized
                  className={`object-cover ${founder.imagePosition || "object-center"}`}
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>

              {/* Founder Bio */}
              <p
                style={{ color: "#4A5447" }}
                className="font-sans text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-[1.65] font-normal max-w-[440px]"
              >
                {founder.bio}
              </p>

              {/* Founder Name & Role */}
              <div className="pt-2 flex flex-col items-center space-y-1">
                <h3 className="font-serif !font-normal text-[#1F2922] text-[20px] sm:text-[22px] md:text-[24px] tracking-tight">
                  {founder.name}
                </h3>
                <p
                  style={{ color: "#5C6051" }}
                  className="font-sans text-[12px] sm:text-[13px] font-normal"
                >
                  {founder.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
