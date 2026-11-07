"use client";

import { BLOG_POSTS } from "@/data/blogs";
import { Clock, ArrowUpRight } from "lucide-react";

export function Blog() {
  return (
    <section id="blog" className="py-20 md:py-28 border-t border-surface-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest font-semibold mb-2">
            <span>06 / Technical Insights</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Case Studies &amp; Architecture Notes
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full mt-3" />
            </div>
            <p className="text-sm text-muted-foreground max-w-md font-sans">
              Engineering essays dissecting multi-agent coordination, protocol design, and streaming voice systems.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-surface-border bg-surface p-6 shadow-soft-sm hover:border-accent hover:shadow-soft transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-muted text-accent font-semibold border border-accent/20">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.summary}
                </p>

                {/* Architectural Takeaway */}
                <div className="p-3 rounded-xl bg-surface-muted border border-surface-border/60 text-xs text-foreground/90 leading-relaxed">
                  <span className="font-mono text-accent font-semibold uppercase tracking-wider block text-[10px] mb-1">
                    Core Takeaway:
                  </span>
                  {post.takeaway}
                </div>
              </div>

              {/* Tags & Footer Link */}
              <div className="pt-6 mt-6 border-t border-surface-border flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-muted text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Discuss Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
