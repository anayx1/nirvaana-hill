"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronUp } from "lucide-react";
import BrochureSection from "@/components/sections/BrochureSection";
import SiteVisitSection from "@/components/sections/SiteVisitSection";
import { executeRecaptcha } from "@/lib/recaptcha";

// ========================================================
// FOOTER CONFIGURATION DATA ARRAYS
// ========================================================

export const QUICK_LINKS = [
    { label: "HOME", href: "/" },
    { label: "ABOUT NIRVAANA", href: "/nirvaana-hills" },
    { label: "LOCATION", href: "/locations" },
    { label: "GALLERY & LIFE AT NIRVAANA", href: "/gallery" },
    { label: "ABOUT SEAD", href: "/about-seed" },
    { label: "FAQS", href: "/faqs" },
    { label: "BLOGS", href: "/blogs" },
    { label: "CONTACT US", href: "/contact-us" },
    { label: "CAREERS", href: "/career" },
];

export const LOCATION_INFO = [
    {
        title: "PROJECT SITE",
        lines: [
            "Nirvaana Hills",
            "Akoda, Near Mahendragarh,",
            "Naurangbas Rajputan,",
            "Haryana 127310",
        ],
    },
    {
        title: "SALES OFFICE",
        lines: [
            "812, Magnum Global Park",
            "Golf Course Extension Road, Sector 58",
            "Gurgaon 122011",
        ],
    },
];

export const CONTACT_DETAILS = [
    {
        title: "PHONE/WHATSAPP",
        items: [
            { label: "+91 9589585050", href: "tel:+919589585050" },
            { label: "+91 8480064800", href: "tel:+918480064800" },
        ],
    },
    {
        title: "SALES ENQUIRY",
        items: [
            { label: "info@seadrealty.com", href: "mailto:info@seadrealty.com" },
        ],
    },
    {
        title: "CAREERS",
        items: [
            { label: "hr@seadrealty.com", href: "mailto:hr@seadrealty.com" },
        ],
    },
];

export const WORKING_HOURS = [
    {
        title: "OFFICE HOURS",
        time: "Monday-Saturday (10:00 AM-5:00 PM)",
        note: null,
    },
    {
        title: "SITE VISIT HOURS",
        time: "Monday-Sunday (6:00 AM-4:00 PM)",
        note: "(By prior appointment only)",
    },
];

export const LEGAL_LINKS = [
    { label: "PRIVACY POLICY", href: "/legal#privacy-policy" },
    { label: "TERMS & CONDITIONS", href: "/legal#terms" },
    { label: "DISCLAIMER", href: "/legal#disclaimer" },
    { label: "REFUND POLICY", href: "/legal#refund-policy" },
    { label: "LEGAL DISCLOSURE", href: "/legal#legal-disclosure" },
];

export const SOCIAL_LINKS = [
    {
        id: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/nirvaanahills/?hl=en",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        ),
    },
    {
        id: "facebook",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/sead-realty/posts/?feedView=all",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-2a2 2 0 0 0-2 2v2h-2v3h2v7h3v-7h2.5l.5-3H15v-1.5c0-.5.5-1 1-1h2V8z" />
            </svg>
        ),
    },
    {
        id: "whatsapp",
        label: "WhatsApp",
        href: "https://wa.me/919589585050",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        ),
    },
    {
        id: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/@NirvaanaHills",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="20" height="15" x="2" y="4.5" rx="4" />
                <polygon points="10 9 15 12 10 15 10 9" />
            </svg>
        ),
    },
];

// ========================================================
// FOOTER COMPONENT
// ========================================================

