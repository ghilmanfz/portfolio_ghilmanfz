"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#0a0a12" }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left: blue samar */}
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "-10%",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(ellipse at top left, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        {/* Bottom-right: purple samar */}
        <div
          className="absolute"
          style={{
            bottom: "-10%",
            right: "-10%",
            width: "700px",
            height: "700px",
            background:
              "radial-gradient(ellipse at bottom right, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0.04) 45%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Top content: badge */}
      <div className="relative z-10 flex flex-col items-center pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-white/[0.10] bg-white/[0.03] text-[10px] tracking-[0.22em] uppercase text-gray-400 font-semibold">
            {siteData.badge}
          </span>
        </motion.div>

        {/* Giant Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center select-none w-full px-4"
          style={{ lineHeight: 0.9, letterSpacing: "-0.02em" }}
        >
          {/* "Creative" — solid pure white, non-italic */}
          <div
            className="block text-white font-black"
            style={{ fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 900 }}
          >
            {siteData.heroTitle[0]}
          </div>

          {/* "Web Design." — non-italic, gradient from white → transparent */}
          <div
            className="block font-black"
            style={{
              fontSize: "clamp(4rem, 12vw, 11rem)",
              fontWeight: 900,
              background:
                "linear-gradient(180deg, #d8d8d8 0%, #b0b0b0 30%, rgba(150,150,150,0.50) 65%, rgba(80,80,80,0.08) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {siteData.heroTitle[1]}
          </div>
        </motion.div>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col items-center mt-auto pb-20 pt-10">
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-gray-500 text-sm leading-relaxed text-center max-w-[540px] mx-auto px-6 mb-10"
        >
          {siteData.heroDescription}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 items-center"
        >
          {/* START PROJECT — gradient biru→ungu, rounded-xl */}
          <Link
            href={siteData.heroCTAPrimary.href}
            className="btn-ghost btn-arrow inline-flex items-center gap-2.5 px-9 py-4 text-sm font-semibold rounded-xl"
          >
            {siteData.heroCTAPrimary.label}
            <ArrowRight size={14} />
          </Link>
          {/* PORTFOLIO — soft fill, rounded-xl */}
          <Link
            href={siteData.heroCTASecondary.href}
            className="btn-soft inline-flex items-center px-9 py-4 text-sm font-semibold rounded-xl"
          >
            {siteData.heroCTASecondary.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
