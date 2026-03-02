"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Github, Linkedin } from "lucide-react";
import { siteData } from "@/data/siteData";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/experience", label: "EXPERIENCE" },
  { href: "/work", label: "WORK" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const socialLinks = [
    ...(siteData.social.website ? [{ icon: Globe, href: siteData.social.website, label: "Website" }] : []),
    ...(siteData.social.linkedin ? [{ icon: Linkedin, href: siteData.social.linkedin, label: "LinkedIn" }] : []),
    ...(siteData.social.github ? [{ icon: Github, href: siteData.social.github, label: "GitHub" }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-5">
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-7 py-3.5 rounded-2xl border transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl shadow-2xl shadow-black/40"
            : "backdrop-blur-lg"
        }`}
        style={{
          background: isScrolled ? "rgba(13,13,26,0.92)" : "rgba(13,13,26,0.75)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base transition-shadow overflow-hidden flex-shrink-0"
            style={{
              background: siteData.logo ? "transparent" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: siteData.logo ? "none" : "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            {siteData.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={siteData.logo} alt={siteData.firstName} className="w-full h-full object-cover" />
            ) : (
              siteData.firstName[0]
            )}
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="font-bold text-sm block tracking-widest text-white">{siteData.firstName.toUpperCase()}</span>
            <span className="text-[8px] uppercase tracking-[0.22em] font-medium" style={{ color: "rgba(107,114,128,0.8)" }}>
              {siteData.roleSecondary}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] tracking-[0.18em] font-medium transition-colors relative py-1 ${
                pathname === link.href
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-purple-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right: social + divider + hire me */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: "rgba(107,114,128,0.7)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#9ca3af")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(107,114,128,0.7)")}
                aria-label={social.label}
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
          {/* Vertical divider */}
          <div className="w-px h-5 mx-1" style={{ background: "rgba(255,255,255,0.1)" }} />
          <Link
            href="/contact"
            className="px-5 py-2 text-white text-[11px] tracking-[0.15em] font-semibold rounded-full transition-all"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(168,85,247,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            HIRE ME
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden max-w-6xl mx-auto mt-1 rounded-2xl bg-[#12121a]/95 backdrop-blur-xl border border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`py-3 text-sm font-medium tracking-wider transition-colors ${
                    pathname === link.href
                      ? "text-purple-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 py-3 border border-white/10 text-white text-sm font-semibold rounded-full text-center hover:bg-white/5 transition-colors"
              >
                HIRE ME
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
