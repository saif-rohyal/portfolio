"use client";

import Image from "next/image";
import { Languages, Flame, ArrowRight, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { AVATAR_BLUR_DATA_URL } from "@/data/image-meta";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-surface-border bg-surface/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>01 / Profile &amp; Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
            About Saif Rohyal
          </h2>
          <div className="w-10 h-0.5 bg-accent mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Framed Portrait with Warm Offset & Gentle Tilt (Col 1-5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Handcrafted Warm Terracotta Offset Frame */}
              <div className="absolute top-3.5 -left-3.5 sm:-left-5 w-full h-full rounded-2xl bg-accent-muted border border-accent/25 -rotate-2 transition-transform duration-300 pointer-events-none" />
              
              {/* Secondary architectural dashed frame */}
              <div className="absolute -top-2.5 -right-2.5 w-full h-full rounded-2xl border border-dashed border-surface-border rotate-1 pointer-events-none" />

              {/* Main Portrait Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-surface-border bg-surface-muted shadow-soft transform hover:rotate-0 rotate-1 transition-all duration-300">
                <Image
                  src="/images/saif-800.webp"
                  alt="Saif Rohyal, Full Stack AI Engineer"
                  fill
                  sizes="(max-width: 640px) 320px, 400px"
                  placeholder="blur"
                  blurDataURL={AVATAR_BLUR_DATA_URL}
                  className="object-cover object-top contrast-[1.02] brightness-[1.01]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 flex items-center justify-between">
                  <span>Peshawar, Pakistan</span>
                  <span className="text-accent font-semibold">BS IT (2024–2028)</span>
                </div>
              </div>

              {/* Verified Badge below portrait */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Verified Official Portfolio &amp; Credentials</span>
              </div>
            </div>
          </div>

          {/* Bio, Stats & Details (Col 6-12) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* First-person Bio */}
            <div className="prose prose-lg text-foreground/90 space-y-4 leading-relaxed font-sans">
              <p className="text-lg sm:text-xl font-medium text-foreground">
                {PROFILE.bio}
              </p>
              <p className="text-base text-muted-foreground">
                My engineering approach is grounded in end-to-end ownership: designing the cognitive reasoning loop 
                (supervisor delegation, state memory, guardrails), exposing it through fast, typed Python &amp; FastAPI 
                services, and delivering clean, intuitive web interfaces.
              </p>
            </div>

            {/* Quick Stats Grid (3 items: 5 projects, 8 certs, BS IT 2024-2028 - zero GPA) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROFILE.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-surface-border bg-surface hover-lift transition-colors shadow-soft-sm"
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-foreground mt-1 font-sans">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages Grid */}
            <div className="p-5 rounded-xl border border-surface-border bg-surface">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground font-sans">
                <Languages className="w-4 h-4 text-accent" />
                <span>Languages &amp; Certifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROFILE.languages.map((lang, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-surface-muted border border-surface-border/50 text-xs">
                    <div className="font-semibold text-foreground">{lang.name}</div>
                    <div className="text-muted-foreground font-mono mt-0.5">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* "Currently Working On" Live Note Card */}
            <div className="p-4 rounded-xl border border-accent/25 bg-accent-subtle flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent text-accent-foreground mt-0.5">
                <Flame className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider font-bold text-accent">
                  Active R&amp;D Focus
                </div>
                <div className="text-sm text-foreground font-medium font-sans">
                  {PROFILE.currentlyWorkingOn}
                </div>
              </div>
            </div>

            {/* Action link to Experience */}
            <div className="pt-2">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline group"
              >
                <span>Read about Saif&apos;s role at Al-Ahad International Tech</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
