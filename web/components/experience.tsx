"use client";

import { EXPERIENCES } from "@/data/experience";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-surface-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>04 / Work History</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Professional Experience
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-sans">
              Production engineering contributions in autonomous multi-agent pipelines and backend API infrastructure.
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-accent/30 space-y-12">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Pin Indicator */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 border-accent bg-surface flex items-center justify-center shadow-soft-sm group-hover:scale-110 transition-transform">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl border border-surface-border bg-surface hover:border-accent hover:shadow-soft transition-all duration-200 space-y-6">
                
                {/* Header Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <div className="text-base font-semibold text-accent mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1 bg-surface-muted px-2.5 py-1 rounded-md border border-surface-border/60">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 bg-surface-muted px-2.5 py-1 rounded-md border border-surface-border/60">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities Checklist */}
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Key Engineering Contributions:
                  </div>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Pills */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-md bg-surface-muted border border-surface-border text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