export default function Footer() {
    const pathname = usePathname();
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [loadingNewsletter, setLoadingNewsletter] = useState(false);

    if (pathname && pathname.startsWith("/admin")) {
        return null;
    }

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!newsletterEmail || !newsletterEmail.includes("@")) return;
        setLoadingNewsletter(true);
        try {
            const recaptchaToken = await executeRecaptcha("newsletter_footer");

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: newsletterEmail.trim(),
                    requirement: "Newsletter Subscription",
                    source: "footer-newsletter",
                    recaptchaToken,
                }),
            });
            if (res.ok) {
                setSubscribed(true);
                setTimeout(() => {
                    setSubscribed(false);
                    setNewsletterEmail("");
                }, 4000);
            }
        } catch {
            // Silently handle or keep UI resilient
        } finally {
            setLoadingNewsletter(false);
        }
    };

    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            <BrochureSection />
            <SiteVisitSection />
            <footer className="w-full bg-[#FAF9F5] border-t border-black/5 pt-14 sm:pt-18 md:pt-24 pb-10 text-[#20261A] select-none relative">
                <div className="container max-w-[1400px] px-4 sm:px-6">

                    {/* ======================================================== */}
                    {/* TOP BRAND NARRATIVE & SOCIALS ROW                        */}
                    {/* ======================================================== */}
                    <div className="flex flex-col space-y-6 max-w-4xl mb-12 sm:mb-16">
                        <h2 className="font-serif !font-normal text-[#1F2922] text-[34px] sm:text-[44px] md:text-[50px] tracking-[0.04em] uppercase leading-none">
                            NIRVAANA HILLS
                        </h2>

                        <p className="font-sans text-[#353D2C] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.65] max-w-3xl">
                            A premium 200-acre nature-led farmland community nestled in the
                            Aravalli foothills near Delhi NCR. Designed around family, wellness,
                            meaningful living, and long-term ownership. A Forest Crafted For
                            Living.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-2">
                            <Link
                                href="/contact-us"
                                className="bg-primary hover:bg-[#9EE837] text-[#1F2922] font-medium text-[14px] sm:text-[15px] px-7 py-3 rounded-full transition-all duration-300 shadow-xs active:scale-95"
                            >
                                Book A Site Visit
                            </Link>

                            {/* Social Media Icons (Mapped from SOCIAL_LINKS array) */}
                            <div className="flex items-center gap-2.5">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-full border border-black/40 hover:border-black flex items-center justify-center text-[#20261A] transition-colors"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* 2-COLUMN ON MOBILE / 4-COLUMN ON DESKTOP                 */}
                    {/* ======================================================== */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 xs:gap-x-6 sm:gap-x-8 gap-y-9 sm:gap-y-12 lg:gap-8 pb-12 sm:pb-16 border-b border-black/10">

                        {/* 1. Quick Links (Mapped from QUICK_LINKS array) */}
                        <div className="flex flex-col space-y-3.5 sm:space-y-4 lg:order-1">
                            <h3 className="font-serif italic text-secondary text-[16px] sm:text-[18px] md:text-[20px] font-normal">
                                Quick Links
                            </h3>
                            <ul className="flex flex-col space-y-1">
                                {QUICK_LINKS.map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-[#252B20] hover:text-[#5B8820] tracking-[0.03em] uppercase transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 2. Contact Information & Working Hours (Mapped from CONTACT_DETAILS & WORKING_HOURS) */}
                        <div className="flex flex-col space-y-5 lg:order-3">
                            <h3 className="font-serif italic text-secondary text-[16px] sm:text-[18px] md:text-[20px] font-normal">
                                Contact Information
                            </h3>

                            {CONTACT_DETAILS.map((contact, idx) => (
                                <div key={idx}>
                                    <span className="font-sans text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-[#1F2922] uppercase tracking-[0.05em] block mb-0.5">
                                        {contact.title}
                                    </span>
                                    <div className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-[#424A3B]">
                                        {contact.items.map((item, itemIdx) => (
                                            <a
                                                key={itemIdx}
                                                href={item.href}
                                                className="hover:underline block"
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2">
                                <h4 className="font-serif italic text-secondary text-[15px] sm:text-[16px] md:text-[17px] font-normal mb-1.5">
                                    Working Hours
                                </h4>
                                <div className="space-y-2 text-[12px] sm:text-[13px] md:text-[14px] text-[#424A3B]">
                                    {WORKING_HOURS.map((wh, idx) => (
                                        <div key={idx}>
                                            <span className="font-semibold text-[#1F2922] uppercase block text-[11px] sm:text-[12px] tracking-[0.04em]">
                                                {wh.title}
                                            </span>
                                            <p className="leading-snug">{wh.time}</p>
                                            {wh.note && (
                                                <span className="italic text-[#757D6D] text-[11px] sm:text-[12px] block mt-0.5">
                                                    {wh.note}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3. Location (Mapped from LOCATION_INFO array) */}
                        <div className="flex flex-col space-y-5 sm:space-y-6 lg:order-2">
                            <h3 className="font-serif italic text-secondary text-[16px] sm:text-[18px] md:text-[20px] font-normal">
                                Location
                            </h3>
                            <div className="flex flex-col space-y-4">
                                {LOCATION_INFO.map((loc, idx) => (
                                    <div key={idx} className={idx > 0 ? "pt-1 sm:pt-2" : ""}>
                                        <span className="font-sans text-[11px] sm:text-[12px] md:text-[13px] font-semibold text-[#1F2922] uppercase tracking-[0.05em] block mb-0.5">
                                            {loc.title}
                                        </span>
                                        <p className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-[#424A3B] leading-relaxed">
                                            {loc.lines.map((line, lineIdx) => (
                                                <React.Fragment key={lineIdx}>
                                                    {line}
                                                    {lineIdx < loc.lines.length - 1 && <br />}
                                                </React.Fragment>
                                            ))}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 4. Legal (Mapped from LEGAL_LINKS array) */}
                        <div className="flex flex-col space-y-3.5 sm:space-y-4 lg:order-4">
                            <h3 className="font-serif italic text-secondary text-[16px] sm:text-[18px] md:text-[20px] font-normal">
                                Legal
                            </h3>
                            <ul className="flex flex-col space-y-2 sm:space-y-2.5">
                                {LEGAL_LINKS.map((item, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={item.href}
                                            className="font-sans text-[12px] sm:text-[13px] md:text-[14px] text-[#252B20] hover:text-[#5B8820] tracking-[0.03em] uppercase transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* SUBSCRIBE TO OUR NEWSLETTER                              */}
                    {/* ======================================================== */}
                    <div className="py-5 md:py-10 max-w-xl">
                        <h3 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[28px] md:text-[32px] mb-2 leading-tight">
                            Subscribe to Our Newsletter
                        </h3>
                        <p className="font-sans text-[#424A3B] text-[14px] sm:text-[15px] leading-relaxed mb-5">
                            Stay updated with the latest insights, stories, announcements, and
                            exclusive updates delivered straight to your inbox.
                        </p>

                        <form onSubmit={handleSubscribe} className="relative w-full max-w-[460px]">
                            <input
                                type="email"
                                required
                                placeholder="jane@mail.com"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                className="w-full bg-[#E5E8D8] text-[#20261A] placeholder-[#7E856F] text-[15px] px-6 py-3.5 pr-14 rounded-full border border-[#C6CFB6] focus:outline-none focus:ring-1 focus:ring-[#7E856F]/50 transition-all"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-[#89D038] hover:text-[#6FA825] transition-colors cursor-pointer"
                            >
                                {subscribed ? (
                                    <span className="text-[11px] font-bold text-[#6FA825]">✓</span>
                                ) : (
                                    <ArrowRight className="w-6 h-6" />
                                )}
                            </button>
                        </form>
                    </div>

                    {/* ======================================================== */}
                    {/* LARGE BRAND LOGO                                         */}
                    {/* ======================================================== */}
                    <div className="py-4">
                        <div className="relative w-[220px] sm:w-[280px] md:w-[340px] h-[40px] sm:h-[48px] md:h-[56px]">
                            <Image
                                src="/logo.avif"
                                alt="Nirvaana Hills"
                                fill
                                unoptimized
                                className="object-contain object-left"
                                sizes="(max-width: 768px) 280px, 340px"
                            />
                        </div>
                    </div>

                    {/* ======================================================== */}
                    {/* BOTTOM COPYRIGHT & ATTRIBUTION BAR                       */}
                    {/* ======================================================== */}
                    <div className="pt-6 border-t border-black/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] sm:text-[13px] text-[#555E4E]">
                        <div className="flex flex-col space-y-1.5">
                            <p className="font-sans leading-relaxed">
                                © 2026 Nirvaana Hills | A SEAD Realty Development Built Around
                                Nature. Designed For Generations.
                            </p>
                            <p className="font-sans text-[11px] sm:text-[12px] text-[#6E7766]">
                                Created by{" "}
                                <Link href="https://vikavalabs.com">
                                    <span className="font-medium text-[#20261A]">Vikava Labs</span>
                                </Link>
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                            className="self-end md:self-center p-2 text-[#89D038] hover:text-[#6FA825] transition-colors cursor-pointer"
                        >
                            <ChevronUp className="w-6 h-6 stroke-[2.5]" />
                        </button>
                    </div>
                </div>

            </footer>
        </>
    );
}
