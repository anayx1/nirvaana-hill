"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Headphones,
  HandHeart,
  Handshake,
  Users,
  Briefcase,
} from "lucide-react";
import FarmIcon from "@/components/icons/FarmIcon";

export const DIRECTORY_ITEMS = [
  {
    id: "sales",
    title: "Sales",
    icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F2922]" strokeWidth={1.8} />,
    lines: (
      <>
        <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-[14.5px] text-[#4A5447]">
          <Link href="tel:+919589585050" className="hover:text-primary transition-colors">
            +91 9589585050
          </Link>
          <span>·</span>
          <Link href="tel:+918480064800" className="hover:text-primary transition-colors">
            +91 8480064800
          </Link>
        </div>
        <div>
          <Link
            href="mailto:info@seadrealty.com"
            className="text-[13px] sm:text-[14px] text-[#5C6051] hover:text-primary transition-colors"
          >
            info@seadrealty.com
          </Link>
        </div>
      </>
    ),
  },
  {
    id: "whatsapp",
    title: "WhatsApp Support",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1F2922"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 sm:w-6 sm:h-6"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    lines: (
      <div className="flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-[14.5px] text-[#4A5447]">
        <Link
          href="https://wa.me/919589585050"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          +91 9589585050
        </Link>
        <span>·</span>
        <Link
          href="https://wa.me/919910012391"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          +91 9910012391
        </Link>
      </div>
    ),
  },
  {
    id: "social-impact",
    title: "Social Impact & Foundation",
    icon: <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F2922]" strokeWidth={1.8} />,
    lines: (
      <div>
        <Link
          href="mailto:impact@seadrealty.com"
          className="text-[13.5px] sm:text-[14.5px] text-[#5C6051] hover:text-primary transition-colors"
        >
          impact@seadrealty.com
        </Link>
      </div>
    ),
  },
  {
    id: "partnerships",
    title: "Business Partnerships",
    icon: <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F2922]" strokeWidth={1.8} />,
    lines: (
      <>
        <div>
          <Link
            href="tel:+918585955580"
            className="text-[13.5px] sm:text-[14.5px] text-[#4A5447] hover:text-primary transition-colors"
          >
            +91 8585955580
          </Link>
        </div>
        <div>
          <Link
            href="mailto:muskaan@seadrealty.com"
            className="text-[13px] sm:text-[14px] text-[#5C6051] hover:text-primary transition-colors"
          >
            muskaan@seadrealty.com
          </Link>
        </div>
      </>
    ),
  },
  {
    id: "channel-partner",
    title: "Channel Partner Relations",
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F2922]" strokeWidth={1.8} />,
    lines: (
      <>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#1F2922] font-medium">
          Mr. Puneet Anand
        </p>
        <div>
          <Link
            href="tel:+918480064800"
            className="text-[13.5px] sm:text-[14.5px] text-[#4A5447] hover:text-primary transition-colors"
          >
            +91 8480064800
          </Link>
        </div>
      </>
    ),
  },
  {
    id: "careers",
    title: "HR & Careers",
    icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-[#1F2922]" strokeWidth={1.8} />,
    lines: (
      <div>
        <Link
          href="mailto:hr@seadrealty.com"
          className="text-[13.5px] sm:text-[14.5px] text-[#5C6051] hover:text-primary transition-colors"
        >
          hr@seadrealty.com
        </Link>
      </div>
    ),
  },
];

