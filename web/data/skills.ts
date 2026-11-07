export interface SkillItem {
  name: string;
  level: string;
  highlight?: boolean;
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: 'bot' | 'server' | 'database' | 'layout' | 'cpu';
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-agents",
    title: "AI & Multi-Agent Frameworks",
    iconName: "bot",
    description: "Architectures for autonomous reasoning, supervisor coordination, and tool execution.",
    skills: [
      { name: "LangGraph", level: "Production", highlight: true, note: "Cyclic state graphs, checkpointing & human-in-the-loop" },
      { name: "LangChain", level: "Production", highlight: true, note: "Chains, retrieval, custom agent toolkits" },
      { name: "OpenAI Agents SDK", level: "Advanced", highlight: true, note: "Agent handoffs, guards, and function calling" },
      { name: "CrewAI", level: "Advanced", note: "Role-playing autonomous agent crews" },
      { name: "AutoGen", level: "Advanced", note: "Multi-agent conversational workflows" },
      { name: "Model Context Protocol (MCP)", level: "Production", highlight: true, note: "Universal tool and resource connections" },
      { name: "n8n Automation", level: "Advanced", note: "Webhook pipelines & agent event triggers" },
      { name: "Multi-Agent Systems", level: "Specialist", highlight: true, note: "Supervisor-worker hierarchical graphs" },
      { name: "Computer Vision", level: "Proficient", note: "Object detection, face recognition, OpenCV" },
      { name: "Voice AI Agents", level: "Proficient", note: "Streaming STT/TTS with low latency" }
    ]
  },
  {
    id: "backend-systems",
    title: "Backend & Systems Engineering",
    iconName: "server",
    description: "Robust asynchronous API architectures, streaming endpoints, and service integrations.",
    skills: [
      { name: "Python", level: "Primary Language", highlight: true, note: "Asyncio, OOP, data processing, SDK authoring" },
      { name: "FastAPI", level: "Production", highlight: true, note: "High-concurrency async APIs, SSE streaming, dependency injection" },
      { name: "Streaming SSE & WebSockets", level: "Advanced", note: "Bidirectional real-time token and audio streaming" },
      { name: "Pydantic", level: "Advanced", note: "Strict data validation and schema serialization" },
      { name: "RESTful Architecture", level: "Advanced", note: "Contract-first API design and robust error handling" }
    ]
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    iconName: "database",
    description: "Extracting actionable insights, structuring data models, and automating reporting.",
    skills: [
      { name: "SQL", level: "Advanced", highlight: true, note: "Relational queries, window functions, schema design" },
      { name: "Excel", level: "Advanced", note: "Advanced modeling, pivot workflows, formulas" },
      { name: "Power BI", level: "Proficient", note: "Interactive executive dashboards & DAX analytics" },
      { name: "Data Transformation", level: "Advanced", note: "Data cleaning, schema mapping, normalization" }
    ]
  },
  {
    id: "frontend-cloud",
    title: "Frontend, Database & Cloud",
    iconName: "layout",
    description: "Modern user interfaces, reactive state management, and modern infrastructure.",
    skills: [
      { name: "Next.js (App Router)", level: "Proficient", highlight: true, note: "React Server Components, edge routes, SSR" },
      { name: "TypeScript", level: "Proficient", note: "Strict end-to-end type safety" },
      { name: "Tailwind CSS", level: "Advanced", note: "Responsive bespoke styling, design tokens" },
      { name: "Framer Motion", level: "Advanced", note: "Fluid micro-interactions, layout transitions" },
      { name: "Vector Databases [placeholder]", level: "Exploring", note: "ChromaDB, Pinecone, pgvector embeddings" },
      { name: "Docker & Cloud [placeholder]", level: "Exploring", note: "Containerized deployment on Render/Railway/Vercel" }
    ]
  }
];
