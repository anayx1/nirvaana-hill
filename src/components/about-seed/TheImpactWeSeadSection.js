"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Mountain,
  Handshake,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export const IMPACT_CARDS = [
  {
    id: "tree-plantation",
    icon: Leaf,
    title: "Tree Plantation & Biodiversity",
    description:
      "An ambitious plantation vision to strengthen greener ecosystems and restore biodiversity around Nirvaana Hills",
  },
  {
    id: "restoring-aravallis",
    icon: Mountain,
    title: "Restoring The Aravallis",
    description:
      "Native plantation efforts focused on ecological restoration and increasing green cover",
  },
  {
    id: "community-contributions",
    icon: Handshake,
    title: "Community Contributions",
    description:
      "Supporting education and social development through Muskaan Care Foundation",
  },
  {
    id: "supporting-local",
    icon: Users,
    title: "Supporting Local Communities",
    description:
      "Strengthening nearby schools, healthcare access, and essential infrastructure",
  },
  {
    id: "employment-generation",
    icon: Briefcase,
    title: "Employment Generation",
    description:
      "Sustainable livelihoods through local hiring and skill development",
  },
  {
    id: "women-empowerment",
    icon: TrendingUp,
    title: "Women Empowerment",
    description:
      "Access to opportunity, skill development, independence, and long-term participation in community growth",
  },
];

export default function TheImpactWeSeadSection() {
  return (
    <section
      id="impact-we-sead"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none overflow-visible"
    >
      <div className="container max-w-[1200px] px-4 sm:px-6">
        {/* ====================================================== */}
        {/* SECTION HEADER                                         */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-4 sm:space-y-5 mb-12 sm:mb-16 md:mb-20 max-w-2xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
              THE IMPACT WE SEAD
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em]">
            SEADing Goodness For Generations.
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
          >
            Every project should create environmental, social, and community
            impact that benefits generations long after us.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* STACKING CARDS CONTAINER (Matching WhatMakesDifferent) */}
        {/* ====================================================== */}
        <div className="relative max-w-[680px] md:max-w-[760px] mx-auto flex flex-col pb-[200px] sm:pb-[220px] md:pb-[230px]">
          {IMPACT_CARDS.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                style={{ zIndex: index + 1 }}
                className="sticky top-20 sm:top-24 md:top-28 w-full mb-8 sm:mb-12 md:mb-16"
              >
                <div className="w-full h-[225px] xs:h-[240px] sm:h-[265px] md:h-[285px] rounded-[22px] sm:rounded-[28px] bg-[#E4EAD9] p-5 xs:p-6 sm:p-7 md:p-8 border border-black/5 shadow-none flex flex-col justify-between">
                  {/* Top Icon */}
                  <div className="flex items-center">
                    <IconComponent
                      className="w-8 h-8 sm:w-9 sm:h-9 text-[#1F2922]"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Bottom Text Content */}
                  <div className="flex flex-col space-y-1.5 sm:space-y-2">
                    <h3 className="font-serif !font-normal text-[#1F2922] text-[18px] sm:text-[20px] md:text-[22px] leading-snug">
                      {card.title}
                    </h3>
                    <p
                      style={{ color: "#5C6051" }}
                      className="font-sans text-[12.5px] sm:text-[13.5px] md:text-[14px] leading-relaxed font-normal"
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ====================================================== */}
        {/* NON-STACKING CONCLUDING LEGACY CARD                    */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-[680px] md:max-w-[740px] mx-auto w-full -mt-[170px] sm:-mt-[190px] md:-mt-[200px]"
        >
          <div className="w-full rounded-[24px] sm:rounded-[32px] bg-[#62735B] p-7 sm:p-9 md:p-11 text-white shadow-lg flex flex-col justify-between space-y-4 sm:space-y-5">
            <h3 className="font-serif !font-normal text-white text-[18px] sm:text-[20px] md:text-[22px] tracking-tight">
              A Legacy Of Impact
            </h3>

            <p className="font-sans text-white/90 text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal">
              An investment at Nirvaana Hills creates value beyond financial
              returns - because meaningful growth should benefit everyone
              connected to it.
            </p>

            <p className="font-sans font-medium text-white text-[14px] sm:text-[15px] md:text-[16px] pt-1">
              Thoughtfully Creating Value For Generations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
