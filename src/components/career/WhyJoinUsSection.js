"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Trophy,
  Lightbulb,
  Mail,
  TrendingUp,
} from "lucide-react";

const WHY_JOIN_POINTS = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 shrink-0 text-[#2F3E28]"
      >
        <path d="M18 20V4" />
        <path d="M6 20V4" />
        <path d="M6 8h12" />
        <path d="M6 12h12" />
        <path d="M6 16h12" />
      </svg>
    ),
    text: "Growth-oriented work culture",
  },
  {
    icon: (
      <GraduationCap className="w-5 h-5 shrink-0 text-[#2F3E28]" strokeWidth={2} />
    ),
    text: "Learning and development opportunities",
  },
  {
    icon: <Users className="w-5 h-5 shrink-0 text-[#2F3E28]" strokeWidth={2} />,
    text: "Collaborative and supportive team",
  },
  {
    icon: <Trophy className="w-5 h-5 shrink-0 text-[#2F3E28]" strokeWidth={2} />,
    text: "Performance-driven environment",
  },
  {
    icon: (
      <Lightbulb className="w-5 h-5 shrink-0 text-[#2F3E28]" strokeWidth={2} />
    ),
    text: "Opportunity to work on innovative real estate projects",
  },
];

export default function WhyJoinUsSection() {
  return (
    <section
      id="why-join-us"
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-20 overflow-hidden text-[#1F2922] select-none"
    >
      <div className="container max-w-[760px] px-4 sm:px-6 mx-auto space-y-10 sm:space-y-12">
        {/* ======================================================== */}
        {/* CARD 1: WHY JOIN US?                                     */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-[24px] sm:rounded-[32px] bg-[#E5EAD9] p-6 xs:p-8 sm:p-10 border border-[#D5DFC6] shadow-xs"
        >
          <h2 className="font-serif !font-normal text-[#1F2922] text-[22px] sm:text-[26px] md:text-[30px] mb-6 sm:mb-8 leading-tight">
            Why Join Us?
          </h2>

          <div className="space-y-4 sm:space-y-5">
            {WHY_JOIN_POINTS.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3.5 sm:gap-4 text-[#354130]"
              >
                <div className="shrink-0">{point.icon}</div>
                <span className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-snug">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* CURRENT OPENINGS HEADER & WORK DETAILS CARD              */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Current Openings Title & Intro */}
          <div className="space-y-2">
            <h2 className="font-serif !font-normal text-[#1F2922] text-[22px] sm:text-[26px] md:text-[30px] leading-tight">
              Current Openings
            </h2>
            <p className="font-sans text-[#4A5546] text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-relaxed">
              We&apos;re always looking for talented individuals across{" "}
              <span className="font-medium text-[#1F2922]">
                Sales, Marketing, CRM, Finance, HR, Operations, Design,
              </span>{" "}
              and more.
            </p>
          </div>

          {/* Work Details Card */}
          <div className="w-full rounded-[24px] sm:rounded-[32px] bg-[#E5EAD9] p-6 xs:p-8 sm:p-10 border border-[#D5DFC6] shadow-xs space-y-6">
            <div>
              <h3 className="font-serif !font-normal text-[#1F2922] text-[18px] sm:text-[21px] md:text-[24px] leading-tight mb-3">
                Work Details
              </h3>
              <div className="space-y-1 font-sans text-[13px] sm:text-[14.5px] text-[#4A5546] leading-relaxed">
                <p>
                  <strong className="font-normal text-[#2F3E28]">Location:</strong>{" "}
                  Gurugram, Haryana
                </p>
                <p>
                  <strong className="font-normal text-[#2F3E28]">Work Mode:</strong>{" "}
                  Work from office
                </p>
                <p>
                  <strong className="font-normal text-[#2F3E28]">Working Days:</strong>{" "}
                  6 days a week
                </p>
                <p>
                  <strong className="font-normal text-[#2F3E28]">Working Hours:</strong>{" "}
                  10:00 AM &ndash; 7:00 PM
                </p>
              </div>
            </div>

            {/* Divider with subtle accent dots */}
            <div className="relative w-full flex items-center">
              <div className="w-full h-px bg-[#CCD6BD]" />
              <div className="absolute right-0 flex items-center gap-1.5 pl-2 bg-[#E5EAD9]">
                <div className="w-2 h-2 rounded-full bg-[#B8C4A7]" />
                <div className="w-2 h-2 rounded-full bg-[#CCD6BD]" />
              </div>
            </div>

            {/* Email Contact info */}
            <div className="space-y-3 pt-1">
              <p className="font-sans text-[13px] sm:text-[14.5px] text-[#4A5546] leading-relaxed">
                If you believe you&apos;d be a great fit, we&apos;d love to hear
                from you. Apply now by sending your resume to:
              </p>
              <Link
                href="mailto:hr@seadrealty.com"
                className="inline-flex items-center gap-2.5 text-[#1F2922] hover:text-black font-sans font-normal text-[12px] md:text-[16px] group transition-colors"
              >
                <Mail className="w-5 h-5 text-[#2F3E28] transition-transform group-hover:scale-110" />
                <span className="underline underline-offset-4 decoration-[#95A582] group-hover:decoration-[#1F2922]">
                  hr@seadrealty.com
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
