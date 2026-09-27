"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export const LIFE_AT_NIRVAANA_ITEMS = [
  {
    id: "belonging",
    title: "Belonging",
    description:
      "Some communities are occupied; others feel lived in. Life here is built around genuine connection, shared celebrations, and neighbourhoods that feel personal.",
  },
  {
    id: "grow-wild",
    title: "Grow Wild. Grow Free.",
    description:
      "Open skies, mud on their hands, trees to climb. Childhood returns to what it was always meant to be - natural, playful, unrestricted.",
  },
  {
    id: "built-around-nature",
    title: "Built Around Nature",
    description:
      "Not a feature here, the foundation. Tree-lined pathways, organic farming, natural materials that age beautifully - simply a gentler way to live.",
  },
  {
    id: "wellness",
    title: "Wellness",
    description:
      "Not an escape, just part of the day. Slower mornings, unrushed meals, balance that returns through environment, not effort.",
  },
  {
    id: "work-life-balance",
    title: "Work-Life Balance",
    description:
      "A different rhythm from constant notifications and urgency. Far enough to breathe, close enough that nothing has to change.",
  },
  {
    id: "restart-life",
    title: "Restart Life Together",
    description:
      "Imagine buying farm with friends, spontaneous dinners, children growing up together, and festivals under open skies. Sometimes, the best life is the one you share.",
  },
  {
    id: "the-legacy",
    title: "The Legacy",
    description:
      "Children won't remember the meetings you attended. They'll remember planting their first tree, bonfires with friends. The most meaningful things families pass on are memories, not possessions.",
  },
];

export default function LifeAtNirvaanaSection() {
  // Allow multiple open items or toggling individual items
  const [openItems, setOpenItems] = useState({
    belonging: true,
  });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="life-at-nirvaana"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-24 text-[#1F2922]"
    >
      <div className="container max-w-[900px] px-4 sm:px-6 flex flex-col items-center">

        {/* ====================================================== */}
        {/* HEADER BLOCK                                           */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center space-y-3 sm:space-y-4 max-w-2xl mb-8 sm:mb-10 text-center"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              LIFE AT NIRVAANA
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em]">
            A Life That Grows Richer With Time.
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal pt-1 max-w-xl"
          >
            Some places are visited. Some quietly become part of your story. Life here isn&apos;t measured by how much happens, but by what matters - long mornings, children growing up outdoors, time with people who matter most. Because the best places change how life feels.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* INTERACTIVE ACCORDION CARD WITH BG IMAGE              */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[640px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E5E8D8] relative bg-[#1E2519]"
        >
          {/* Background Image */}
          <Image
            src="/gallery/life-at-nirvaana.webp"
            alt="Life at Nirvaana Hills community, meadows, chalets and people"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
            priority
          />

          {/* Contrast Tint Overlay: Left-to-Right from Dark Primary to Transparent */}
          <div
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              background:
                "linear-gradient(90deg, rgba(28, 38, 20, 0.97) 0%, rgba(28, 38, 20, 0.88) 15%, rgba(28, 38, 20, 0.35) 78%, rgba(28, 38, 20, 0) 100%)",
            }}
          />
          {/* Subtle base vignette for extra mobile legibility */}
          <div
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(28, 38, 20, 0.3) 0%, rgba(28, 38, 20, 0.1) 50%, rgba(28, 38, 20, 0.45) 100%)",
            }}
          />

          {/* Accordion Content List */}
          <div className="relative z-10 p-5 sm:p-7 md:p-8 flex flex-col">
            {LIFE_AT_NIRVAANA_ITEMS.map((item, index) => {
              const isOpen = Boolean(openItems[item.id]);
              const isLast = index === LIFE_AT_NIRVAANA_ITEMS.length - 1;

              return (
                <div
                  key={item.id}
                  className={`transition-colors duration-200 ${!isLast ? "border-b border-[#AFEB63]/30" : ""
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-3.5 sm:py-4 flex items-center justify-between text-left group cursor-pointer focus:outline-hidden"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-[18px] sm:text-[21px] text-white tracking-[-0.01em] group-hover:text-[#AFEB63] transition-colors pr-4 font-normal">
                      {item.title}
                    </span>

                    <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/60 group-hover:border-[#AFEB63] flex items-center justify-center text-white group-hover:text-[#AFEB63] transition-all">
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.2]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.2]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-[13px] sm:text-[14px] leading-[1.65] text-[#F3F5EC] pb-4 sm:pb-5 font-normal">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
