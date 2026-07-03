"use client";

import Link from "next/link";
import { siteData } from "@/data/siteData";
import { experiences, coreExpertise } from "@/data/experience";
import { projects } from "@/data/projects";
import {
  Download,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Calendar,
  ExternalLink,
} from "lucide-react";

/* Print styles: forces A4, keeps the dark theme (print-color-adjust),
   hides on-screen chrome, and controls page breaks. Text stays real text
   (selectable / searchable) because this is native print, not a canvas capture. */
const printCss = `
@page { size: A4; margin: 0; }

.pdf-screen-bg {
  background: #050509;
  min-height: 100vh;
  padding: 104px 12px 80px;
}

.pdf-doc {
  width: 210mm;
  max-width: 100%;
  margin: 0 auto;
  background: linear-gradient(180deg, #0a0a14 0%, #0b0b17 55%, #0a0a12 100%);
  color: #ffffff;
  box-shadow: 0 20px 70px rgba(0,0,0,0.65);
  overflow: hidden;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.pdf-section { padding-left: 16mm; padding-right: 16mm; }

.pdf-avoid { break-inside: avoid; page-break-inside: avoid; }
.pdf-break-before { break-before: page; page-break-before: always; }

.pdf-shot {
  width: 100%;
  height: auto;
  max-height: 92mm;
  object-fit: cover;
  object-position: top center;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  display: block;
}

@media print {
  html, body { margin: 0 !important; padding: 0 !important; background: #0a0a14 !important; }
  .no-print { display: none !important; }
  .pdf-screen-bg { padding: 0 !important; background: #0a0a14 !important; min-height: 0 !important; }
  .pdf-doc { width: 100% !important; box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
`;

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
};

const tagStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.55)",
  borderRadius: 8,
  padding: "3px 9px",
  fontSize: 10,
  textTransform: "capitalize",
  fontWeight: 500,
};

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="pdf-avoid" style={{ marginBottom: 20 }}>
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#a78bfa",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.02em",
          marginTop: 6,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

