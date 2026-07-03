"use client";

import AnimateInView from "./AnimateInView";
import { services } from "@/data/services";
import { Code, Server, Palette, Search, FileText, Zap } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code, Server, Palette, Search, FileText, Zap,
};

export default function Services() {
  return (
    <section className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <AnimateInView className="text-center mb-4">
          <span className="section-label">What I Do</span>
        </AnimateInView>

        <AnimateInView className="text-center mb-4" delay={0.05}>
          <h2 className="font-bold leading-tight">
            <span className="block text-5xl md:text-6xl text-white">My</span>
            <span
              className="block text-5xl md:text-6xl"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.15) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h2>
        </AnimateInView>

        <AnimateInView className="text-center mb-16" delay={0.1}>
          <p className="font-mono text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            What I build for clients — from ERP systems and APIs to automation
          </p>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <AnimateInView key={service.title} delay={i * 0.08}>
                <div className="glass-card p-8 h-full flex flex-col items-center text-center hover:border-white/15 transition-all duration-300">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {Icon && <Icon size={24} className="text-gray-300" />}
                  </div>
                  <h3 className="text-base font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
                </div>
              </AnimateInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
