"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CareerHeroSection() {
  return (
    <section
      id="career-hero"
      className="w-full bg-[#62735B] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden text-white select-none"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* ====================================================== */}
          {/* LEFT COLUMN: Narrative & Info                          */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-white/90">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4.5 h-4.5 sm:w-5 sm:h-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M3 10.5L12 3l9 7.5" />
                <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
                <path d="M3 21c4-2 8-2 12 0" />
                <path d="M9 17c2-1 4-1 6 0" />
              </svg>
              <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px] whitespace-nowrap">
                CAREER
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif !font-normal text-white text-[32px] xs:text-[38px] sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.15] tracking-[-0.01em]">
              Careers at SEAD Realty
            </h1>

            {/* Narrative Body */}
            <div className="space-y-4 font-sans text-white/90 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal">
              <p>
                At SEAD Realty, we&apos;re building more than exceptional real
                estate projects&mdash;we&apos;re building a team of passionate,
                driven, and innovative professionals.
              </p>
              <p>
                Whether you&apos;re an experienced professional or just
                starting your career, you&apos;ll find opportunities to learn,
                grow, and make a meaningful impact in a collaborative work
                environment.
              </p>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Hero Image                               */}
          {/* ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative w-full aspect-[4/3.4] xs:aspect-[4/3.2] sm:aspect-[16/11] lg:aspect-[4/3.2] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl bg-[#2A3426] ring-1 ring-white/10">
              <Image
                src="/careers/hero.webp"
                alt="Careers at SEAD Realty - Collaborative Team Environment"
                fill
                priority
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 650px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
