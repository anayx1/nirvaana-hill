"use client";

import { getContactContext } from "@/lib/contact-context";
import FormSpamTrap from "@/components/ui/FormSpamTrap";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function SubscribeNewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactContext = getContactContext(e.currentTarget);
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactContext,
          email: email.trim(),
          requirement: "Blog Newsletter Subscription",
          source: "blog-newsletter",
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="w-full bg-[#FAF9F5] py-14 sm:py-18 md:py-22 lg:py-26 text-[#1F2922] select-none"
    >
      <div className="container max-w-[860px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-4 sm:space-y-5 max-w-[680px]"
        >
          {/* Headline */}
          <h2 className="font-serif !font-normal text-[#1F2922] text-[24px] sm:text-[30px] md:text-[36px] leading-[1.2] tracking-[-0.01em]">
            Subscribe to Our Newsletter
          </h2>

          {/* Description */}
          <p
            style={{ color: "#5C6051" }}
            className="font-sans text-[13px] sm:text-[14.5px] md:text-[15.5px] leading-[1.65] font-normal"
          >
            Stay updated with the latest insights, stories, announcements, and
            exclusive updates delivered straight to your inbox.
          </p>

          {/* Email Subscription Form */}
          <div className="pt-3 sm:pt-4 w-full max-w-[620px]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full bg-[#E4EAD9] border border-primary/60 rounded-[20px] sm:rounded-[24px] px-6 py-4 flex items-center gap-3 text-[#1F2922]"
              >
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#1F2922]" strokeWidth={2.5} />
                </div>
                <p className="font-sans text-[15px] sm:text-[16px] font-medium">
                  Thank you for subscribing! We&apos;ll keep you updated.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative w-full">
                <div className="relative flex items-center w-full bg-[#EBF0E2]/80 hover:bg-[#EBF0E2] focus-within:bg-[#FAF9F5] border border-primary rounded-[20px] sm:rounded-[24px] transition-all duration-300 shadow-xs focus-within:shadow-md focus-within:ring-2 focus-within:ring-primary/40">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@mail.com"
                    aria-label="Email Address for Newsletter"
                    className="w-full bg-transparent px-5 sm:px-6 py-4 sm:py-4.5 font-sans text-[15px] sm:text-[16px] text-[#1F2922] placeholder:text-[#5C6051]/60 focus:outline-none pr-16"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-label="Submit Newsletter Subscription"
                    className="absolute right-3 sm:right-4 p-2.5 text-primary hover:text-[#97DB42] transition-transform hover:translate-x-1 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.2} />
                  </button>
                </div>
                <FormSpamTrap />
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
