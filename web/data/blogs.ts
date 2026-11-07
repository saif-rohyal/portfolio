export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  takeaway: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "supervisor-multi-agent-langgraph",
    title: "Architecting Supervisor Multi-Agent Networks with LangGraph",
    date: "October 2026",
    readTime: "6 min read",
    category: "Architecture",
    summary: "How to decouple complex business processes into specialized sub-agents orchestrated by a central supervisor, preventing conversational drift and ensuring guaranteed task termination.",
    takeaway: "State graphs with strict edge validation eliminate infinite loop hazards common in naive conversational agent setups.",
    tags: ["LangGraph", "Multi-Agent", "Python", "State Machines"]
  },
  {
    slug: "unifying-tools-with-mcp",
    title: "Unifying Agent Tools with Model Context Protocol (MCP)",
    date: "September 2026",
    readTime: "5 min read",
    category: "Protocols & Standards",
    summary: "Why hardcoding API tools inside agent prompts fails at scale, and how the Model Context Protocol provides an isolated, secure, and standardized bridge between agents and local/cloud resources.",
    takeaway: "MCP turns every tool into an independently verifiable contract, preventing tool-poisoning and runtime execution mismatches.",
    tags: ["MCP", "API Design", "Security", "FastAPI"]
  },
  {
    slug: "sub-second-voice-ai-pipelines",
    title: "Engineering Sub-Second Voice AI Pipelines with WebSockets",
    date: "August 2026",
    readTime: "7 min read",
    category: "Real-time Systems",
    summary: "Breaking down the latency bottlenecks in conversational voice agents. Implementing chunked acoustic streaming, optimistic intent routing, and natural audio barge-in interruption.",
    takeaway: "Streaming intermediate audio frames directly to LLM token buffers cuts perceived response latency by over 60%.",
    tags: ["Voice AI", "WebSockets", "FastAPI", "Streaming"]
  }
];
