"use client";

import { ArrowUp } from "lucide-react";
import { SocialLinksRow } from "./social-links-row";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-surface-border bg-surface/50 py-12 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-surface-border">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-xl text-foreground tracking-tight">
              Saif Rohyal
            </h3>
            <p className="text-sm text-muted-foreground font-sans">
              Full Stack AI Engineer • Peshawar, Pakistan
            </p>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-accent transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Social Row & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
              Connect Across Networks:
            </span>
            <SocialLinksRow />
          </div>

          <div className="text-xs font-mono text-muted-foreground sm:text-right">
            © {new Date().getFullYear()} Saif Rohyal. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
