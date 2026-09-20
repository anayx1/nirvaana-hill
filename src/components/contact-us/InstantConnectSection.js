"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowUpRight, Phone, Mail } from "lucide-react";

export const CONNECT_CHANNELS = [
  {
    id: "call-us",
    title: "Call Us",
    subtitle: "Speak directly with our relationship team",
    href: "tel:+919589585050",
    icon: <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#1F2922]" strokeWidth={1.8} />,
  },
  {
    id: "whatsapp",
    title: "Chat On WhatsApp",
    subtitle: "Ask questions instantly, request brochures, or plan your visit",
    href: "https://wa.me/919589585050",
    isExternal: true,
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1F2922"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 sm:w-7 sm:h-7"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Send An Email",
    subtitle: "Prefer writing? Send us your questions anytime",
    href: "mailto:info@seadrealty.com",
    icon: <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-[#1F2922]" strokeWidth={1.8} />,
  },
];

export default function InstantConnectSection() {
  return (
    <section
      id="instant-connect"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[860px] px-4 sm:px-6">
        {/* ====================================================== */}
        {/* SECTION HEADER                                         */}
        {/* ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center space-y-4 sm:space-y-5 mb-10 sm:mb-12 md:mb-14"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-2 text-[#B3482B]">
            <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
              INSTANT CONNECT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[28px] xs:text-[34px] sm:text-[40px] md:text-[46px] leading-[1.15] tracking-[-0.01em]">
            Prefer To Speak First?
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[15px] sm:text-[16px] md:text-[17px] leading-[1.65] font-normal max-w-xl mx-auto"
          >
            Not everyone is ready to schedule a site visit immediately. If
            you&apos;d like to understand the project better, we&apos;re
            available across multiple channels. Choose the conversation that
            feels most comfortable.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* CHANNELS CARDS LIST                                    */}
        {/* ====================================================== */}
        <div className="flex flex-col space-y-4 sm:space-y-5 max-w-[720px] mx-auto">
          {CONNECT_CHANNELS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="group w-full bg-[#E4EAD9] hover:bg-[#DEE5D2] border border-[#D5DDC9] rounded-[22px] sm:rounded-[28px] p-4 sm:p-5 md:p-6 flex items-center justify-between transition-all duration-300 shadow-xs hover:shadow-md active:scale-[0.99]"
              >
                {/* Left Content with Channel Icon & Text */}
                <div className="flex items-center gap-3.5 sm:gap-4 md:gap-5 min-w-0">
                  {/* Rounded Lime Icon Box */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[14px] sm:rounded-[18px] bg-primary flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col min-w-0 pr-2">
                    <span
                      style={{ color: "#5C6051" }}
                      className="font-sans text-[12px] sm:text-[13px] font-normal truncate"
                    >
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif !font-normal text-[#1F2922] text-[18px] sm:text-[20px] md:text-[22px] tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Right Arrow CTA Box */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-[18px] bg-primary flex items-center justify-center text-[#1F2922] shrink-0 shadow-xs group-hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.2}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