export default function PortfolioPdfPage() {
  const contacts = [
    { icon: Mail, label: siteData.email, href: `mailto:${siteData.email}` },
    { icon: Phone, label: siteData.phone },
    { icon: MapPin, label: siteData.locationFull },
    siteData.social.website
      ? {
          icon: Globe,
          label: siteData.social.website.replace(/^https?:\/\//, ""),
          href: siteData.social.website,
        }
      : null,
    siteData.social.linkedin
      ? { icon: Linkedin, label: "LinkedIn", href: siteData.social.linkedin }
      : null,
    siteData.social.github
      ? { icon: Github, label: "GitHub", href: siteData.social.github }
      : null,
  ].filter(Boolean) as { icon: typeof Mail; label: string; href?: string }[];

  // All real projects (drop empty/duplicate stubs), featured first by order.
  const pdfProjects = projects
    .filter(
      (p) =>
        p.title?.trim() &&
        (p.description?.trim() || p.problem?.trim() || p.solution?.trim() || p.image)
    )
    .sort((a, b) => {
      const oa = a.featured ? a.featuredOrder ?? 900 : 1000;
      const ob = b.featured ? b.featuredOrder ?? 900 : 1000;
      return oa - ob;
    });

  const handlePrint = () => window.print();

  return (
    <div className="pdf-screen-bg">
      <style dangerouslySetInnerHTML={{ __html: printCss }} />

      {/* ---- Toolbar (screen only) ---- */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "14px 20px",
          background: "rgba(10,10,20,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/experience"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={15} /> Back to site
        </Link>

        <p
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            margin: 0,
            flex: "1 1 auto",
            textAlign: "center",
            minWidth: 220,
          }}
        >
          Tip: pilih <b style={{ color: "#c4b5fd" }}>Save as PDF</b> · aktifkan{" "}
          <b style={{ color: "#c4b5fd" }}>Background graphics</b> · matikan{" "}
          <b style={{ color: "#c4b5fd" }}>Headers and footers</b>
        </p>

        <button
          onClick={handlePrint}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.16)",
            cursor: "pointer",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <Download size={15} /> Download PDF (A4)
        </button>
      </div>

      {/* ================= DOCUMENT ================= */}
      <div className="pdf-doc">
        {/* top accent bar */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #a78bfa 100%)",
          }}
        />

        {/* ---- COVER / HEADER ---- */}
        <header
          className="pdf-section pdf-avoid"
          style={{ paddingTop: "15mm", paddingBottom: "10mm" }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ flex: "1 1 auto" }}>
              {siteData.availableForWork && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "4px 12px",
                    borderRadius: 999,
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    color: "#6ee7b7",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: "#34d399",
                      display: "inline-block",
                    }}
                  />
                  {siteData.availabilityText}
                </span>
              )}

              <h1
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  margin: "0 0 8px",
                }}
              >
                {siteData.name}
              </h1>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#8b5cf6",
                  margin: "0 0 14px",
                }}
              >
                {siteData.role}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: 11.5,
                  lineHeight: 1.7,
                  color: "rgba(156,163,175,0.85)",
                  maxWidth: "115mm",
                  margin: 0,
                }}
              >
                {siteData.heroDescription}
              </p>
            </div>

            {/* photo */}
            <div
              style={{
                width: 118,
                height: 118,
                flexShrink: 0,
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteData.aboutPhoto}
                alt={siteData.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* contact row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px 20px",
              marginTop: 20,
              paddingTop: 18,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {contacts.map((c, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontSize: 11,
                  color: "rgba(209,213,219,0.8)",
                  fontFamily: "var(--font-jetbrains), monospace",
                }}
              >
                <c.icon size={12} style={{ color: "#8b5cf6" }} />
                {c.label}
              </span>
            ))}
          </div>
        </header>

        {/* ---- ABOUT ---- */}
        <section className="pdf-section" style={{ paddingBottom: "10mm" }}>
          <SectionHeading label="Profile" title="About Me" />
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11.5,
              lineHeight: 1.8,
              color: "rgba(156,163,175,0.85)",
              margin: "0 0 12px",
            }}
          >
            {siteData.aboutBio}
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: 11.5,
              lineHeight: 1.8,
              color: "rgba(139,92,246,0.85)",
              margin: 0,
            }}
          >
            {siteData.aboutBioSecondary}
          </p>
        </section>

        {/* ---- CORE EXPERTISE ---- */}
        <section className="pdf-section" style={{ paddingBottom: "12mm" }}>
          <SectionHeading label="Skills" title="Core Expertise" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {coreExpertise.map((area) => (
              <div key={area.title} className="pdf-avoid" style={{ ...cardStyle, padding: 16 }}>
                <h3
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 12px",
                  }}
                >
                  {area.title}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {area.skills.map((s) => (
                    <span key={s} style={{ ...tagStyle, textTransform: "none" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- EXPERIENCE ---- */}
        <section
          className="pdf-section pdf-break-before"
          style={{ paddingTop: "15mm", paddingBottom: "12mm" }}
        >
          <SectionHeading label="Career" title="Experience" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {experiences.map((exp, i) => (
              <div key={i} className="pdf-avoid" style={{ ...cardStyle, padding: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 6,
                  }}
                >
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: 0 }}>
                    {exp.title}
                  </h3>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      flexShrink: 0,
                      padding: "3px 10px",
                      borderRadius: 8,
                      fontSize: 10,
                      fontFamily: "var(--font-jetbrains), monospace",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <Calendar size={10} /> {exp.period}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#60a5fa" }}>
                    {exp.company}
                  </span>
                  <span
                    style={{
                      padding: "2px 7px",
                      borderRadius: 5,
                      fontSize: 8.5,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      ...(exp.type === "INTERNSHIP"
                        ? {
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.25)",
                            color: "#6ee7b7",
                          }
                        : {
                            background: "rgba(59,130,246,0.12)",
                            border: "1px solid rgba(59,130,246,0.25)",
                            color: "#93c5fd",
                          }),
                    }}
                  >
                    {exp.type}
                  </span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: 9,
                        fontSize: 11,
                        lineHeight: 1.6,
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "rgba(156,163,175,0.8)",
                      }}
                    >
                      <span style={{ color: "#8b5cf6", flexShrink: 0 }}>▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---- PROJECTS ---- */}
        <section
          className="pdf-section pdf-break-before"
          style={{ paddingTop: "15mm", paddingBottom: "12mm" }}
        >
          <SectionHeading label="Portfolio" title="Selected Projects" />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {pdfProjects.map((p, i) => {
              const desc = p.description?.trim() || p.solution?.trim() || p.problem?.trim() || "";
              const live = p.links?.live && p.links.live !== "-" ? p.links.live : "";
              return (
                <div key={p.slug + i} className="pdf-avoid" style={{ ...cardStyle, padding: 16 }}>
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="pdf-shot" src={p.image} alt={p.title} style={{ marginBottom: 14 }} />
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0 }}>
                      {p.title?.trim()}
                    </h3>
                    <span
                      style={{
                        flexShrink: 0,
                        padding: "2px 9px",
                        borderRadius: 8,
                        fontSize: 10,
                        fontFamily: "var(--font-jetbrains), monospace",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {p.year}
                    </span>
                  </div>
                  {p.subtitle?.trim() && (
                    <p style={{ fontSize: 11.5, fontWeight: 600, color: "#8b5cf6", margin: "4px 0 0" }}>
                      {p.subtitle}
                    </p>
                  )}
                  {desc && (
                    <p
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: 10.5,
                        lineHeight: 1.65,
                        color: "rgba(156,163,175,0.8)",
                        margin: "10px 0 0",
                      }}
                    >
                      {desc}
                    </p>
                  )}
                  {p.techIcons && p.techIcons.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                      {p.techIcons.map((t) => (
                        <span key={t} style={tagStyle}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {live && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        marginTop: 12,
                        fontSize: 10,
                        fontFamily: "var(--font-jetbrains), monospace",
                        color: "#60a5fa",
                      }}
                    >
                      <ExternalLink size={11} />
                      {live.replace(/^https?:\/\//, "")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---- FOOTER ---- */}
        <footer
          className="pdf-section pdf-avoid"
          style={{
            paddingTop: 24,
            paddingBottom: "14mm",
            marginTop: 8,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 10, color: "rgba(107,114,128,0.9)", fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} {siteData.name} — {siteData.role}
          </span>
          <span style={{ fontSize: 10, color: "#8b5cf6", fontFamily: "var(--font-jetbrains), monospace" }}>
            {siteData.email}
          </span>
        </footer>
      </div>
    </div>
  );
}
