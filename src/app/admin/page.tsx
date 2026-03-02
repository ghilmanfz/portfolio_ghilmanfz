"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Plus, Pencil, Trash2, LogOut, Save, X, ChevronDown, ChevronUp,
  Eye, EyeOff, Lock, Loader2, Globe, Briefcase, Wrench, Cpu, FolderKanban,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// SHARED TYPES
// ─────────────────────────────────────────────────────────────
interface ProjectLinks { live?: string; github?: string; figma?: string; demo?: string; }
interface Screenshot { url: string; caption: string; }
interface Project {
  slug: string; title: string; subtitle: string; description: string;
  year: string; featured: boolean; featuredOrder: number | null;
  tags: string[]; techIcons: string[]; color: string;
  image: string; logo: string; problem: string; solution: string;
  screenshots: Screenshot[]; links: ProjectLinks;
}
interface ExperienceItem { title: string; company: string; type: string; period: string; highlights: string[]; }
interface CoreExpertise { title: string; skills: string[]; }
interface Service { title: string; description: string; icon: string; }
interface TechItem { name: string; icon: string; }
interface TechCategory { title: string; description: string; items: TechItem[]; }
interface SiteData {
  name: string; firstName: string; logo: string; role: string; roleSecondary: string;
  location: string; locationFull: string; badge: string;
  heroTitle: string[]; heroDescription: string;
  heroCTAPrimary: { label: string; href: string };
  heroCTASecondary: { label: string; href: string };
  aboutTitle: string[]; aboutRole: string; aboutBio: string; aboutBioSecondary: string;
  aboutPhoto: string; email: string; phone: string; resumeUrl: string; experienceDescription: string;
  social: { github?: string; linkedin?: string; twitter?: string; instagram?: string; dribbble?: string; website?: string };
  seoTitle: string; seoDescription: string; availableForWork: boolean; availabilityText: string;
}

const EMPTY_PROJECT: Project = {
  slug: "", title: "", subtitle: "", description: "", year: String(new Date().getFullYear()),
  featured: false, featuredOrder: null, tags: [], techIcons: [], color: "#6366F1",
  image: "", logo: "", problem: "", solution: "", screenshots: [],
  links: { live: "", github: "", figma: "", demo: "" },
};

// ─────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const fieldStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
};
const labelCls = "text-[11px] uppercase tracking-widest font-semibold";
const labelStyle = { color: "rgba(255,255,255,0.45)" };

