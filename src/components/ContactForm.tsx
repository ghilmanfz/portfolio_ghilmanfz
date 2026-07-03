"use client";

import { useState } from "react";
import AnimateInView from "./AnimateInView";
import { Mail, Send } from "lucide-react";
import { siteData } from "@/data/siteData";

const serviceOptions = ["Web Design", "Web Development", "Content & SEO", "Other"];

export default function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !message.trim()) return;

    setLoading(true);

    // Detect country from IP
    let country = "Unknown";
    let city = "";
    try {
      const geoRes = await fetch("/api/geo");
      if (geoRes.ok) {
        const geo = await geoRes.json();
        country = geo.country || "Unknown";
        city = geo.city || "";
      }
    } catch {
      // silently ignore
    }

    // Fallback: use browser timezone if IP geo returned Unknown (e.g. localhost)
    if (country === "Unknown") {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "Asia/Jakarta"
        if (tz) country = tz; // e.g. "Asia/Jakarta" — readable enough
      } catch {
        // silently ignore
      }
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const services = selectedServices.length > 0 ? selectedServices.join(", ") : "-";
    const locationLine = city ? `${city}, ${country}` : country;

    const text = [
      `Halo Ghilman! Saya menghubungi Anda melalui portfolio website.`,
      ``,
      `*Nama:* ${fullName}`,
      `*Email:* ${email || "-"}`,
      `*Phone:* ${phone || "-"}`,
      `*Layanan:* ${services}`,
      `*Lokasi:* ${locationLine}`,
      ``,
      `*Pesan:*`,
      message,
    ].join("\n");

    const waNumber = siteData.whatsapp.replace(/\D/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    setLoading(false);
    window.open(waUrl, "_blank");
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <AnimateInView className="pt-4">
            {/* Label badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="font-mono text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "rgba(156,163,175,0.7)" }}>
                // GET IN TOUCH
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-black leading-[0.95] mb-7"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)", letterSpacing: "-0.02em" }}
            >
              <span style={{
                display: "block",
                background: "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.95) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Ready To Work
              </span>
              <span style={{
                display: "block",
                background: "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.95) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                On Your
              </span>
              <span style={{
                display: "block",
                background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Website?
              </span>
            </h2>

            {/* Subtitle — font mono */}
            <p
              className="font-mono text-sm leading-relaxed mb-10"
              style={{ color: "rgba(156,163,175,0.8)", maxWidth: "400px" }}
            >
              Provide as many details as possible, and expect a response within 24 hours.
            </p>

            {/* Email card — full width */}
            <div
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Mail size={18} color="#d1d5db" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: "rgba(107,114,128,0.8)" }}>
                  Email
                </p>
                <a
                  href={`mailto:${siteData.email}`}
                  className="text-sm font-medium transition-colors"
                  style={{ color: "#fff" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#a78bfa"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                >
                  {siteData.email}
                </a>
              </div>
            </div>
          </AnimateInView>

          {/* Right - Form */}
          <AnimateInView delay={0.12}>
            <div
              className="rounded-2xl p-8"
              style={{
                background: "#0d0d1a",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Form title */}
              <h3 className="text-xl font-bold text-white mb-6">
                What can I help you with?
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Service selection */}
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all"
                      style={{
                        background: selectedServices.includes(service)
                          ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                        border: selectedServices.includes(service)
                          ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        color: selectedServices.includes(service)
                          ? "#818cf8" : "rgba(156,163,175,0.85)",
                      }}
                    >
                      {service}
                    </button>
                  ))}
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                      style={{ color: "rgba(107,114,128,0.8)" }}>First Name *</label>
                    <input type="text" placeholder="John" required value={firstName} onChange={e => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(99,102,241,0.5)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                      style={{ color: "rgba(107,114,128,0.8)" }}>Last Name</label>
                    <input type="text" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(99,102,241,0.5)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                      style={{ color: "rgba(107,114,128,0.8)" }}>Phone Number</label>
                    <input type="tel" placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(99,102,241,0.5)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                      style={{ color: "rgba(107,114,128,0.8)" }}>Email</label>
                    <input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                      onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(99,102,241,0.5)"; }}
                      onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                    style={{ color: "rgba(107,114,128,0.8)" }}>Message *</label>
                  <textarea rows={5} placeholder="Tell me about your project..." required value={message} onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                    onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(99,102,241,0.5)"; }}
                    onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-ghost btn-arrow w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? "Detecting location…" : <><span>Send via WhatsApp</span> <Send size={15} /></>}
                </button>
              </form>
            </div>
          </AnimateInView>

        </div>
      </div>
    </section>
  );
}

