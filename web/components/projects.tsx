"use client";

import { useState } from "react";
import { PROJECTS, ProjectItem, ProjectCategory } from "@/data/projects";
import { ExternalLink, Activity, Layers, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/social-icons";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = ["All", "AI Agents", "Computer Vision", "Full Stack", "Voice"];

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>03 / Featured Implementations</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                AI Systems &amp; Projects
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-sans">
              Five end-to-end AI applications spanning multi-agent workflows, computer vision, and real-time voice streaming.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-accent-sm scale-[1.02]"
                  : "bg-surface border border-surface-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group flex flex-col justify-between rounded-2xl border border-surface-border bg-surface p-6 shadow-soft-sm hover:border-accent hover:shadow-soft transition-all duration-200 ${
                idx === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="space-y-4">
                {/* Header: Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-accent-muted text-accent font-semibold border border-accent/20">
                    {project.category}
                  </span>
                  
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full ${
                      project.status === "Live"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "Live" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Measurable Result Banner (If present) */}
                {project.measurableResult && (
                  <div className="p-3 rounded-xl bg-surface-muted border border-surface-border/60 flex items-start gap-2 text-xs text-foreground font-medium">
                    <Activity className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{project.measurableResult}</span>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-muted text-muted-foreground border border-surface-border/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 mt-6 border-t border-surface-border flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture &amp; Details</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-surface-border text-xs font-medium hover:bg-surface-muted transition-colors text-foreground"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3 text-accent" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-muted border border-surface-border hover:border-accent text-xs font-semibold text-foreground hover:text-accent transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/saif-rohyal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface-border bg-surface hover:bg-surface-muted text-foreground font-semibold text-sm transition-all shadow-soft-sm group"
          >
            <GithubIcon className="w-4 h-4 text-accent" />
            <span>View all repositories on GitHub (@saif-rohyal)</span>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </div>

      </div>

      {/* Project Detail Modal / Mobile Bottom Sheet */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-surface-border rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 shadow-soft-lg space-y-6 animate-in slide-in-from-bottom-6 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <h3 id="modal-title" className="text-2xl font-display font-bold text-foreground mt-1">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg border border-surface-border text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Narrative */}
            <p className="text-sm text-foreground/90 leading-relaxed font-sans">
              {selectedProject.fullDescription}
            </p>

            {/* Architecture Overview */}
            <div className="p-4 rounded-xl bg-surface-muted border border-surface-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Architecture Breakdown</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {selectedProject.architectureSummary}
              </p>
            </div>

            {/* System Flow Diagram List */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                System Execution Pipeline
              </div>
              <div className="space-y-2">
                {selectedProject.systemFlow.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-accent-muted text-accent font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Features */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-foreground uppercase tracking-wider">
                Key Engineering Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                {selectedProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-surface-border flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl border border-surface-border text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Close
              </button>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-accent text-accent-foreground font-semibold text-xs hover:bg-accent-hover shadow-accent-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
