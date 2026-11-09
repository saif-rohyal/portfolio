"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Sparkles, MapPin, Briefcase, Terminal, ArrowRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { AVATAR_BLUR_DATA_URL } from "@/data/image-meta";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.heroRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle warm background glow */}
      <div className="absolute top-12 right-1/4 w-96 h-96 rounded-full bg-accent/[0.04] blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-accent/[0.04] blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Col 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Availability Badge & Location */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-muted text-accent border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for AI roles &amp; startups
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {PROFILE.location}
              </span>
            </div>

            {/* Main Headline with Dynamic Role */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-foreground leading-[1.15]">
                Hello, I&apos;m <span className="hand-drawn-underline text-accent">{PROFILE.name}</span>.
              </h1>
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium text-muted-foreground flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-accent inline-block" />
                  <span className="text-foreground transition-all duration-300">
                    {PROFILE.heroRoles[roleIndex]}
                  </span>
                </span>
              </div>
            </div>

            {/* Core Hero Line */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl font-sans">
              {PROFILE.headline}
            </p>

            {/* Technical Anchor Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {["LangGraph", "LangChain", "FastAPI", "Python", "MCP", "Multi-Agent Systems"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-surface border border-surface-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover shadow-accent-sm transition-all active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-surface-border bg-surface hover:bg-surface-muted text-foreground font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <Briefcase className="w-4 h-4 text-accent" />
                <span>Contact Me</span>
              </Link>

              <a
                href="/saif-cv.pdf"
                download="Saif-Rohyal-CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-muted transition-colors text-sm font-medium"
                title="Download verified CV as PDF"
              >
                <Download className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Hero Portrait Preview (Col 8-12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              
              {/* Artisanal decorative offset border and backdrop */}
              <div className="absolute -inset-2 rounded-2xl bg-accent-muted -rotate-2 group-hover:-rotate-3 transition-transform duration-300" />
              <div className="absolute -inset-1 rounded-2xl border border-dashed border-surface-border rotate-1 group-hover:rotate-2 transition-transform duration-300" />

              {/* Main Portrait Frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-surface-border bg-surface-muted shadow-soft">
                <Image
                  src="/images/saif-800.webp"
                  alt="Saif Rohyal, Full Stack AI Engineer"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, 288px"
                  placeholder="blur"
                  blurDataURL={AVATAR_BLUR_DATA_URL}
                  className="object-cover object-top filter contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
                />

                {/* Corner Status Chip */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-surface/90 backdrop-blur-md border border-surface-border/80 shadow-soft-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold text-foreground font-sans">AI Systems Engineer</span>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-accent uppercase tracking-wider">
                    Peshawar
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
