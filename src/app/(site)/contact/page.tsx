"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { siteData } from "@/data/siteData";

const serviceOptions = [
  "Web Design",
  "Web Development",
  "Content & SEO",
  "Other",
];

export default function ContactPage() {
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
    <div className="pt-32">
      <section className="py-16 pb-32">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="pt-4"
            >
              {/* Label */}
              <div className="inline-flex items-center gap-2 mb-8">
                <span
                  className="font-mono text-[11px] font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(156,163,175,0.7)" }}
                >
                  // GET IN TOUCH
                </span>
              </div>

              {/* Title */}
              <h1
                className="font-black leading-[0.95] mb-7"
                style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
              >
                <span
                  style={{
                    background: "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.95) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                  }}
                >
                  Ready To Work
                </span>
                <span
                  style={{
                    background: "linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.95) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                  }}
                >
                  On Your
                </span>
                <span
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "block",
                  }}
                >
                  Website?
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="font-mono leading-relaxed mb-10"
                style={{
                  color: "rgba(156,163,175,0.8)",
                  fontSize: "0.875rem",
                  maxWidth: "420px",
                }}
              >
                Provide as many details as possible, and expect a response within
                24 hours.
              </p>

              {/* Email card */}
              <div
                className="flex items-center gap-4 p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  maxWidth: "420px",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#6366f1" }}
                >
                  <Mail size={18} color="#fff" />
                </div>
                <div>
                  <p
                    className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-0.5"
                    style={{ color: "rgba(107,114,128,0.8)" }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${siteData.email}`}
                    className="text-sm font-medium text-white transition-colors"
                    style={{ color: "#fff" }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "#a78bfa")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLAnchorElement).style.color = "#fff")
                    }
                  >
                    {siteData.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "#0d0d1a",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Form title */}
                <h2 className="text-xl font-bold text-white mb-6">
                  What can I help you with?
                </h2>

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
                            ? "rgba(99,102,241,0.2)"
                            : "rgba(255,255,255,0.05)",
                          border: selectedServices.includes(service)
                            ? "1px solid rgba(99,102,241,0.5)"
                            : "1px solid rgba(255,255,255,0.1)",
                          color: selectedServices.includes(service)
                            ? "#818cf8"
                            : "rgba(156,163,175,0.85)",
                        }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>

                  {/* First + Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                        style={{ color: "rgba(107,114,128,0.8)" }}
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(99,102,241,0.5)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                        style={{ color: "rgba(107,114,128,0.8)" }}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(99,102,241,0.5)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      />
                    </div>
                  </div>

                  {/* Phone + Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                        style={{ color: "rgba(107,114,128,0.8)" }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(99,102,241,0.5)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                        style={{ color: "rgba(107,114,128,0.8)" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#fff",
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(99,102,241,0.5)")
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            "rgba(255,255,255,0.08)")
                        }
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="font-mono text-[10px] font-semibold uppercase tracking-widest mb-2 block"
                      style={{ color: "rgba(107,114,128,0.8)" }}
                    >
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-none"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#fff",
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLTextAreaElement).style.borderColor =
                          "rgba(99,102,241,0.5)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLTextAreaElement).style.borderColor =
                          "rgba(255,255,255,0.08)")
                      }
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(90deg, #6366f1 0%, #7c3aed 100%)",
                      color: "#fff",
                    }}
                  >
                    {loading ? "DETECTING LOCATION..." : <><span>SEND VIA WHATSAPP</span><Send size={15} /></>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}