"use client";

import Link from "next/link";
import { Globe, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/siteData";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const socialLinks = [
    ...(siteData.social.website ? [{ icon: Globe, href: siteData.social.website, label: "Website" }] : []),
    ...(siteData.social.linkedin ? [{ icon: Linkedin, href: siteData.social.linkedin, label: "LinkedIn" }] : []),
    ...(siteData.social.github ? [{ icon: Github, href: siteData.social.github, label: "GitHub" }] : []),
  ];
  return (
    <footer className="border-t border-white/5 bg-[#060609]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base overflow-hidden flex-shrink-0"
                style={{
                  background: siteData.logo ? "transparent" : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                }}>
                {siteData.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={siteData.logo} alt={siteData.firstName} className="w-full h-full object-cover" />
                ) : (
                  siteData.firstName[0]
                )}
              </div>
              <div className="leading-tight">
                <span className="font-bold text-sm block">{siteData.firstName.toUpperCase()}</span>
                <span className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">{siteData.roleSecondary}</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Full-stack developer building web apps and ERP systems with Laravel, React, and a focus on clean, reliable delivery.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Connect</h4>
            <div className="flex gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-purple-500/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
            <a href={`mailto:${siteData.email}`} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              {siteData.email}
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
