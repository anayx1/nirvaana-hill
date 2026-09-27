"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail, MessageCircle } from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export const CONNECT_CHANNELS = [
  {
    id: "call-us",
    title: "Call Us",
    subtitle: "Speak directly with our relationship team",
    href: "tel:+919589585050",
    icon: <Phone className="w-3 h-3 sm:w-7 sm:h-7 text-[#1F2922]" strokeWidth={1.8} />,
  },
  {
    id: "whatsapp",
    title: "Chat On WhatsApp",
    subtitle: "Ask questions instantly, request brochures, or plan your visit",
    href: "https://wa.me/919589585050",
    isExternal: true,

    icon: <MessageCircle className="w-3 h-3 sm:w-7 sm:h-7 text-[#1F2922]" strokeWidth={1.8} />,
  },
  {
    id: "email",
    title: "Send An Email",
    subtitle: "Prefer writing? Send us your questions anytime",
    href: "mailto:info@seadrealty.com",
    icon: <Mail className="w-3 h-3 sm:w-7 sm:h-7 text-[#1F2922]" strokeWidth={1.8} />,
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
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              INSTANT CONNECT
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em]">
            Prefer To Speak First?
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal max-w-xl mx-auto"
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
        <div className="flex flex-col space-y-4 sm:space-y-5 max-w-[720px] mx-auto pr-3 sm:pr-6">
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
              className="relative"
            >
              <Link
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="group relative w-full bg-[#E4EAD9] hover:bg-[#DEE5D2] border border-[#D5DDC9] rounded-[20px] sm:rounded-[28px] p-3.5 sm:p-5 md:p-6 pr-8 sm:pr-12 flex items-center justify-between transition-all duration-300 shadow-xs hover:shadow-md active:scale-[0.99]"
              >
                {/* Left Content with Channel Icon & Text */}
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0 flex-1">
                  {/* Rounded Lime Icon Box */}
                  <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-[10px] sm:rounded-[18px] bg-primary flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col min-w-0 pr-1">
                    <span
                      style={{ color: "#5C6051" }}
                      className="font-sans text-[10px] sm:text-[12.5px] font-normal leading-tight sm:leading-normal"
                    >
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif !font-normal text-[#1F2922] text-[15px] xs:text-[17px] sm:text-[19px] md:text-[21px] tracking-tight leading-tight mt-0.5 sm:mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Right Arrow CTA Box Floating Off Edge */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-[12px] sm:rounded-[18px] bg-primary flex items-center justify-center text-[#1F2922] shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight
                    className="w-4.5 h-4.5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
