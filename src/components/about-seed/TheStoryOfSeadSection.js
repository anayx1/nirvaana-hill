"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, HandHeart, Palmtree } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export const STORY_HIGHLIGHTS = [
  {
    id: "legacy",
    title: "20+ Years of Legacy",
    icon: <Handshake className="w-9 h-9 sm:w-10 sm:h-10 text-[#1F2922]" strokeWidth={1} />,
  },
  {
    id: "relationships",
    title: "Trusted Relationships Across Generations",
    icon: <HandHeart className="w-9 h-9 sm:w-10 sm:h-10 text-[#1F2922]" strokeWidth={1} />,
  },
  {
    id: "development",
    title: "Nature-Led Land Development",
    icon: <Palmtree className="w-9 h-9 sm:w-10 sm:h-10 text-[#1F2922]" strokeWidth={1} />,
  },
];

export default function TheStoryOfSeadSection() {
  return (
    <section
      id="story-of-sead"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[860px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-6 sm:space-y-7 md:space-y-8"
        >
          {/* ====================================================== */}
          {/* SEAD REALTY BRAND LOGO                                 */}
          {/* ====================================================== */}
          <div className="relative w-[110px] sm:w-[125px] md:w-[140px] h-[55px] sm:h-[62px] md:h-[70px] flex items-center justify-center">
            <Image
              src="/about-seed/seed-logo.avif"
              alt="SEAD Realty Logo"
              width={140}
              height={70}
              unoptimized
              className="w-auto h-full object-contain"
            />
          </div>

          {/* ====================================================== */}
          {/* EYEBROW                                                */}
          {/* ====================================================== */}
          <div className="inline-flex items-center justify-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
              THE STORY OF SEAD REALTY
            </span>
          </div>

          {/* ====================================================== */}
          {/* HEADLINE                                               */}
          {/* ====================================================== */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.18] tracking-[-0.01em]">
            A Journey Built Over Two Decades.
          </h2>

          {/* ====================================================== */}
          {/* NARRATIVE PARAGRAPHS                                   */}
          {/* ====================================================== */}
          <div className="flex flex-col space-y-4 max-w-[740px] mx-auto">
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
            >
              SEAD Realty&apos;s roots trace back over 2 decades to Shreeram
              Estates &amp; Developers, a real estate advisory business built on
              trust and long-term thinking, which grew into a full-scale brand
              across Delhi NCR.
            </p>
            <p
              style={{ color: "#5C6051" }}
              className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
            >
              Experience revealed a deeper truth: families wanted healthier
              environments and a real way to reconnect with life. That shift
              became SEAD Realty - known today for transparency, ethics, and
              relationships that go beyond transactions.
            </p>
          </div>

          {/* ====================================================== */}
          {/* 3 HIGHLIGHTS / PILLARS                                 */}
          {/* ====================================================== */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 max-w-[680px] w-full pt-2 sm:pt-4">
            {STORY_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3"
              >
                <div className="flex items-center justify-center h-10 sm:h-12">
                  {item.icon}
                </div>
                <p className="font-sans text-[11px] sm:text-[12px] md:text-[13px] font-normal text-[#1F2922] leading-[1.3] max-w-[150px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* ====================================================== */}
          {/* CTA BUTTON                                             */}
          {/* ====================================================== */}
          <div className="pt-3 sm:pt-5">
            <Link
              href="/nirvaana-hills"
              className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
            >
              Explore Nirvaana Hills
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