export default function VisitNirvaanaSection() {
  return (
    <section
      id="visit-nirvaana"
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
          className="flex flex-col space-y-4 sm:space-y-5 mb-10 sm:mb-12"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[#B3482B]">
            <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
            <span className="font-medium tracking-[0.14em] uppercase text-[11px] sm:text-[12px]">
              VISIT NIRVAANA
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.15] tracking-[-0.01em]">
            See It For Yourself.
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal max-w-2xl"
          >
            Some things are better experienced than explained. Walk the land.
            Explore the surroundings. See the progress. Take your time.
          </p>
        </motion.div>

        {/* ====================================================== */}
        {/* CARDS LIST                                             */}
        {/* ====================================================== */}
        <div className="flex flex-col space-y-6 sm:space-y-8">

          {/* ---------------- CARD 1: PROJECT SITE ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-[#E4EAD9] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#D5DDC9] shadow-xs flex flex-col space-y-4"
          >
            <h3 className="font-serif !font-normal text-[#1F2922] text-[19px] sm:text-[22px] md:text-[24px]">
              Project Site
            </h3>

            <div
              style={{ color: "#4A5447" }}
              className="font-sans text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-[1.6] space-y-0.5"
            >
              <p className="font-medium text-[#1F2922]">Nirvaana Hills</p>
              <p>Akoda, Near Mahendragarh,</p>
              <p>Naurangbas Rajputan, Haryana – 127310</p>
            </div>

            {/* Decorative Divider with 2 Dots */}
            <div className="flex items-center gap-2 py-2">
              <div className="flex-1 h-[1px] bg-[#D5DDC9]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D5DDC9]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D5DDC9]" />
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Nirvaana+Hills+by+SEAD+Realty&query_place_id=ChIJOSPvPKyJRW0RlOh5Pwjdzb4"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
              >
                Map Location
              </Link>
            </div>

            {/* Nirvaana Hills Interactive Google Map */}
            <div className="relative w-full aspect-[4/3] xs:aspect-[4/3.2] sm:aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#D3DEC6] shadow-sm mt-3 ring-1 ring-black/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.508893632435!2d76.0706328!3d28.403897599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d45898c3ccf2339%3A0xbcdd42083f79e894!2sNirvaana%20Hills%20by%20SEAD%20Realty!5e0!3m2!1sen!2sin!4v1790501903936!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Nirvaana Hills by SEAD Realty Google Maps"
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* ---------------- CARD 2: SALES OFFICE & WORKING HOURS ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-[#E4EAD9] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#D5DDC9] shadow-xs flex flex-col space-y-5"
          >
            {/* Sales Office */}
            <div className="space-y-2">
              <h3 className="font-serif !font-normal text-[#1F2922] text-[19px] sm:text-[22px] md:text-[24px]">
                Sales Office
              </h3>
              <div
                style={{ color: "#4A5447" }}
                className="font-sans text-[13.5px] sm:text-[14.5px] md:text-[15px] leading-[1.6] space-y-0.5"
              >
                <p className="font-medium text-[#1F2922]">SEAD Realty</p>
                <p>812, Magnum Global Park,</p>
                <p>Golf Course Extension Road, Sector 58,</p>
                <p>Gurgaon – 122011</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="space-y-2 pt-2">
              <h4 className="font-serif !font-normal text-[#1F2922] text-[17px] sm:text-[19px] md:text-[21px]">
                Working Hours
              </h4>
              <div
                style={{ color: "#4A5447" }}
                className="font-sans text-[13px] sm:text-[14px] md:text-[14.5px] leading-[1.65] space-y-1"
              >
                <p>
                  <strong className="text-[#1F2922] font-semibold">Office Hours:</strong>{" "}
                  Monday-Saturday, 10:00 AM - 7:00 PM
                </p>
                <p>
                  <strong className="text-[#1F2922] font-semibold">Site Visits:</strong>{" "}
                  Monday-Sunday (6:00 AM-4:00 PM)
                </p>
                <p className="italic text-[#5C6051] text-[12.5px] sm:text-[13px]">
                  (By prior appointment only)
                </p>
              </div>
            </div>

            {/* Decorative Divider with 2 Dots */}
            <div className="flex items-center gap-2 py-2">
              <div className="flex-1 h-[1px] bg-[#D5DDC9]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D5DDC9]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#D5DDC9]" />
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="https://www.google.com/maps/search/?api=1&query=SEAD+Realty&query_place_id=ChIJVytZXz4xDToRA0JMOmLWkzM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-normal text-[12px] md:text-[16px] px-6 py-2.5 md:px-8 md:py-3.5 rounded-[14px] md:rounded-[16px] transition-all duration-300 shadow-xs active:scale-95 inline-flex items-center justify-center text-center"
              >
                Get Directions To Our Office
              </Link>
            </div>

            {/* SEAD Realty Interactive Google Map */}
            <div className="relative w-full aspect-[4/3] xs:aspect-[4/3.2] sm:aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#D3DEC6] shadow-sm mt-3 ring-1 ring-black/5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d33385.22319188453!2d77.05148373641299!3d28.413543965116855!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d213e5f592b57%3A0x3393d6823a4c4203!2sSEAD%20Realty!5e0!3m2!1sen!2sin!4v1790502054317!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="SEAD Realty Sales Office Google Maps"
                className="w-full h-full"
              />
            </div>

            {/* Sales Office Lobby Photo */}
            <div className="relative w-full aspect-[4/3] xs:aspect-[4/3.2] sm:aspect-[16/10] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#D3DEC6] shadow-sm mt-3 ring-1 ring-black/5">
              <Image
                src="/contact-us/sales-office.webp"
                alt="SEAD Realty Sales Office Reception Lobby at Magnum Global Park"
                fill
                unoptimized
                className="object-cover object-center"
                sizes="(max-width: 860px) 100vw, 760px"
              />
            </div>
          </motion.div>

          {/* ---------------- CARD 3: CONTACT DIRECTORY ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-[#E4EAD9] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#D5DDC9] shadow-xs flex flex-col space-y-6"
          >
            {/* Header */}
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 text-[#B3482B]">
                <FarmIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                <span className="font-semibold tracking-[0.14em] uppercase text-[12px] sm:text-[13px]">
                  CONTACT DIRECTORY
                </span>
              </div>
              <h3 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[28px] md:text-[32px] leading-tight">
                Multiple Ways To Reach Us.
              </h3>
              <p
                style={{ color: "#5C6051" }}
                className="font-sans text-[14px] sm:text-[15px] leading-[1.6] font-normal"
              >
                Connect directly with the right team based on what you need.
              </p>
            </div>

            {/* Directory Entries List */}
            <div className="flex flex-col space-y-5 pt-2">
              {DIRECTORY_ITEMS.map((item) => (
                <div key={item.id} className="flex items-start gap-3.5 sm:gap-4">
                  {/* Rounded Lime Green Icon Square */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-[16px] bg-primary flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    {item.icon}
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col space-y-0.5 min-w-0">
                    <h4 className="font-serif !font-normal text-[#1F2922] text-[17px] sm:text-[19px] leading-tight">
                      {item.title}
                    </h4>
                    <div className="pt-0.5">{item.lines}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
