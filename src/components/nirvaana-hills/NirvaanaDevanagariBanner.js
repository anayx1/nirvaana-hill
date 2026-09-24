"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NirvaanaDevanagariBanner() {
  return (
    <section className="w-full bg-[#FAF9F5] py-8 sm:py-10 md:py-12 lg:py-14 overflow-hidden select-none">
      <div className="container max-w-[1300px] px-4 sm:px-6">
        <div className="relative w-full aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/9] md:aspect-[21/10] lg:h-[560px] rounded-[24px] sm:rounded-[36px] overflow-hidden isolate shadow-lg bg-[#1D2419] group">

          {/* ====================================================== */}
          {/* IMAGE ENTRY: RADIAL BOOM & SCALE IN ANIMATION          */}
          {/* ====================================================== */}
          <motion.div
            initial={{
              scale: 1.18,
              filter: "blur(12px)",
              opacity: 0,
            }}
            whileInView={{
              scale: 1,
              filter: "blur(0px)",
              opacity: 1,
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/nirvaana-hills/niravanabg.png"
              alt="निर्वाणा - Nirvaana Hills Landscape"
              fill
              unoptimized
              priority
              className="object-cover transition-transform duration-1000 ease-out"
              sizes="(max-width: 1400px) 100vw, 1300px"
            />

            {/* Subtle Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25 pointer-events-none" />
          </motion.div>

          {/* ====================================================== */}
          {/* DEVANAGARI TYPOGRAPHY: निर्वाणा                         */}
          {/* ====================================================== */}
          <div className="relative z-10 flex items-center justify-center w-full h-full px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.75, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <h2
                className="font-sans font-bold text-white tracking-wide leading-none select-none text-[64px] xs:text-[84px] sm:text-[112px] md:text-[148px] lg:text-[180px] drop-shadow-[0_8px_36px_rgba(0,0,0,0.5)]"
                style={{
                  textShadow:
                    "0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                निर्वाणा
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
