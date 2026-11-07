"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ChevronDown, Award, GraduationCap, FileCheck2, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credentialsOpen, setCredentialsOpen] = useState(false);
  const [mobileCredentialsOpen, setMobileCredentialsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll spy for active section
      const sections = ["about", "skills", "sandbox", "projects", "experience", "credentials", "blog", "contact"];
      const scrollPos = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCredentialsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCredentialsOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
  ];

  const credentialSublinks = [
    { label: "Education", href: "#education", desc: "Ghazi University (BS IT)", icon: GraduationCap },
    { label: "Achievements", href: "#achievements", desc: "Pak Angels Gen AI Award", icon: Award },
    { label: "Certifications", href: "#certifications", desc: "Google & Professional Credentials", icon: FileCheck2 },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--nav-backdrop)] backdrop-blur-md border-b border-surface-border py-3 shadow-soft-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-accent text-accent-foreground font-display font-bold flex items-center justify-center text-sm shadow-accent-sm transition-transform group-hover:scale-105">
              SR
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-base sm:text-lg group-hover:text-accent transition-colors">
                Saif Rohyal
              </span>
              <span className="text-[10px] tracking-wider uppercase text-muted-foreground font-mono -mt-1">
                Full Stack AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-accent font-semibold bg-accent-subtle"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Desktop Credentials Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCredentialsOpen(!credentialsOpen)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setCredentialsOpen(true);
                  }
                }}
                aria-expanded={credentialsOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                  activeSection === "credentials"
                    ? "text-accent font-semibold bg-accent-subtle"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
                }`}
              >
                <span>Credentials</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    credentialsOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>

              {credentialsOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-surface-border bg-surface p-2 shadow-soft-lg animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground border-b border-surface-border mb-1">
                    Verified Portfolio Records
                  </div>
                  {credentialSublinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setCredentialsOpen(false)}
                        role="menuitem"
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-muted transition-colors group"
                      >
                        <div className="p-1.5 rounded-md bg-accent-subtle text-accent mt-0.5 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-accent transition-colors flex items-center gap-1">
                            {item.label}
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-1 mt-1 border-t border-surface-border">
                    <Link
                      href="#credentials"
                      onClick={() => setCredentialsOpen(false)}
                      className="block px-3 py-1.5 text-xs text-center font-medium text-accent hover:underline"
                    >
                      View All Credentials →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="#blog"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "blog"
                  ? "text-accent font-semibold bg-accent-subtle"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              }`}
            >
              Blog
            </Link>

            <Link
              href="#contact"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "contact"
                  ? "text-accent font-semibold bg-accent-subtle"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-muted"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-accent-hover transition-colors shadow-accent-sm active:scale-95"
            >
              Get in Touch
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-surface-border text-foreground hover:bg-surface-muted focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-border bg-surface px-4 pt-3 pb-6 shadow-soft-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-medium ${
                  activeSection === link.id
                    ? "text-accent bg-accent-subtle font-semibold"
                    : "text-foreground hover:bg-surface-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Accordion for Credentials */}
            <div className="border-t border-b border-surface-border/60 py-1 my-1">
              <button
                type="button"
                onClick={() => setMobileCredentialsOpen(!mobileCredentialsOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-surface-muted text-left"
              >
                <span>Credentials</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                    mobileCredentialsOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>

              {mobileCredentialsOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1">
                  {credentialSublinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setMobileCredentialsOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-accent hover:bg-surface-muted"
                    >
                      {item.label}
                      <span className="block text-xs text-muted-foreground/80">{item.desc}</span>
                    </Link>
                  ))}
                  <Link
                    href="#credentials"
                    onClick={() => {
                      setMobileCredentialsOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-1.5 text-xs font-semibold text-accent"
                  >
                    All Credentials Ledger →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-surface-muted"
            >
              Blog
            </Link>

            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-surface-muted"
            >
              Contact
            </Link>

            <div className="pt-3">
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent-hover shadow-accent-sm text-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
