"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FarmIcon from "@/components/icons/FarmIcon";

export default function LocationSection() {

  return (
    <section
      id="location"
      className="w-full bg-[#FAF9F5] py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="container max-w-[1400px] px-4 sm:px-6">
        {/* ======================================================== */}
        {/* MOBILE VIEW (< 1024px): Stacked Layout                   */}
        {/* ======================================================== */}
        <div className="flex flex-col space-y-6 md:space-y-8 lg:hidden">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col space-y-3"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-secondary">
              <FarmIcon className="w-4 h-4 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
                LOCATION
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] tracking-[-0.01em]">
              Far Enough To Disconnect.
              <br />
              Close Enough To Keep Coming Back.
            </h2>
          </motion.div>

          {/* Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col space-y-4 text-[#313116]"
          >
            <p>
              A second home only matters if you actually use it. Just 2 hours
              from Delhi and Gurgaon, Nirvaana Hills makes escaping the city
              easy and coming back often.
            </p>
            <p>
              Surrounded by the Aravallis, it feels a world away without ever
              being too far.
            </p>
          </motion.div>

          {/* Landscape Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm isolate bg-[#1F2518]"
          >
            <Image
              src="/homepage/sec7.jpeg"
              alt="Nirvaana Hills Location with Aravalli Hills"
              fill
              unoptimized
              className="object-cover"
            />
          </motion.div>

          {/* CTA Row (Explore Button + WhatsApp Icon Button) */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <Link
              href="/locations"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-[14px] bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] font-normal text-[12px] shadow-sm hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Explore The Location
            </Link>

            <a
              href="https://wa.me/919589585050"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className="w-10 h-10 rounded-[12px] bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] flex items-center justify-center shadow-sm hover:shadow transition-all duration-200 active:scale-95 shrink-0"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#1F2922]"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
              </svg>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (>= 1024px): 2-Column Split Layout          */}
        {/* ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-20">
          {/* Left Column: Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col space-y-6 max-w-xl"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-secondary">
              <FarmIcon className="w-4 h-4 shrink-0" />
              <span className="font-medium tracking-[0.14em] uppercase text-[11px] md:text-[12px]">
                LOCATION
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif !font-normal text-[#1F2922] tracking-[-0.01em]">
              Far Enough To Disconnect.
              <br />
              Close Enough To Keep Coming Back.
            </h2>

            {/* Paragraphs */}
            <div className="flex flex-col space-y-4 text-[#313116]">
              <p>
                A second home only matters if you actually use it. Just 2 hours
                from Delhi and Gurgaon, Nirvaana Hills makes escaping the city
                easy and coming back often.
              </p>
              <p>
                Surrounded by the Aravallis, it feels a world away without ever
                being too far.
              </p>
            </div>

            {/* CTA Row */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/locations"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-[16px] bg-[#AFEB63] hover:bg-[#A3E553] text-[#1F2922] font-normal text-[16px] shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                Explore The Location
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Landscape Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <div className="relative w-full aspect-[16/11] xl:aspect-[16/10] rounded-3xl overflow-hidden shadow-md isolate bg-[#1F2518]">
              <Image
                src="/homepage/sec7.jpeg"
                alt="Nirvaana Hills Location with Aravalli Hills"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 hover:scale-103"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
