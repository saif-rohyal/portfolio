"use client";

import React from 'react';
import { GithubIcon, TwitterXIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from './social-icons';

interface SocialItem {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  brandBg: string;
  brandText: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/saif-rohyal",
    icon: GithubIcon,
    brandBg: "hover:bg-[#24292F] dark:hover:bg-[#FFFFFF] hover:border-[#24292F] dark:hover:border-[#FFFFFF]",
    brandText: "hover:text-white dark:hover:text-[#24292F]",
  },
  {
    id: "x",
    name: "X (Twitter)",
    url: "https://x.com/zaif_ukash",
    icon: TwitterXIcon,
    brandBg: "hover:bg-[#000000] dark:hover:bg-[#FFFFFF] hover:border-[#000000] dark:hover:border-[#FFFFFF]",
    brandText: "hover:text-white dark:hover:text-[#000000]",
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61551007321346",
    icon: FacebookIcon,
    brandBg: "hover:bg-[#1877F2] hover:border-[#1877F2]",
    brandText: "hover:text-white",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/xvif_khvn",
    icon: InstagramIcon,
    brandBg: "hover:bg-[#E4405F] hover:border-[#E4405F]",
    brandText: "hover:text-white",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/saif-rohyal",
    icon: LinkedinIcon,
    brandBg: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
    brandText: "hover:text-white",
  },
];

export function SocialLinksRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {SOCIAL_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="relative group">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open Saif Rohyal's ${item.name}`}
              className={`w-11 h-11 rounded-full border border-surface-border bg-surface text-muted-foreground flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${item.brandBg} ${item.brandText}`}
            >
              <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
            </a>

            {/* Accessible tooltip */}
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-foreground text-background text-[11px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-sm z-30"
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
