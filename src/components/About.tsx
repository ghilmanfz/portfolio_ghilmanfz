"use client";

import AnimateInView from "./AnimateInView";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function About() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left - Text */}
          <AnimateInView>
            {/* Label badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ color: "rgba(156,163,175,0.7)", fontSize: "9px" }}>◉</span>
              <span
                className="font-mono text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "rgba(156,163,175,0.7)" }}
              >
                About Me
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-black leading-[0.95] mb-5"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)", letterSpacing: "-0.02em" }}
            >
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.9) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {siteData.aboutTitle[0]}
              </span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {siteData.aboutTitle[1]}
              </span>
            </h2>

            {/* Role */}
            <p
              className="font-bold mb-2"
              style={{ color: "#8b5cf6", fontSize: "clamp(1.3rem, 2.5vw, 1.6rem)" }}
            >
              {siteData.aboutRole}
            </p>

            {/* Location */}
            <p
              className="text-sm mb-8"
              style={{ color: "rgba(107,114,128,0.85)" }}
            >
              Based in {siteData.location}
            </p>

            {/* Bio paragraph 1 */}
            <p
              className="font-mono text-sm leading-relaxed mb-5"
              style={{ color: "rgba(156,163,175,0.8)", maxWidth: "500px" }}
            >
              {siteData.aboutBio}
            </p>

            {/* Bio paragraph 2 */}
            <p
              className="font-mono text-sm leading-relaxed mb-10"
              style={{ color: "rgba(107,114,128,0.7)", maxWidth: "500px" }}
            >
              {siteData.aboutBioSecondary}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/work"
                className="btn-soft btn-arrow inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold rounded-xl"
              >
                View my work <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-semibold transition-colors duration-300"
                style={{ color: "rgba(107,114,128,0.7)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(107,114,128,0.7)"; }}
              >
                Get in touch
              </Link>
            </div>
          </AnimateInView>

          {/* Right - Photo */}
          <AnimateInView delay={0.15} className="hidden lg:block">
            <div
              className="relative rounded-3xl overflow-hidden w-full"
              style={{ height: "560px" }}
            >
              {/* Real photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteData.aboutPhoto}
                alt={siteData.name}
                className="w-full h-full object-cover object-top"
                onError={e => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Fallback shown when image missing */}
              <div
                className="absolute inset-0 items-center justify-center hidden"
                style={{
                  background: "linear-gradient(135deg, #0f0f20 0%, #1a1a35 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "1.5rem",
                  display: "none",
                }}
              >
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black text-white"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {siteData.firstName?.[0] ?? "B"}
                </div>
              </div>
            </div>
          </AnimateInView>

        </div>
      </div>
    </section>
  );
}

