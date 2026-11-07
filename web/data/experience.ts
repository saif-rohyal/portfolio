export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "al-ahad-junior-ai",
    role: "Junior AI Engineer",
    company: "Al-Ahad International Tech (Pvt) Ltd",
    location: "Timergara, KPK, Pakistan",
    period: "July 2026 – September 2026",
    current: false,
    type: "On-site / Hybrid",
    description: "Built autonomous multi-agent production pipelines and backend API infrastructure powering AI assistants.",
    responsibilities: [
      "Designed and built multi-agent AI workflows with LangGraph and LangChain, with specialised agents coordinated by a supervisor agent.",
      "Developed Python and FastAPI backend services to expose AI agent features through APIs.",
      "Connected agents to external tools and data sources using MCP (Model Context Protocol) and automated workflows with n8n.",
      "Prototyped and tested AI assistants (such as voice and customer-support agents), refining prompts and agent behaviour based on test results."
    ],
    technologies: ["LangGraph", "LangChain", "Python", "FastAPI", "MCP", "n8n", "REST APIs", "Prompt Engineering"]
  }
];
