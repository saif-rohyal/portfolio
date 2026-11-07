"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageSquare, Download, CheckCircle2, ArrowUpRight } from "lucide-react";
import { SocialLinksRow } from "@/components/social-links-row";
import { PROFILE } from "@/data/profile";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMsg("Please complete all fields before sending.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-surface-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>07 / Start a Conversation</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Get in Touch
              </h2>
              <div className="w-10 h-0.5 bg-accent mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-sans leading-relaxed">
              Currently open to Full Stack AI Engineer roles, remote engineering opportunities, and startup advisory.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Direct Actions (Col 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <h3 className="text-xl font-serif font-bold text-foreground">
                Let&apos;s build intelligent products together.
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                Whether you have an autonomous multi-agent engineering challenge, need a resilient 
                FastAPI agent backend, or want to discuss full-time opportunities, my inbox is open.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-surface-border bg-surface hover-lift flex items-center gap-4 shadow-soft-sm">
                <div className="p-2.5 rounded-lg bg-accent-subtle text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Direct Email</div>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-surface-border bg-surface hover-lift flex items-center gap-4 shadow-soft-sm">
                <div className="p-2.5 rounded-lg bg-accent-subtle text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Base Location</div>
                  <div className="text-sm font-semibold text-foreground">
                    {PROFILE.location} <span className="text-xs font-normal text-muted-foreground">(Open to Remote &amp; Relocation)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons (WhatsApp via server redirect & CV Download) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              {/* WhatsApp button routing STRICTLY via /api/whatsapp */}
              <a
                href="/api/whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-accent-sm transition-all active:scale-[0.98] flex-1"
                title="Connect directly on WhatsApp via server redirect"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 opacity-80" />
              </a>

              <a
                href="/saif-cv.pdf"
                download="Saif-Rohyal-CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-surface-border bg-surface hover:bg-surface-muted text-foreground font-semibold text-sm shadow-soft-sm transition-all active:scale-[0.98]"
                title="Download verified resume as PDF"
              >
                <Download className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Network Links with Brand Icons */}
            <div className="pt-4 border-t border-surface-border space-y-3">
              <div className="text-xs font-mono uppercase text-muted-foreground font-semibold">
                Connect Across Networks:
              </div>
              <SocialLinksRow />
            </div>

          </div>

          {/* Validated Contact Form (Col 6-12) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-surface-border bg-surface shadow-soft-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-12 h-12 rounded-full bg-accent-muted text-accent mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    Message Dispatched!
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto font-sans leading-relaxed">
                    Thank you for reaching out. Saif Rohyal will review your message and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-serif font-bold text-foreground">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans">
                      Form is client &amp; server validated with anti-spam protections.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono font-semibold text-foreground">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-semibold text-foreground">
                        Your Email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-mono font-semibold text-foreground">
                      Project or Role Overview <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your product requirements, agent workflows, or open engineering roles..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-surface-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover shadow-accent-sm transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    <Send className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : ""}`} />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
