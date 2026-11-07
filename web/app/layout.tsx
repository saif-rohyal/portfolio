import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const serifFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saif-rohyal.dev"),
  title: "Saif Rohyal — Full Stack AI Engineer",
  description: "Portfolio of Saif Rohyal. I build autonomous, multi-agent AI systems with LangGraph, LangChain, OpenAI Agents SDK, CrewAI, AutoGen, and MCP, backed by Python and FastAPI.",
  keywords: [
    "Saif Rohyal",
    "Full Stack AI Engineer",
    "Agentic AI Engineer",
    "LangGraph",
    "LangChain",
    "FastAPI",
    "Python AI",
    "Model Context Protocol",
    "MCP",
    "Multi-Agent Systems",
    "Peshawar AI Engineer"
  ],
  authors: [{ name: "Saif Rohyal", url: "https://github.com/saif-rohyal" }],
  creator: "Saif Rohyal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saif-rohyal.dev",
    title: "Saif Rohyal — Full Stack AI Engineer",
    description: "I build AI agents and the full stack products around them. Explore multi-agent architectures, computer vision, and real-time voice agents.",
    siteName: "Saif Rohyal Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saif Rohyal, Full Stack AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saif Rohyal — Full Stack AI Engineer",
    description: "I build AI agents and the full stack products around them.",
    creator: "@zaif_ukash",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#262624" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Saif Rohyal",
    givenName: "Saif",
    familyName: "Rohyal",
    jobTitle: "Full Stack AI Engineer",
    description: "I build autonomous, multi-agent AI systems with LangGraph, LangChain, OpenAI Agents SDK, CrewAI, AutoGen and MCP, backed by Python and FastAPI.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Peshawar",
      addressCountry: "Pakistan"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Ghazi University"
    },
    knowsAbout: [
      "LangGraph",
      "LangChain",
      "OpenAI Agents SDK",
      "Model Context Protocol (MCP)",
      "Multi-Agent Architectures",
      "FastAPI",
      "Python",
      "Computer Vision",
      "Voice AI",
      "Next.js"
    ],
    sameAs: [
      "https://github.com/saif-rohyal",
      "https://x.com/zaif_ukash",
      "https://www.facebook.com/profile.php?id=61551007321346",
      "https://www.instagram.com/xvif_khvn",
      "https://linkedin.com/in/saif-rohyal"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
