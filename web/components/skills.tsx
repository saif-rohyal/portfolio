"use client";

import { useState } from "react";
import { Bot, Server, Database, Layout, Sparkles, CheckCircle2 } from "lucide-react";
import { SKILL_CATEGORIES, SkillCategory } from "@/data/skills";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("ai-agents");

  const getIcon = (iconName: SkillCategory["iconName"]) => {
    switch (iconName) {
      case "bot":
        return <Bot className="w-5 h-5" />;
      case "server":
        return <Server className="w-5 h-5" />;
      case "database":
        return <Database className="w-5 h-5" />;
      case "layout":
        return <Layout className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>02 / Technical Competence</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Skills &amp; Architecture
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-sans">
              Hover over or tap any skill to reveal its architectural context and implementation details.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-accent-sm scale-[1.02]"
                    : "bg-surface border border-surface-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                }`}
              >
                {getIcon(cat.iconName)}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description & Skill Cards Grid */}
        {SKILL_CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
          <div key={cat.id} className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-surface-muted border border-surface-border text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{cat.title}:</span> {cat.description}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="group relative p-4 rounded-xl border border-surface-border bg-surface hover:border-accent hover:shadow-soft transition-all duration-200 overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-base text-foreground group-hover:text-accent transition-colors">
                          {skill.name}
                        </h3>
                        {skill.highlight && (
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" title="Core Specialty" />
                        )}
                      </div>
                      <span className="inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-surface-muted text-muted-foreground border border-surface-border/60">
                        {skill.level}
                      </span>
                    </div>

                    <CheckCircle2 className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors shrink-0 mt-1" />
                  </div>

                  {/* Technical Reveal Note */}
                  {skill.note && (
                    <div className="mt-3 pt-3 border-t border-surface-border/60 text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                      {skill.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
