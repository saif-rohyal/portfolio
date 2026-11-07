"use client";

import { useState } from "react";
import { CERTIFICATES } from "@/data/certificates";
import { ACHIEVEMENTS } from "@/data/achievements";
import { EDUCATION } from "@/data/education";
import { GraduationCap, Award, ExternalLink, Copy, Check, FileCheck2 } from "lucide-react";

export function Credentials() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const aiCertificates = CERTIFICATES.filter((c) => c.group === "AI and Agents");
  const programmingCertificates = CERTIFICATES.filter((c) => c.group === "Programming, CS and English");

  return (
    <section id="credentials" className="py-20 md:py-28 border-t border-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Main Section Header */}
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>05 / Verified Records</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Credentials &amp; Education
              </h2>
              <div className="w-10 h-0.5 bg-accent mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-sans leading-relaxed">
              All credentials and awards are verifiable with corresponding institutional issuing registries.
            </p>
          </div>
        </div>

        {/* 1. Education Sub-Section Anchor */}
        <div id="education" className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-surface-border pb-3">
            <GraduationCap className="w-5 h-5 text-accent" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Education
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                className="p-6 sm:p-8 rounded-2xl border border-surface-border bg-surface shadow-soft-sm hover-lift"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4 mb-4">
                  <div>
                    <h4 className="text-xl font-serif font-bold text-foreground">
                      {edu.degree}
                    </h4>
                    <div className="text-base text-accent font-semibold">
                      {edu.institution}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">
                      {edu.location}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-xs font-mono bg-surface-muted px-3 py-1 rounded-md border border-surface-border">
                      {edu.period}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground mt-0.5">
                      {edu.status}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground font-sans">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Achievements Sub-Section Anchor */}
        <div id="achievements" className="space-y-6 pt-4">
          <div className="flex items-center gap-2 border-b border-surface-border pb-3">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Honors &amp; Achievements
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border border-accent/30 bg-accent-subtle shadow-soft"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-mono font-bold uppercase tracking-wider">
                        {ach.badgeText}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {ach.date}
                      </span>
                    </div>

                    <h4 className="text-2xl font-serif font-bold text-foreground">
                      {ach.title} — <span className="text-accent">{ach.award}</span>
                    </h4>

                    <div className="text-sm font-semibold text-muted-foreground">
                      Issued by: {ach.issuer}
                    </div>

                    <p className="text-sm text-foreground/80 max-w-2xl leading-relaxed pt-1 font-sans">
                      {ach.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span>Credential ID:</span>
                      <code className="bg-surface px-2 py-0.5 rounded border border-surface-border text-foreground font-bold">
                        {ach.credentialId}
                      </code>
                    </div>
                  </div>

                  <div className="shrink-0 pt-2 sm:pt-0">
                    <a
                      href={ach.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground text-xs sm:text-sm font-semibold hover:bg-accent-hover shadow-accent-sm transition-all active:scale-[0.98]"
                    >
                      <span>Show Credential</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Certifications Ledger Sub-Section Anchor */}
        <div id="certifications" className="space-y-8 pt-4">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-accent" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
                Certifications Ledger
              </h3>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              8 Professional Certifications
            </span>
          </div>

          {/* Group 1: AI and Agents */}
          <div className="space-y-4">
            <div className="text-sm font-mono font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              AI &amp; Autonomous Agents
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface divide-y divide-surface-border overflow-hidden shadow-soft-sm">
              {aiCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-muted transition-colors duration-150"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg text-foreground">
                        {cert.title}
                      </span>
                      {cert.issuerBadge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-muted text-accent font-semibold border border-accent/20">
                          {cert.issuerBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-sans">
                      <span className="font-medium text-foreground/80">{cert.issuer}</span>
                      <span>•</span>
                      <span className="font-mono">{cert.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skillsCovered.map((s) => (
                        <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-muted border border-surface-border text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ID Copy & Action Cluster */}
                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <div className="flex items-center gap-1 bg-surface-muted px-2.5 py-1 rounded-lg border border-surface-border text-xs font-mono text-muted-foreground">
                      <span className="text-[11px] select-all font-bold text-foreground">
                        {cert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(cert.credentialId)}
                        className="p-1 hover:text-accent transition-colors relative"
                        title="Copy credential ID"
                      >
                        {copiedId === cert.credentialId ? (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-accent text-xs font-semibold text-foreground hover:text-accent transition-colors shadow-sm"
                      >
                        <span>Show credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Programming, CS and English */}
          <div className="space-y-4 pt-4">
            <div className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-surface-border" />
              Programming, Computer Science &amp; Communication
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface divide-y divide-surface-border overflow-hidden shadow-soft-sm">
              {programmingCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-muted transition-colors duration-150"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base sm:text-lg text-foreground">
                        {cert.title}
                      </span>
                      {cert.issuerBadge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-muted text-muted-foreground font-medium border border-surface-border">
                          {cert.issuerBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-sans">
                      <span className="font-medium text-foreground/80">{cert.issuer}</span>
                      <span>•</span>
                      <span className="font-mono">{cert.date}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skillsCovered.map((s) => (
                        <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-muted border border-surface-border text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ID Copy & Action Cluster */}
                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <div className="flex items-center gap-1 bg-surface-muted px-2.5 py-1 rounded-lg border border-surface-border text-xs font-mono text-muted-foreground">
                      <span className="text-[11px] select-all font-bold text-foreground">
                        {cert.credentialId}
                      </span>
                      {cert.credentialId !== "[placeholder: PENDING-ID]" && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(cert.credentialId)}
                          className="p-1 hover:text-accent transition-colors"
                          title="Copy credential ID"
                        >
                          {copiedId === cert.credentialId ? (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-accent text-xs font-semibold text-foreground hover:text-accent transition-colors shadow-sm"
                      >
                        <span>Show credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
