"use client";

import AnimateInView from "./AnimateInView";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function ProjectCard({ project, index, isHovered, onMouseEnter, onMouseLeave }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        border: isHovered
          ? `1px solid ${project.color}99`
          : "1px solid rgba(255,255,255,0.05)",
        background: "#0b0b16",
        boxShadow: isHovered
          ? `0 0 40px ${project.color}18`
          : "none",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Left: Screenshot */}
      <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        {/* Browser chrome bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-4 py-3"
          style={{
            background: "rgba(0,0,0,0.55)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
          <span
            className="ml-2 text-[11px] font-mono px-3 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {project.links?.live && project.links.live !== "#"
              ? project.links.live.replace("https://", "")
              : `${project.slug}.com`}
          </span>
        </div>

        {/* Screenshot image */}
        {project.image && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.04)" : "scale(1)" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.color}14 0%, #07070f 70%)`,
            }}
          >
            <div className="text-center mt-10">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl font-black"
                style={{ background: `${project.color}20`, color: project.color }}
              >
                {project.title[0]}
              </div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: project.color }}
              >
                {project.title}
              </p>
            </div>
          </div>
        )}

        {/* Right-edge fade into right panel */}
        <div
          className="absolute inset-y-0 right-0 w-16 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, #0b0b16)" }}
        />
      </div>

      {/* Right: Info panel */}
      <div className="flex flex-col px-8 py-8" style={{ background: "#0b0b16" }}>

        {/* Top row: badges left + number circle right */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            {/* FEATURED badge  only if project has featuredOrder */}
            {project.featuredOrder !== undefined && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{
                  background: `${project.color}22`,
                  border: `1px solid ${project.color}55`,
                  color: project.color,
                }}
              >
                <Sparkles size={10} />
                Featured
              </div>
            )}
            {/* Year badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <Calendar size={10} />
              <span>{project.year}</span>
            </div>
          </div>

          {/* Number circle  outline  solid filled on hover */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 flex-shrink-0"
            style={
              isHovered
                ? {
                    background: project.color,
                    border: `1.5px solid ${project.color}`,
                    color: "#fff",
                  }
                : {
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.3)",
                  }
            }
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Title  whole title colored on hover (single-word titles), or last word */}
        <h3
          className="font-black mb-2 leading-none"
          style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
        >
          {isHovered ? (
            <span style={{ color: project.color }}>{project.title}</span>
          ) : (
            <span className="text-white">{project.title}</span>
          )}
        </h3>

        {/* Subtitle */}
        <p
          className="font-mono text-sm mb-4 leading-snug"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          className="font-mono text-sm leading-relaxed mb-5"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          {project.description}
        </p>

        {/* HR separator */}
        <hr
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            marginBottom: "1.25rem",
          }}
        />

        {/* Tags */}
        <div className="flex flex-col gap-2.5 mb-8">
          {project.tags.map((tag) => (
            <div key={tag} className="inline-flex">
              <span
                className="px-4 py-2 text-[11px] uppercase tracking-widest font-semibold rounded-md"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>

        {/* EXPLORE button — bottom right */}
        <div className="flex justify-end mt-auto">
          <Link
            href={`/work/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
            style={
              isHovered
                ? {
                    background: project.color,
                    color: "#fff",
                    border: `1px solid ${project.color}`,
                  }
                : {
                    background: "transparent",
                    color: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }
            }
          >
            Explore <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const featured = [...projects]
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

  return (
    <section className="py-32 relative" style={{ background: "#070710" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section title */}
        <AnimateInView className="text-center mb-4">
          <h2
            className="font-black leading-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            <span className="block text-white">Featured</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.06) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Projects
            </span>
          </h2>
        </AnimateInView>

        <AnimateInView className="text-center mb-20" delay={0.1}>
          <p className="font-mono text-sm max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
            Success stories from clients who trusted my expertise to bring their vision to life.
          </p>
        </AnimateInView>

        {/* Cards */}
        <div className="space-y-5">
          {featured.map((project, i) => (
            <AnimateInView key={project.slug} delay={i * 0.07}>
              <ProjectCard
                project={project}
                index={i}
                isHovered={hoveredIndex === i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </AnimateInView>
          ))}
        </div>

        {/* VIEW ALL PROJECTS */}
        <AnimateInView className="flex justify-center mt-16" delay={0.15}>
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-opacity duration-300 hover:opacity-80"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
              color: "#fff",
            }}
          >
            View All Projects <ArrowRight size={15} />
          </Link>
        </AnimateInView>

      </div>
    </section>
  );
}
