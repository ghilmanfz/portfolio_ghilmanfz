"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateInView from "@/components/AnimateInView";
import { projects, Project } from "@/data/projects";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

type SortOption = "newest" | "oldest" | "a-z" | "z-a";

const sortLabels: Record<SortOption, string> = {
  newest: "Newest First",
  oldest: "Oldest First",
  "a-z": "A  Z",
  "z-a": "Z  A",
};

function sortProjects(list: Project[], sort: SortOption): Project[] {
  const sorted = [...list];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => Number(b.year) - Number(a.year));
    case "oldest":
      return sorted.sort((a, b) => Number(a.year) - Number(b.year));
    case "a-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "z-a":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

function TechIcon({ slug }: { slug: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}/ffffff`}
        alt={slug}
        width={16}
        height={16}
        style={{ opacity: 0.75 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const maxIcons = 3;
  const iconsToShow = project.techIcons.slice(0, maxIcons);
  const extraCount = project.techIcons.length - maxIcons;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="block rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: "#0d0d1a",
        border: `1px solid ${hovered ? project.color + "50" : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 8px 40px ${project.color}15` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: "240px" }}>
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-3 py-1 rounded-lg text-[12px] font-semibold"
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {project.year}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className="px-3 py-1 rounded-lg text-[12px] font-semibold flex items-center gap-1.5"
              style={{
                background: "rgba(139,92,246,0.22)",
                color: "#a78bfa",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(139,92,246,0.38)",
              }}
            >
               Featured
            </span>
          </div>
        )}

        {project.image && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse at 50% 55%, ${project.color}22 0%, ${project.color}0a 55%, #0d0d1a 100%)`,
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
              style={{
                background: `${project.color}25`,
                color: project.color,
              }}
            >
              {project.title[0]}
            </div>
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0d0d1a 0%, transparent 100%)" }}
        />
      </div>

      <div className="px-5 pt-4 pb-5">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <h3
            className="font-bold text-white leading-tight"
            style={{ fontSize: "1.125rem" }}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {iconsToShow.map((icon) => (
              <TechIcon key={icon} slug={icon} />
            ))}
            {extraCount > 0 && (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(156,163,175,0.8)",
                }}
              >
                +{extraCount}
              </div>
            )}
          </div>
        </div>

        <p
          className="font-mono text-[12px] mb-4 leading-relaxed"
          style={{ color: "rgba(107,114,128,0.85)" }}
        >
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] font-medium rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(156,163,175,0.8)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            overflow: "hidden",
            maxHeight: hovered ? "32px" : "0px",
            opacity: hovered ? 1 : 0,
            transition: "max-height 0.25s ease, opacity 0.25s ease",
          }}
        >
          <span
            className="font-mono text-[13px] font-medium inline-flex items-center gap-1.5"
            style={{ color: project.color }}
          >
            View Project <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node))
        setShowSort(false);
      if (filterRef.current && !filterRef.current.contains(e.target as Node))
        setShowFilters(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = useMemo(() => {
    const list = projects.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => p.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
    return sortProjects(list, sort);
  }, [search, selectedTags, sort]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="pt-32">
      <section className="pt-8 pb-10">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <h1
              className="font-black mb-5 leading-none"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
                background: "linear-gradient(180deg, #ffffff 25%, rgba(255,255,255,0.3) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              My Work
            </h1>
            <p
              className="font-mono leading-relaxed"
              style={{
                color: "rgba(156,163,175,0.8)",
                fontSize: "0.875rem",
                maxWidth: "560px",
              }}
            >
              A curated collection of projects showcasing innovative design,
              technical excellence, and creative problem-solving.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-4">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="relative">
              <Search
                size={15}
                className="absolute left-5 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(107,114,128,0.6)" }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects, tags, or technologies..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none transition-colors font-mono"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(156,163,175,0.7)",
                }}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(255,255,255,0.15)")
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor =
                    "rgba(255,255,255,0.08)")
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setShowSort(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background:
                      selectedTags.length > 0
                        ? "rgba(168,85,247,0.12)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      selectedTags.length > 0
                        ? "1px solid rgba(168,85,247,0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                    color:
                      selectedTags.length > 0
                        ? "#c084fc"
                        : "rgba(156,163,175,0.9)",
                  }}
                >
                  <SlidersHorizontal size={13} />
                  Filters
                  {selectedTags.length > 0 && (
                    <span className="ml-1 w-4 h-4 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {selectedTags.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 p-3 rounded-xl z-50"
                      style={{
                        background: "#111118",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
                      }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-wider font-semibold mb-2 px-1"
                        style={{ color: "rgba(107,114,128,0.8)" }}
                      >
                        Filter by tag
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {allTags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                            style={{
                              background: selectedTags.includes(tag)
                                ? "rgba(168,85,247,0.15)"
                                : "rgba(255,255,255,0.03)",
                              border: selectedTags.includes(tag)
                                ? "1px solid rgba(168,85,247,0.4)"
                                : "1px solid rgba(255,255,255,0.06)",
                              color: selectedTags.includes(tag)
                                ? "#c084fc"
                                : "rgba(156,163,175,0.7)",
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      {selectedTags.length > 0 && (
                        <button
                          onClick={() => setSelectedTags([])}
                          className="mt-2 w-full text-[11px] py-1.5 transition-colors hover:text-white"
                          style={{ color: "rgba(107,114,128,0.8)" }}
                        >
                          Clear all
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => {
                    setShowSort(!showSort);
                    setShowFilters(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(156,163,175,0.9)",
                  }}
                >
                  {sortLabels[sort]}
                  <ChevronDown
                    size={13}
                    className={`transition-transform ${showSort ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showSort && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-44 py-1.5 rounded-xl z-50"
                      style={{
                        background: "#111118",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 24px 48px rgba(0,0,0,0.7)",
                      }}
                    >
                      {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSort(key);
                            setShowSort(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs transition-colors"
                          style={{
                            color:
                              sort === key ? "#fff" : "rgba(107,114,128,0.9)",
                            background:
                              sort === key
                                ? "rgba(255,255,255,0.05)"
                                : "transparent",
                          }}
                        >
                          {sortLabels[key]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <span
              className="text-xs font-mono"
              style={{ color: "rgba(107,114,128,0.8)" }}
            >
              {filtered.length} projects
            </span>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((project, i) => (
              <AnimateInView key={project.slug} delay={i * 0.05}>
                <ProjectCard project={project} />
              </AnimateInView>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p
                className="text-sm font-mono"
                style={{ color: "rgba(107,114,128,0.7)" }}
              >
                No projects match your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}