function Input({
  label, value, onChange, placeholder, mono = false, area = false, rows = 3, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; mono?: boolean; area?: boolean; rows?: number; type?: string;
}) {
  const cls = `w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 ${mono ? "font-mono" : ""}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelCls} style={labelStyle}>{label}</label>
      {area ? (
        <textarea rows={rows} className={cls} style={fieldStyle} value={value}
          onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input type={type} className={cls} style={fieldStyle} value={value}
          onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        className="w-10 h-6 rounded-full transition-all duration-200 relative flex-shrink-0"
        style={{ background: value ? "#8b5cf6" : "rgba(255,255,255,0.12)" }}
        onClick={() => onChange(!value)}
      >
        <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200"
          style={{ left: value ? "22px" : "4px" }} />
      </div>
      <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{label}</span>
    </label>
  );
}

function TagInput({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim();
    if (t && !values.includes(t)) onChange([...values, t]);
    setInput("");
  };
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelCls} style={labelStyle}>{label}</label>
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2.5 rounded-lg text-sm font-mono outline-none" style={fieldStyle}
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Type and press Enter" />
        <button type="button" onClick={add}
          className="px-3 rounded-lg text-sm font-bold"
          style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {values.map((v) => (
          <span key={v} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))}><X size={10} /></button>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-7 space-y-5" style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.1)" }}>
      {children}
    </div>
  );
}

function ImageUpload({
  label, value, onChange, folder,
}: {
  label: string; value: string; onChange: (url: string) => void; folder: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    try {
      const r = await fetch("/api/upload", { method: "POST", body: fd, credentials: "include" });
      const json = await r.json();
      if (r.ok) {
        onChange(json.url);
      } else {
        setError(json.error ?? "Upload failed");
      }
    } catch {
      setError("Upload failed");
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelCls} style={labelStyle}>{label}</label>
      <div className="flex gap-3 items-start">
        {/* Preview */}
        <div
          className="w-20 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {value ? (
            <img
              src={value} alt="preview"
              className="w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>No img</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {/* URL text field */}
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg text-sm font-mono outline-none"
            style={fieldStyle}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/..."
          />
          {/* Upload button */}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest self-start disabled:opacity-50"
            style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            {uploading ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />}
            {uploading ? "Uploading…" : "Upload Image"}
          </button>
          {error && <p className="text-[11px] font-mono" style={{ color: "#f87171" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

function ResumeUpload({
  value, onChange,
}: {
  value: string; onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const r = await fetch("/api/upload-resume", { method: "POST", body: fd, credentials: "include" });
      const json = await r.json();
      if (r.ok) {
        onChange(json.url);
      } else {
        setError(json.error ?? "Upload failed");
      }
    } catch {
      setError("Upload failed");
    }
    setUploading(false);
  };

  const filename = value ? value.split("/").pop() : null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelCls} style={labelStyle}>Resume URL</label>
      <div className="flex gap-3 items-center flex-wrap">
        {/* URL text field */}
        <input
          type="text"
          className="flex-1 min-w-0 px-3 py-2.5 rounded-lg text-sm font-mono outline-none"
          style={fieldStyle}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/cv/your-resume.pdf"
        />
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />
        {/* Upload button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest shrink-0 disabled:opacity-50"
          style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}
        >
          {uploading ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />}
          {uploading ? "Uploading…" : "Upload PDF"}
        </button>
      </div>
      {/* Current file info */}
      {filename && !uploading && (
        <p className="text-[11px] font-mono" style={{ color: "rgba(167,243,208,0.8)" }}>
          ✓ {filename}
          {value.startsWith("/cv/") && (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 underline"
              style={{ color: "#a78bfa" }}
            >
              Preview
            </a>
          )}
        </p>
      )}
      {error && <p className="text-[11px] font-mono" style={{ color: "#f87171" }}>{error}</p>}
    </div>
  );
}

function SaveBar({ onSave, saving, label = "Save Changes" }: { onSave: () => void; saving: boolean; label?: string }) {
  return (
    <button onClick={onSave} disabled={saving}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-40"
      style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
      {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB: SITE INFO
// ─────────────────────────────────────────────────────────────
function SiteTab({ showToast }: { showToast: (m: string) => void }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/site", { credentials: "include" }).then((r) => r.json()).then(setData);
  }, []);

  const set = (key: keyof SiteData, val: unknown) =>
    setData((prev) => prev ? { ...prev, [key]: val } : prev);

  const setSocial = (key: string, val: string) =>
    setData((prev) => prev ? { ...prev, social: { ...prev.social, [key]: val } } : prev);

  const save = async () => {
    setSaving(true);
    const r = await fetch("/api/site", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), credentials: "include" });
    setSaving(false);
    showToast(r.ok ? "✓ Site info saved" : "✗ Save failed");
  };

  if (!data) return <div className="flex justify-center py-20"><Loader2 size={28} className="animate-spin" style={{ color: "#8b5cf6" }} /></div>;

  return (
    <div className="space-y-6">
      <SectionCard>
        <h3 className="text-white font-black text-base mb-1">Personal Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Full Name" value={data.name} onChange={(v) => set("name", v)} />
          <Input label="First Name" value={data.firstName} onChange={(v) => set("firstName", v)} />
          <Input label="Role" value={data.role} onChange={(v) => set("role", v)} placeholder="Frontend Developer" />
          <Input label="Role (Secondary)" value={data.roleSecondary} onChange={(v) => set("roleSecondary", v)} placeholder="Web Designer" />
          <Input label="Location (short)" value={data.location} onChange={(v) => set("location", v)} placeholder="Phoenix, AZ" />
          <Input label="Location (full)" value={data.locationFull} onChange={(v) => set("locationFull", v)} placeholder="Phoenix, Arizona" />
          <Input label="Email" value={data.email} onChange={(v) => set("email", v)} placeholder="you@example.com" />
          <Input label="Phone" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+1 555 000 0000" />
        </div>
        <ResumeUpload value={data.resumeUrl} onChange={(v) => set("resumeUrl", v)} />
        <ImageUpload label="Logo / Profile Picture (Navbar & Footer)" value={data.logo ?? ""} folder="logo" onChange={(v) => set("logo", v)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <Toggle label="Available for Work" value={data.availableForWork} onChange={(v) => set("availableForWork", v)} />
          <Input label="Availability Text" value={data.availabilityText} onChange={(v) => set("availabilityText", v)} placeholder="Available for new projects" />
        </div>
      </SectionCard>

      <SectionCard>
        <h3 className="text-white font-black text-base mb-1">Hero Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Badge Text" value={data.badge} onChange={(v) => set("badge", v)} placeholder="Frontend Developer // Web Designer" />
          <Input label="Hero Title Line 1" value={data.heroTitle[0]} onChange={(v) => set("heroTitle", [v, data.heroTitle[1]])} />
          <Input label="Hero Title Line 2" value={data.heroTitle[1]} onChange={(v) => set("heroTitle", [data.heroTitle[0], v])} />
          <Input label="Primary CTA Label" value={data.heroCTAPrimary.label} onChange={(v) => set("heroCTAPrimary", { ...data.heroCTAPrimary, label: v })} />
          <Input label="Primary CTA URL" value={data.heroCTAPrimary.href} mono onChange={(v) => set("heroCTAPrimary", { ...data.heroCTAPrimary, href: v })} />
          <Input label="Secondary CTA Label" value={data.heroCTASecondary.label} onChange={(v) => set("heroCTASecondary", { ...data.heroCTASecondary, label: v })} />
          <Input label="Secondary CTA URL" value={data.heroCTASecondary.href} mono onChange={(v) => set("heroCTASecondary", { ...data.heroCTASecondary, href: v })} />
        </div>
        <Input label="Hero Description" value={data.heroDescription} onChange={(v) => set("heroDescription", v)} area rows={3} />
        <Input label="Experience Page Description" value={data.experienceDescription ?? ""} onChange={(v) => set("experienceDescription", v)} area rows={2} placeholder="3+ years building..." />
      </SectionCard>

      <SectionCard>
        <h3 className="text-white font-black text-base mb-1">About Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="About Title Line 1" value={data.aboutTitle[0]} onChange={(v) => set("aboutTitle", [v, data.aboutTitle[1]])} />
          <Input label="About Title Line 2" value={data.aboutTitle[1]} onChange={(v) => set("aboutTitle", [data.aboutTitle[0], v])} />
          <Input label="About Role" value={data.aboutRole} onChange={(v) => set("aboutRole", v)} />
        </div>
        <ImageUpload label="About Photo" value={data.aboutPhoto} folder="about" onChange={(v) => set("aboutPhoto", v)} />
        <Input label="Bio (main paragraph)" value={data.aboutBio} onChange={(v) => set("aboutBio", v)} area rows={4} />
        <Input label="Bio (secondary, small)" value={data.aboutBioSecondary} onChange={(v) => set("aboutBioSecondary", v)} area rows={2} />
      </SectionCard>

      <SectionCard>
        <h3 className="text-white font-black text-base mb-1">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(["github", "linkedin", "twitter", "instagram", "dribbble", "website"] as const).map((k) => (
            <Input key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={(data.social as Record<string, string>)[k] ?? ""} mono onChange={(v) => setSocial(k, v)} placeholder="https://..." />
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <h3 className="text-white font-black text-base mb-1">SEO</h3>
        <div className="grid grid-cols-1 gap-5">
          <Input label="Page Title" value={data.seoTitle} onChange={(v) => set("seoTitle", v)} />
          <Input label="Meta Description" value={data.seoDescription} onChange={(v) => set("seoDescription", v)} area rows={2} />
        </div>
      </SectionCard>

      <SaveBar onSave={save} saving={saving} label="Save Site Info" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB: EXPERIENCE
// ─────────────────────────────────────────────────────────────
function ExperienceTab({ showToast }: { showToast: (m: string) => void }) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [coreExpertise, setCoreExpertise] = useState<CoreExpertise[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    fetch("/api/experience", { credentials: "include" }).then((r) => r.json()).then((d) => {
      setExperiences(d.experiences ?? []);
      setCoreExpertise(d.coreExpertise ?? []);
    });
  }, []);

  const save = async (exps = experiences, core = coreExpertise) => {
    setSaving(true);
    const r = await fetch("/api/experience", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ experiences: exps, coreExpertise: core }),
      credentials: "include",
    });
    setSaving(false);
    showToast(r.ok ? "✓ Experience saved" : "✗ Save failed");
  };

  const EMPTY_EXP: ExperienceItem = { title: "", company: "", type: "CONTRACT", period: "", highlights: [] };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-black text-lg">Work Experience</h2>
        {!addingNew && editingIdx === null && (
          <button onClick={() => setAddingNew(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
            <Plus size={14} /> Add Experience
          </button>
        )}
      </div>

      {addingNew && (
        <ExpForm
          initial={EMPTY_EXP}
          onSave={(exp) => {
            const next = [...experiences, exp];
            setExperiences(next); save(next);
            setAddingNew(false);
          }}
          onCancel={() => setAddingNew(false)}
        />
      )}

      <div className="space-y-3">
        {experiences.map((exp, i) => (
          <div key={i}>
            {editingIdx === i ? (
              <ExpForm
                initial={exp}
                onSave={(updated) => {
                  const next = experiences.map((e, idx) => idx === i ? updated : e);
                  setExperiences(next); save(next);
                  setEditingIdx(null);
                }}
                onCancel={() => setEditingIdx(null)}
              />
            ) : (
              <div className="flex items-start gap-4 p-5 rounded-2xl"
                style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-black text-white text-sm">{exp.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                      style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}>
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.45)" }}>{exp.company} · {exp.period}</p>
                  <p className="text-[11px] mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>{exp.highlights.length} highlights</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { const n = [...experiences]; n.splice(i - 1, 0, n.splice(i, 1)[0]); setExperiences(n); save(n); }}
                    disabled={i === 0} className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-25"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => { const n = [...experiences]; n.splice(i + 1, 0, n.splice(i, 1)[0]); setExperiences(n); save(n); }}
                    disabled={i === experiences.length - 1} className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-25"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                    <ChevronDown size={14} />
                  </button>
                  <button onClick={() => setEditingIdx(i)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
                    <Pencil size={13} />
                  </button>
                  <button onClick={() => { const next = experiences.filter((_, idx) => idx !== i); setExperiences(next); save(next); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Core Expertise */}
      <div className="mt-10">
        <h2 className="text-white font-black text-lg mb-4">Core Expertise</h2>
        <div className="space-y-3">
          {coreExpertise.map((ce, i) => (
            <SectionCard key={i}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Title" value={ce.title}
                  onChange={(v) => { const n = coreExpertise.map((x, idx) => idx === i ? { ...x, title: v } : x); setCoreExpertise(n); }} />
                <TagInput label="Skills" values={ce.skills}
                  onChange={(v) => { const n = coreExpertise.map((x, idx) => idx === i ? { ...x, skills: v } : x); setCoreExpertise(n); }} />
              </div>
              <button onClick={() => { const n = coreExpertise.filter((_, idx) => idx !== i); setCoreExpertise(n); save(experiences, n); }}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mt-1"
                style={{ color: "#f87171" }}>
                <Trash2 size={11} /> Remove
              </button>
            </SectionCard>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => { const n = [...coreExpertise, { title: "", skills: [] }]; setCoreExpertise(n); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Plus size={14} /> Add Expertise
          </button>
          <SaveBar onSave={() => save()} saving={saving} label="Save All" />
        </div>
      </div>
    </div>
  );
}

function ExpForm({ initial, onSave, onCancel }: { initial: ExperienceItem; onSave: (e: ExperienceItem) => void; onCancel: () => void }) {
  const [e, setE] = useState<ExperienceItem>(initial);
  const setF = (k: keyof ExperienceItem, v: unknown) => setE((p) => ({ ...p, [k]: v }));
  return (
    <SectionCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Job Title" value={e.title} onChange={(v) => setF("title", v)} />
        <Input label="Company" value={e.company} onChange={(v) => setF("company", v)} />
        <Input label="Type (CONTRACT / FULL-TIME)" value={e.type} onChange={(v) => setF("type", v)} />
        <Input label="Period" value={e.period} onChange={(v) => setF("period", v)} placeholder="2023 – 2025" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelCls} style={labelStyle}>Highlights (one per line)</label>
        <textarea rows={5} className="w-full px-3 py-2.5 rounded-lg text-sm font-mono outline-none"
          style={fieldStyle}
          value={e.highlights.join("\n")}
          onChange={(ev) => setF("highlights", ev.target.value.split("\n"))}
          placeholder="Each line = one bullet point" />
      </div>
      <div className="flex gap-3">
        <button onClick={() => onSave(e)} disabled={!e.title}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-40"
          style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
          <Save size={15} /> Save
        </button>
        <button onClick={onCancel}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-widest uppercase"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <X size={15} /> Cancel
        </button>
      </div>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB: SERVICES
// ─────────────────────────────────────────────────────────────
function ServicesTab({ showToast }: { showToast: (m: string) => void }) {
  const [services, setServices] = useState<Service[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/services", { credentials: "include" }).then((r) => r.json()).then((d) => setServices(d.services ?? []));
  }, []);

  const save = async (list = services) => {
    setSaving(true);
    const r = await fetch("/api/services", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ services: list }),
      credentials: "include",
    });
    setSaving(false);
    showToast(r.ok ? "✓ Services saved" : "✗ Save failed");
  };

  const setField = (i: number, k: keyof Service, v: string) =>
    setServices((prev) => prev.map((s, idx) => idx === i ? { ...s, [k]: v } : s));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-black text-lg">Services</h2>
        <button onClick={() => setServices((p) => [...p, { title: "", description: "", icon: "Code" }])}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase"
          style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
          <Plus size={14} /> Add Service
        </button>
      </div>
      {services.map((s, i) => (
        <SectionCard key={i}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" value={s.title} onChange={(v) => setField(i, "title", v)} />
            <Input label="Icon (Lucide name)" value={s.icon} mono onChange={(v) => setField(i, "icon", v)} placeholder="Code, Server, Palette…" />
          </div>
          <Input label="Description" value={s.description} onChange={(v) => setField(i, "description", v)} area rows={3} />
          <div className="flex items-center gap-3">
            <button onClick={() => { const n = services.filter((_, idx) => idx !== i); setServices(n); save(n); }}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "#f87171" }}>
              <Trash2 size={11} /> Remove
            </button>
          </div>
        </SectionCard>
      ))}
      <SaveBar onSave={() => save()} saving={saving} label="Save Services" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB: TECH STACK
// ─────────────────────────────────────────────────────────────
function TechTab({ showToast }: { showToast: (m: string) => void }) {
  const [categories, setCategories] = useState<TechCategory[]>([]);
  const [saving, setSaving] = useState(false);
  const [openCat, setOpenCat] = useState<number | null>(0);

  useEffect(() => {
    fetch("/api/tech", { credentials: "include" }).then((r) => r.json()).then((d) => setCategories(d.techStack ?? []));
  }, []);

  const save = async (list = categories) => {
    setSaving(true);
    const r = await fetch("/api/tech", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ techStack: list }),
      credentials: "include",
    });
    setSaving(false);
    showToast(r.ok ? "✓ Tech stack saved" : "✗ Save failed");
  };

  const setCat = (i: number, k: keyof TechCategory, v: unknown) =>
    setCategories((prev) => prev.map((c, idx) => idx === i ? { ...c, [k]: v } : c));

  const addItem = (catIdx: number) =>
    setCat(catIdx, "items", [...categories[catIdx].items, { name: "", icon: "" }]);

  const setItem = (catIdx: number, itemIdx: number, k: keyof TechItem, v: string) =>
    setCat(catIdx, "items", categories[catIdx].items.map((it, idx) => idx === itemIdx ? { ...it, [k]: v } : it));

  const removeItem = (catIdx: number, itemIdx: number) =>
    setCat(catIdx, "items", categories[catIdx].items.filter((_, idx) => idx !== itemIdx));

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-black text-lg">Tech Stack</h2>
        <button onClick={() => setCategories((p) => [...p, { title: "", description: "", items: [] }])}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase"
          style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
          <Plus size={14} /> Add Category
        </button>
      </div>
      {categories.map((cat, i) => (
        <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.1)" }}>
          <button className="w-full flex items-center justify-between px-6 py-4 text-left"
            onClick={() => setOpenCat(openCat === i ? null : i)}>
            <div>
              <span className="font-black text-white text-sm">{cat.title || "(untitled category)"}</span>
              <span className="ml-3 text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>{cat.items.length} items</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); const n = categories.filter((_, idx) => idx !== i); setCategories(n); save(n); }}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                <Trash2 size={12} />
              </button>
              {openCat === i ? <ChevronUp size={16} style={{ color: "rgba(255,255,255,0.4)" }} /> : <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.4)" }} />}
            </div>
          </button>

          {openCat === i && (
            <div className="px-6 pb-6 space-y-5 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                <Input label="Category Title" value={cat.title} onChange={(v) => setCat(i, "title", v)} />
                <Input label="Description" value={cat.description} onChange={(v) => setCat(i, "description", v)} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className={labelCls} style={labelStyle}>Tech Items</label>
                  <button onClick={() => addItem(i)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}>
                    <Plus size={11} /> Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex gap-3 items-center">
                      <input className="flex-1 px-3 py-2 rounded-lg text-sm outline-none" style={fieldStyle}
                        value={item.name} onChange={(e) => setItem(i, j, "name", e.target.value)} placeholder="Name (e.g. React)" />
                      <input className="flex-1 px-3 py-2 rounded-lg text-sm font-mono outline-none" style={fieldStyle}
                        value={item.icon} onChange={(e) => setItem(i, j, "icon", e.target.value)} placeholder="Icon URL" />
                      <button onClick={() => removeItem(i, j)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <SaveBar onSave={() => save()} saving={saving} label="Save Tech Stack" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB: PROJECTS
// ─────────────────────────────────────────────────────────────
function ProjectForm({ initial, onSave, onCancel }: { initial: Project; onSave: (p: Project) => void; onCancel: () => void }) {
  const [p, setP] = useState<Project>(initial);
  const set = (key: keyof Project, val: unknown) => setP((prev) => ({ ...prev, [key]: val }));
  const setLink = (key: keyof ProjectLinks, val: string) => setP((prev) => ({ ...prev, links: { ...prev.links, [key]: val } }));
  return (
    <SectionCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Title" value={p.title} onChange={(v) => { set("title", v); if (!initial.slug) set("slug", slugify(v)); }} />
        <Input label="Slug (URL)" value={p.slug} mono onChange={(v) => set("slug", v)} placeholder="auto-generated" />
        <Input label="Subtitle" value={p.subtitle} onChange={(v) => set("subtitle", v)} />
        <Input label="Year" value={p.year} onChange={(v) => set("year", v)} />
        <div className="flex flex-col gap-1.5">
          <label className={labelCls} style={labelStyle}>Accent Color</label>
          <div className="flex items-center gap-3">
            <input type="color" value={p.color} onChange={(e) => set("color", e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
            <span className="font-mono text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{p.color}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-end">
          <Toggle label="Featured Project" value={p.featured} onChange={(v) => set("featured", v)} />
          {p.featured && (
            <Input label="Featured Order" value={String(p.featuredOrder ?? "")} onChange={(v) => set("featuredOrder", v ? Number(v) : null)} />
          )}
        </div>
      </div>
      <Input label="Description" value={p.description} onChange={(v) => set("description", v)} area rows={2} />
      <Input label="Problem" value={p.problem} onChange={(v) => set("problem", v)} area rows={3} />
      <Input label="Solution" value={p.solution} onChange={(v) => set("solution", v)} area rows={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ImageUpload label="Thumbnail Image" value={p.image} folder="projects" onChange={(v) => set("image", v)} />
        <ImageUpload label="Logo" value={p.logo} folder="projects" onChange={(v) => set("logo", v)} />
      </div>
      <TagInput label="Tags" values={p.tags} onChange={(v) => set("tags", v)} />
      <TagInput label="Tech Icons (SimpleIcons slugs)" values={p.techIcons} onChange={(v) => set("techIcons", v)} />

      {/* Screenshots */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className={labelCls} style={labelStyle}>Screenshots (optional)</label>
          <button
            type="button"
            onClick={() => set("screenshots", [...p.screenshots, { url: "", caption: "" }])}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <Plus size={12} /> Add Screenshot
          </button>
        </div>
        {p.screenshots.length === 0 && (
          <p className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
            No screenshots added yet. Each screenshot will show with an alternating image/caption layout on the project page.
          </p>
        )}
        {p.screenshots.map((shot, idx) => (
          <div
            key={idx}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
                Screenshot {idx + 1} {idx % 2 === 0 ? "— image left, caption right" : "— image right, caption left"}
              </span>
              <button
                type="button"
                onClick={() => set("screenshots", p.screenshots.filter((_, i) => i !== idx))}
                className="p-1 rounded-lg transition-colors"
                style={{ color: "rgba(255,80,80,0.7)" }}
              >
                <Trash2 size={13} />
              </button>
            </div>
            <ImageUpload
              label="Image"
              value={shot.url}
              folder="projects"
              onChange={(url) => {
                const next = [...p.screenshots];
                next[idx] = { ...next[idx], url };
                set("screenshots", next);
              }}
            />
            <Input
              label="Caption / Description"
              value={shot.caption}
              onChange={(caption) => {
                const next = [...p.screenshots];
                next[idx] = { ...next[idx], caption };
                set("screenshots", next);
              }}
              area
              rows={2}
              placeholder="Describe what this screenshot shows..."
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Live URL" value={p.links?.live ?? ""} mono onChange={(v) => setLink("live", v)} placeholder="https://..." />
        <Input label="GitHub URL" value={p.links?.github ?? ""} mono onChange={(v) => setLink("github", v)} placeholder="https://..." />
        <Input label="Figma URL" value={p.links?.figma ?? ""} mono onChange={(v) => setLink("figma", v)} placeholder="https://..." />
        <Input label="Demo URL" value={p.links?.demo ?? ""} mono onChange={(v) => setLink("demo", v)} placeholder="https://..." />
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave({ ...p, slug: p.slug || slugify(p.title) })} disabled={!p.title}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-widest uppercase disabled:opacity-40"
          style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
          <Save size={15} /> Save Project
        </button>
        <button onClick={onCancel}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-widest uppercase"
          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <X size={15} /> Cancel
        </button>
      </div>
    </SectionCard>
  );
}

function ProjectsTab({ showToast }: { showToast: (m: string) => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    fetch("/api/projects", { credentials: "include" }).then((r) => r.json()).then(setProjects);
  }, []);

  const persist = useCallback(async (updated: Project[]) => {
    setSaving(true);
    const r = await fetch("/api/projects", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
      credentials: "include",
    });
    setSaving(false);
    if (r.ok) { setProjects(updated); showToast("✓ Projects saved"); }
    else showToast("✗ Save failed");
  }, [showToast]);

  const handleSave = (updated: Project) => {
    const exists = projects.findIndex((p) => p.slug === updated.slug);
    const next = exists >= 0 ? projects.map((p) => p.slug === updated.slug ? updated : p) : [...projects, updated];
    persist(next);
    setEditingSlug(null);
    setAddingNew(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-black text-lg">
          {projects.length} Projects{" "}
          {saving && <span className="text-[12px] font-mono font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>saving…</span>}
        </h2>
        {!addingNew && !editingSlug && (
          <button onClick={() => setAddingNew(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
            <Plus size={14} /> Add Project
          </button>
        )}
      </div>

      {addingNew && (
        <div>
          <h3 className="text-white font-black mb-4">New Project</h3>
          <ProjectForm initial={EMPTY_PROJECT} onSave={handleSave} onCancel={() => setAddingNew(false)} />
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project, i) => (
          <div key={project.slug}>
            {editingSlug === project.slug ? (
              <div>
                <h3 className="text-white font-black mb-4">Editing: {project.title}</h3>
                <ProjectForm initial={project} onSave={handleSave} onCancel={() => setEditingSlug(null)} />
              </div>
            ) : (
              <div className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: project.color }} />
                <div className="w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-lg font-black"
                  style={{ background: `${project.color}20`, color: project.color }}>
                  {project.image
                    ? <img src={project.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    : project.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm truncate">{project.title}</span>
                    {project.featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                        style={{ background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
                        Featured #{project.featuredOrder}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                    /{project.slug} · {project.year}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { const n = [...projects]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; persist(n); }} disabled={i === 0}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-25"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => { const n = [...projects]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; persist(n); }} disabled={i === projects.length - 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-25"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}>
                    <ChevronDown size={14} />
                  </button>
                  <button onClick={() => setEditingSlug(project.slug)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
                    <Pencil size={13} />
                  </button>
                  <a href={`/work/${project.slug}`} target="_blank"
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)" }}>
                    <Eye size={13} />
                  </a>
                  <button onClick={() => { if (!confirm(`Delete "${project.slug}"?`)) return; persist(projects.filter((p) => p.slug !== project.slug)); }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TABS CONFIG
// ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "site",       label: "Site Info",   icon: Globe },
  { id: "projects",   label: "Projects",    icon: FolderKanban },
  { id: "experience", label: "Experience",  icon: Briefcase },
  { id: "services",   label: "Services",    icon: Wrench },
  { id: "tech",       label: "Tech Stack",  icon: Cpu },
] as const;

type TabId = typeof TABS[number]["id"];

// ─────────────────────────────────────────────────────────────
// MAIN ADMIN PAGE
// ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState<TabId>("site");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  useEffect(() => {
    fetch("/api/projects", { credentials: "include" })
      .then((r) => { setAuthed(r.ok); })
      .finally(() => setLoading(false));
  }, []);

  const login = async () => {
    setLoginError("");
    const r = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    if (r.ok) setAuthed(true);
    else setLoginError("Wrong password. Try again.");
  };

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
  };

  if (authed === false) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080810" }}>
        <div className="w-full max-w-sm p-8 rounded-2xl space-y-6"
          style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)" }}>
              <Lock size={24} style={{ color: "#818cf8" }} />
            </div>
            <h1 className="text-xl font-black text-white">Admin Panel</h1>
            <p className="text-sm font-mono mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Portfolio CMS</p>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-10"
                style={fieldStyle}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && login()}
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {loginError && <p className="text-[12px] font-mono" style={{ color: "#f87171" }}>{loginError}</p>}
            <button onClick={login}
              className="w-full py-3 rounded-xl text-sm font-bold tracking-widest uppercase"
              style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }}>
              Login
            </button>
          </div>
          <p className="text-center text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
            Default: <span style={{ color: "rgba(255,255,255,0.45)" }}>admin123</span>
          </p>
        </div>
      </div>
    );
  }

  if (authed === null || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#080810" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "#8b5cf6" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#080810" }}>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-mono font-medium"
          style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
          {toast}
        </div>
      )}

      <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(8,8,16,0.9)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
        <div>
          <h1 className="text-lg font-black text-white tracking-tight">Portfolio CMS</h1>
          <p className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>Edit all content from here</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank"
            className="px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>
            View Site ↗
          </a>
          <button onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold uppercase tracking-widest"
            style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <nav className="flex gap-1 mb-8 p-1 rounded-2xl overflow-x-auto" style={{ background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.08)" }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-150"
              style={activeTab === id
                ? { background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "#fff" }
                : { color: "rgba(255,255,255,0.45)", background: "transparent" }}>
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "site"       && <SiteTab       showToast={showToast} />}
        {activeTab === "projects"   && <ProjectsTab   showToast={showToast} />}
        {activeTab === "experience" && <ExperienceTab showToast={showToast} />}
        {activeTab === "services"   && <ServicesTab   showToast={showToast} />}
        {activeTab === "tech"       && <TechTab       showToast={showToast} />}
      </div>
    </div>
  );
}
