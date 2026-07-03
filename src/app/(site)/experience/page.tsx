"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimateInView from "@/components/AnimateInView";
import { experiences, coreExpertise } from "@/data/experience";
import { Calendar, Download, FileText } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function ExperiencePage() {
  return (
    <div className="relative">
      {/*  HEADER  */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        {/* top center purple glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(99,102,241,0.12) 0%, transparent 65%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-black leading-none mb-8" style={{ letterSpacing: "-0.02em" }}>
              <span className="block text-white" style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}>My</span>
              <span
                className="block"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Experience
              </span>
            </h1>
            <p className="font-mono text-gray-500 text-sm max-w-md mx-auto leading-relaxed mb-10">
              {siteData.experienceDescription}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold"
              >
                <Download size={13} /> Download resume
              </a>
              <Link
                href="/pdf"
                className="btn-soft inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold"
              >
                <FileText size={13} /> Export portfolio PDF
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/*  EXPERIENCE LIST  */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <AnimateInView key={i} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-8 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Top row: bullet + title | period badge */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      {/* gradient square bullet */}
                      <span
                        className="shrink-0 w-2.5 h-2.5 rounded-sm"
                        style={{ background: "rgba(255,255,255,0.3)", marginTop: "3px" }}
                      />
                      <h3 className="text-lg font-black text-white leading-tight">{exp.title}</h3>
                    </div>
                    {/* Period pill */}
                    <div
                      className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-lg text-[11px] font-mono"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      <Calendar size={10} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Company + type badge */}
                  <div className="flex items-center gap-2 mb-6 pl-5">
                    {/* colored dot before company */}
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: "rgba(255,255,255,0.25)" }}
                    />
                    <span className="text-sm font-medium" style={{ color: "#60a5fa" }}>{exp.company}</span>
                    <span
                      className="px-2 py-0.5 rounded text-[9px] font-bold tracking-widest"
                      style={
                        exp.type === "CONTRACT"
                          ? { background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)", color: "#93c5fd" }
                          : { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }
                      }
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 pl-5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed font-mono" style={{ color: "rgba(156,163,175,0.8)" }}>
                        <span className="shrink-0 mt-0.5" style={{ color: "rgba(107,114,128,0.7)" }}></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/*  CORE EXPERTISE  with blue-purple bg transition */}
      <section
        className="py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #080910 0%, #0c0c1a 40%, #0e0c1f 100%)",
        }}
      >
        {/* subtle glow bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(99,102,241,0.1) 0%, transparent 65%)" }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimateInView className="text-center mb-3">
            <h2 className="text-4xl md:text-5xl font-black text-white">Core Expertise</h2>
          </AnimateInView>
          <AnimateInView className="text-center mb-14" delay={0.05}>
            <p className="font-mono text-gray-500 text-sm">Technologies and methodologies I leverage to deliver exceptional results</p>
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coreExpertise.map((area, i) => (
              <AnimateInView key={area.title} delay={i * 0.08}>
                <div
                  className="p-6 rounded-xl transition-all duration-300 hover:border-white/10"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <h3 className="font-bold text-white text-sm mb-4">{area.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
