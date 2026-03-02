"use client";

import AnimateInView from "./AnimateInView";
import { techStack } from "@/data/techStack";
import Image from "next/image";

export default function TechUniverse() {
  return (
    <section className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <AnimateInView className="text-center mb-4">
          <span className="section-label">Technologies</span>
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
              Tech Universe
            </span>
          </h2>
        </AnimateInView>

        <AnimateInView className="text-center mb-20" delay={0.1}>
          <p className="font-mono text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Navigating the digital space with a robust constellation of technologies, frameworks, and tools designed for scalability and performance.
          </p>
        </AnimateInView>

        <div className="space-y-16">
          {techStack.map((category, catIndex) => (
            <AnimateInView key={category.title} delay={catIndex * 0.08}>
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">{category.title}</h3>
                  <p className="text-gray-500 text-sm">{category.description}</p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300 cursor-default group"
                    >
                      <div className="w-10 h-10 relative flex items-center justify-center">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 text-center leading-tight font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
