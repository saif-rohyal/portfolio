export interface SocialLink {
  name: string;
  url: string;
  iconName: 'github' | 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'mail';
}

export interface Language {
  name: string;
  level: string;
  isNative?: boolean;
}

export const PROFILE = {
  name: "Saif Rohyal",
  firstName: "Saif",
  lastName: "Rohyal",
  title: "Full Stack AI Engineer",
  headline: "I build AI agents and the full stack products around them.",
  location: "Peshawar, Pakistan",
  email: "saifullahjan5417st@gmail.com",
  targetRoles: "Full-time roles, remote engineering teams, and high-velocity startups",
  bio: "I'm Saif Rohyal. I build autonomous, multi-agent AI systems with LangGraph, LangChain, OpenAI Agents SDK, CrewAI, AutoGen and MCP, backed by Python and FastAPI. I have built five end-to-end AI projects, from an e-commerce ops agent to a voice booking assistant, and I am looking for a job, remote role or startup where I can keep building AI products end to end.",
  currentlyWorkingOn: "Architecting autonomous supervisor-agent workflows with tool-calling sandboxes and streaming voice interaction.",
  heroRoles: [
    "AI Agents Engineer",
    "Full Stack Developer",
    "Automation Builder"
  ],
  stats: [
    { label: "AI Projects Built", value: "5", detail: "End-to-End Deployed & Tested" },
    { label: "Certifications", value: "8", detail: "Coursera, Google & Digital Workforce" },
    { label: "Degree Timeline", value: "BS IT", detail: "Ghazi University (2024–2028)" }
  ],
  languages: [
    { name: "Pashto", level: "Mother Tongue", isNative: true },
    { name: "Urdu", level: "Mother Tongue", isNative: true },
    { name: "English", level: "B1 Intermediate (Coursera Certified)", isNative: false }
  ] as Language[],
  socials: [
    { name: "GitHub", url: "https://github.com/saif-rohyal", iconName: "github" },
    { name: "X", url: "https://x.com/zaif_ukash", iconName: "twitter" },
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61551007321346", iconName: "facebook" },
    { name: "Instagram", url: "https://www.instagram.com/xvif_khvn", iconName: "instagram" },
    { name: "LinkedIn", url: "https://linkedin.com/in/saif-rohyal", iconName: "linkedin" }
  ] as SocialLink[]
};
