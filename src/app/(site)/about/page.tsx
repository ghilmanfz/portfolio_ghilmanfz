"use client";

import { motion } from "framer-motion";
import AnimateInView from "@/components/AnimateInView";
import { experiences } from "@/data/experience";
import Link from "next/link";
import { ArrowRight, Zap, FolderOpen, Users } from "lucide-react";
import { Code, Server, Palette, Bot } from "lucide-react";
import Image from "next/image";
import { siteData } from "@/data/siteData";

const stats = [
  { icon: Zap, value: "5+", label: "Years Experience" },
  { icon: FolderOpen, value: "9+", label: "Projects in Career" },
  { icon: Users, value: "25+", label: "Happy Clients" },
];

const techCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    items: [
      { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript" },
      { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
      { name: "React", icon: "https://cdn.simpleicons.org/react" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
      { name: "TanStack", icon: "https://cdn.simpleicons.org/reactquery" },
      { name: "HTML5", icon: "https://cdn.simpleicons.org/html5" },
      { name: "CSS3", icon: "https://cdn.simpleicons.org/css3" },
      { name: "SCSS", icon: "https://cdn.simpleicons.org/sass" },
      { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
      { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap" },
      { name: "Material UI", icon: "https://cdn.simpleicons.org/mui" },
      { name: "Shadcn UI", icon: "https://cdn.simpleicons.org/shadcnui/white" },
      { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/white" },
      { name: "Motion", icon: "https://cdn.simpleicons.org/framer/white" },
      { name: "GSAP", icon: "https://cdn.simpleicons.org/gsap" },
      { name: "Expo", icon: "https://cdn.simpleicons.org/expo/white" },
    ],
  },
  {
    title: "Backend Development",
    icon: Server,
    items: [
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs" },
      { name: "Express", icon: "https://cdn.simpleicons.org/express/white" },
      { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb" },
      { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql" },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase" },
      { name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle" },
      { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
      { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/white" },
    ],
  },
  {
    title: "Design",
    icon: Palette,
    items: [
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma" },
      { name: "Adobe Photoshop", icon: "https://cdn.simpleicons.org/adobephotoshop" },
      { name: "Adobe Illustrator", icon: "https://cdn.simpleicons.org/adobeillustrator" },
      { name: "Adobe XD", icon: "https://cdn.simpleicons.org/adobexd" },
      { name: "Canva", icon: "https://cdn.simpleicons.org/canva" },
      { name: "Webflow", icon: "https://cdn.simpleicons.org/webflow" },
      { name: "WordPress", icon: "https://cdn.simpleicons.org/wordpress" },
      { name: "Wix", icon: "https://cdn.simpleicons.org/wix/white" },
      { name: "Elementor", icon: "https://cdn.simpleicons.org/elementor" },
    ],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    items: [
      { name: "ChatGPT", icon: "https://cdn.simpleicons.org/openai/white" },
      { name: "Claude", icon: "https://cdn.simpleicons.org/anthropic/white" },
      { name: "Zapier", icon: "https://cdn.simpleicons.org/zapier" },
    ],
  },
];

const values = [
  {
    icon: Code,
    title: "Design Excellence",
    desc: "Every pixel matters. I combine aesthetic sensibility with functional design to create visually stunning experiences.",
  },
  {
    icon: Server,
    title: "Clean Code",
    desc: "Readable, maintainable, and performant code is the foundation of every successful project.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Staying ahead of the curve with the latest technologies and best practices to set development.",
  },
];

function GradientTitle({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2 className="font-black leading-tight text-center" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
      <span className="block text-white">{line1}</span>
      <span
        className="block"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.12) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {line2}
      </span>
    </h2>
  );
}

export default function AboutPage() {
  const shownExperiences = experiences.slice(0, 3);

  return (
    <div>
      {/*  HERO  */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
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
              <h1
                className="font-black leading-[0.95] mb-5"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.02em" }}
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
                  Hey, I&apos;m
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
              </h1>

              {/* Role */}
              <p
                className="font-bold mb-2"
                style={{ color: "#8b5cf6", fontSize: "clamp(1.4rem, 3vw, 1.75rem)" }}
              >
                {siteData.aboutRole}
              </p>

              {/* Location */}
              <p className="text-sm mb-8" style={{ color: "rgba(107,114,128,0.8)" }}>
                Based in {siteData.location}
              </p>

              {/* Bio paragraphs — font mono */}
              <p
                className="font-mono text-sm leading-relaxed mb-5"
                style={{ color: "rgba(156,163,175,0.75)", maxWidth: "520px" }}
              >
                {siteData.aboutBio}
              </p>
              <p
                className="font-mono text-sm leading-relaxed mb-10"
                style={{ color: "rgba(107,114,128,0.65)", maxWidth: "520px" }}
              >
                {siteData.aboutBioSecondary}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  View My Work <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="text-xs font-bold tracking-widest uppercase transition-colors"
                  style={{ color: "rgba(107,114,128,0.7)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(107,114,128,0.7)"; }}
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>

            {/* Right: Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden lg:flex justify-end"
            >
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  height: "420px",
                  background: "linear-gradient(135deg, #0d0d1a 0%, #111128 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Photo placeholder — replace src with real photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteData.aboutPhoto}
                  alt={siteData.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                {/* Fallback shown when image missing */}
                <div
                  className="absolute inset-0 items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a30 100%)",
                    display: "none",
                  }}
                >
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                  >
                    {siteData.firstName[0]}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/*  STATS  */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateInView className="text-center mb-4">
            <span className="section-label">By The Numbers</span>
          </AnimateInView>
          <AnimateInView className="text-center mb-16" delay={0.05}>
            <GradientTitle line1="Experience That" line2="Speaks" />
          </AnimateInView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <AnimateInView key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-5xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/*  STORY  */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimateInView className="mb-4">
            <span className="section-label">My Story</span>
          </AnimateInView>
          <AnimateInView className="mb-12" delay={0.05}>
            <GradientTitle line1="From Design to" line2="Development" />
          </AnimateInView>
          <AnimateInView delay={0.1}>
            <div className="space-y-4 text-gray-500 text-sm leading-relaxed font-mono text-left">
              <p>
                My journey began in Baton Rouge, Louisiana, where I discovered my passion for visual storytelling through Graphic Design and Animation. This creative foundation gave me a unique perspective on user experience and visual communication.
              </p>
              <p>
                Over the past 5 years, I&apos;ve transitioned from pure design work to Frontend Development, combining my artistic eye with technical expertise. This dual background allows me to create websites that are not only visually stunning but also performant and user-friendly.
              </p>
              <p>
                Today, based in Phoenix, Arizona, I specialize in building modern web applications using React, Next.js, and Tailwind CSS. Every project is an opportunity to push boundaries, solve complex problems, and deliver digital experiences that make a real impact.
              </p>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/*  TECHNOLOGIES  */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimateInView className="text-center mb-4">
            <span className="section-label">Technologies</span>
          </AnimateInView>
          <AnimateInView className="text-center mb-4" delay={0.05}>
            <GradientTitle line1="Tools &" line2="Technologies" />
          </AnimateInView>
          <AnimateInView className="text-center mb-16" delay={0.1}>
            <p className="font-mono text-gray-500 text-sm max-w-sm mx-auto">A super-diverse toolkit for building modern, scalable web applications.</p>
          </AnimateInView>

          <div className="space-y-10">
            {techCategories.map((cat, ci) => (
              <AnimateInView key={cat.title} delay={ci * 0.07}>
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <cat.icon size={16} className="text-gray-500" />
                    <h3 className="text-sm font-bold text-white">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 hover:border-purple-500/30"
                        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        <Image src={item.icon} alt={item.name} width={16} height={16} className="object-contain" unoptimized />
                        <span className="text-xs text-gray-400">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/*  CAREER HIGHLIGHTS  */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateInView className="text-center mb-4">
            <span className="section-label">Experience</span>
          </AnimateInView>
          <AnimateInView className="text-center mb-4" delay={0.05}>
            <GradientTitle line1="Career" line2="Highlights" />
          </AnimateInView>
          <AnimateInView className="text-center mb-16" delay={0.1}>
            <p className="font-mono text-gray-500 text-sm">Key roles and achievements that shaped my expertise.</p>
          </AnimateInView>

          <div className="space-y-4">
            {shownExperiences.map((exp, i) => (
              <AnimateInView key={i} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-6 border transition-all duration-300 hover:border-white/10"
                  style={{ background: "#0d0d18", borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-black text-white">{exp.title}</h3>
                    <span className={`self-start px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shrink-0 ${
                      exp.type === "CONTRACT"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}>
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "#8b5cf6" }}>{exp.company}</p>
                  <p className="text-gray-600 text-xs mb-4">{exp.period}</p>
                  <ul className="space-y-1.5">
                    {exp.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="text-gray-500 text-sm flex gap-2">
                        <span className="text-purple-400 mt-0.5 shrink-0">&#9656;</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
            ))}
          </div>

          <AnimateInView className="text-center mt-10">
            <Link href="/experience"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold tracking-widest uppercase border border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white transition-all duration-300"
            >
              View Full Experience <ArrowRight size={14} />
            </Link>
          </AnimateInView>
        </div>
      </section>

      {/*  CORE VALUES  */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateInView className="text-center mb-4">
            <span className="section-label">I Stand Behind</span>
          </AnimateInView>
          <AnimateInView className="text-center mb-16" delay={0.05}>
            <GradientTitle line1="Core" line2="Values" />
          </AnimateInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <AnimateInView key={v.title} delay={i * 0.08}>
                <div className="glass-card p-7 text-center h-full hover:border-purple-500/20 transition-all duration-300 group">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                  >
                    <v.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2 text-white">{v.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/*  BOTTOM CTA  */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <AnimateInView>
            <h2 className="font-black mb-4" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", lineHeight: 1.05 }}>
              <span className="block text-white">Let&apos;s Build</span>
              <span className="block"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.12) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Something Great
              </span>
            </h2>
            <p className="font-mono text-gray-500 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
              Ready to bring your vision to life? Let&apos;s discuss how we can create something extraordinary together.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"; }}
              >
                Start A Project <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors">
                Get In Touch
              </Link>
            </div>
          </AnimateInView>
        </div>
      </section>

    </div>
  );
}
