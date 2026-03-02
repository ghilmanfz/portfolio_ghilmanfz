"use client";

import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { projects, Screenshot } from "@/data/projects";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Calendar } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

function TechBadge({ slug }: { slug: string }) {
  const labels: Record<string, string> = {
    nextdotjs: "NEXT.JS",
    react: "REACT",
    tailwindcss: "TAILWIND CSS",
    typescript: "TYPESCRIPT",
    postgresql: "POSTGRESQL",
    amazonaws: "AWS",
    nodedotjs: "NODE.JS",
    figma: "FIGMA",
    wix: "WIX",
    webflow: "WEBFLOW",
    wordpress: "WORDPRESS",
    googleanalytics: "GOOGLE ANALYTICS",
    drizzle: "DRIZZLE",
    zapier: "ZAPIER",
    xrp: "XRP",
  };
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={slug}
        width={18}
        height={18}
        style={{ opacity: 0.8 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <span
        className="text-[11px] font-bold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        {labels[slug] ?? slug.toUpperCase()}
      </span>
    </div>
  );
}

function ScreenshotImg({ shot, title, color }: { shot: Screenshot; title: string; color: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden w-full"
      style={{ border: "1px solid rgba(255,255,255,0.08)", background: "#0d0d1a" }}
    >
      {shot.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shot.url}
          alt={shot.caption || title}
          className="w-full object-cover object-top"
          style={{ maxHeight: "420px" }}
        />
      ) : (
        <div
          className="flex items-center justify-center"
          style={{
            height: "260px",
            background: `linear-gradient(135deg, ${color}14 0%, #080810 70%)`,
          }}
        >
          <span className="text-4xl font-black" style={{ color }}>{title[0]}</span>
        </div>
      )}
    </div>
  );
}

function ScreenshotsSection({
  screenshots,
  project,
}: {
  screenshots: Screenshot[];
  project: { title: string; color: string };
}) {
  // Split screenshots into "with caption" and group caption-less ones in pairs
  const rows: Array<{ type: "captioned"; shot: Screenshot; index: number } | { type: "grid"; shots: Screenshot[] }> = [];

  let captionedIndex = 0; // counts only captioned rows (for alternation)
  let i = 0;

  while (i < screenshots.length) {
    const shot = screenshots[i];
    const hasCaption = shot.caption && shot.caption.trim() !== "";

    if (hasCaption) {
      rows.push({ type: "captioned", shot, index: captionedIndex });
      captionedIndex++;
      i++;
    } else {
      // Collect consecutive caption-less images into a grid group
      const group: Screenshot[] = [];
      while (i < screenshots.length && !(screenshots[i].caption && screenshots[i].caption.trim() !== "")) {
        group.push(screenshots[i]);
        i++;
      }
      rows.push({ type: "grid", shots: group });
    }
  }

  return (
    <div className="space-y-10">
      {rows.map((row, rowIdx) => {
        if (row.type === "grid") {
          // Caption-less: show side by side in a 2-column grid
          return (
            <motion.div
              key={rowIdx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {row.shots.map((shot, j) => (
                <ScreenshotImg key={j} shot={shot} title={project.title} color={project.color} />
              ))}
            </motion.div>
          );
        }

        // Captioned: alternating image-left/caption-right or caption-left/image-right
        const isEven = row.index % 2 === 0;
        const imgBlock = (
          <div key="img" className="flex-1 min-w-0">
            <ScreenshotImg shot={row.shot} title={project.title} color={project.color} />
          </div>
        );
        const captionBlock = (
          <div key="caption" className="flex-1 min-w-0 flex flex-col justify-center gap-3 py-2">
            <p
              className="font-mono text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {row.shot.caption}
            </p>
          </div>
        );

        return (
          <motion.div
            key={rowIdx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {isEven ? [imgBlock, captionBlock] : [captionBlock, imgBlock]}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const [imgError, setImgError] = useState(false);

  return (
    <main
      className="min-h-screen"
      style={{ background: "#080810", paddingTop: "6rem" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-10"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <ArrowLeft size={15} />
            Back To Projects
          </Link>
        </motion.div>

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex items-start justify-between gap-6 mb-8"
        >
          {/* Left: logo + title + meta */}
          <div className="flex items-start gap-6">
            {/* Logo box */}
            <div
              className="w-24 h-24 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden"
              style={{
                background: `${project.color}18`,
                border: `1px solid ${project.color}33`,
              }}
            >
              {project.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="w-full h-full object-contain p-3"
                />
              ) : (
                <span
                  className="text-3xl font-black"
                  style={{ color: project.color }}
                >
                  {project.title[0]}
                </span>
              )}
            </div>

            {/* Title block */}
            <div>
              <h1
                className="font-black text-white leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              >
                {project.title}
              </h1>
              <p
                className="font-mono text-lg mb-4 leading-snug"
                style={{ color: "rgba(255,255,255,0.5)", maxWidth: "540px" }}
              >
                {project.subtitle}
              </p>
              {/* Year + Tags row */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  <Calendar size={10} />
                  {project.year}
                </div>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Featured badge */}
          {project.featured && (
            <div className="flex-shrink-0">
              <div
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  color: "#a78bfa",
                }}
              >
                <Sparkles size={11} />
                Featured
              </div>
            </div>
          )}
        </motion.div>

        {/* Description + Visit Website */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10"
        >
          <p
            className="font-mono text-base leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.45)", maxWidth: "600px" }}
          >
            {project.description}
          </p>

          {project.links?.live && project.links.live !== "#" && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-85"
              style={{
                background: project.color,
                color: "#fff",
              }}
            >
              Visit Website <ExternalLink size={14} />
            </a>
          )}
        </motion.div>

        {/* Main screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl overflow-hidden mb-16"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#0d0d1a",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "rgba(0,0,0,0.5)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }} />
            <span
              className="ml-2 text-[11px] font-mono px-3 py-1 rounded-md"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {project.links?.live && project.links.live !== "#"
                ? project.links.live.replace("https://", "")
                : `${project.slug}.com`}
            </span>
          </div>

          {project.image && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover object-top"
              style={{ maxHeight: "560px" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                height: "360px",
                background: `linear-gradient(135deg, ${project.color}14 0%, #080810 70%)`,
              }}
            >
              <span className="text-6xl font-black" style={{ color: project.color }}>
                {project.title[0]}
              </span>
            </div>
          )}
        </motion.div>

        {/* Problem & Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          {project.problem && (
            <div>
              <h2
                className="font-black text-white mb-4"
                style={{ fontSize: "1.6rem" }}
              >
                Problem
              </h2>
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div>
              <h2
                className="font-black text-white mb-4"
                style={{ fontSize: "1.6rem" }}
              >
                Solution
              </h2>
              <p
                className="font-mono text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {project.solution}
              </p>
            </div>
          )}
        </motion.div>

        {/* Technologies */}
        {project.techIcons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mb-16"
          >
            <h2
              className="font-black text-white mb-6"
              style={{ fontSize: "1.6rem" }}
            >
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techIcons.map((icon) => (
                <TechBadge key={icon} slug={icon} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Extra screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mb-16"
          >
            <ScreenshotsSection screenshots={project.screenshots} project={project} />
          </motion.div>
        )}

        {/* Prev / Next nav */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              <ChevronLeft size={16} />
              {prevProject.title}
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {nextProject.title}
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </motion.div>

      </div>
    </main>
  );
}
