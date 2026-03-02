"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import TechUniverse from "@/components/TechUniverse";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Services />
      <div className="section-divider" />
      <TechUniverse />
      <div className="section-divider" />
      <FeaturedProjects />
      <div className="section-divider" />
      <ContactForm />
    </>
  );
}
