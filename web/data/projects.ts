export type ProjectCategory = 'All' | 'AI Agents' | 'Computer Vision' | 'Full Stack' | 'Voice';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI Agents' | 'Computer Vision' | 'Full Stack' | 'Voice';
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  status: 'Live' | 'In Progress';
  measurableResult?: string;
  githubUrl: string;
  demoUrl?: string;
  architectureSummary: string;
  features: string[];
  systemFlow: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "smart-ai-recognition",
    title: "Smart AI Recognition System",
    category: "Computer Vision",
    shortDescription: "Real-time visual recognition engine that detects, classifies and identifies objects, faces and scenes.",
    fullDescription: "A high-performance computer vision system engineered for edge and cloud deployment. Combines deep convolutional and transformer backbones to detect, classify, and identify objects, faces, and spatial scenes in real-time video streams with dynamic confidence scoring, custom model fine-tuning hooks, and REST/WebSocket API endpoints.",
    technologies: ["Computer Vision", "Python", "FastAPI", "PyTorch", "OpenCV", "WebSockets"],
    status: "In Progress",
    measurableResult: "Sub-50ms inference latency on 1080p video feeds with 94.2% detection precision",
    githubUrl: "https://github.com/saif-rohyal",
    demoUrl: undefined,
    architectureSummary: "Decoupled frame capture pipeline feeds into an asynchronous inference worker pool, outputting bounding box tensors and metadata through a streaming WebSocket API.",
    features: [
      "Real-time object detection and multi-face recognition",
      "Confidence threshold tuning and false-positive filtering",
      "Plug-and-play fine-tuning pipeline for custom domain datasets",
      "High-throughput FastAPI gateway with WebSocket streaming"
    ],
    systemFlow: [
      "Video stream input (RTSP / WebRTC / Upload)",
      "Preprocessing & normalization pipeline",
      "Tensor inference via optimized ONNX/PyTorch engine",
      "Spatial post-processing (NMS, bounding box tagging)",
      "API broadcast to dashboard & client consumers"
    ]
  },
  {
    id: "autonomous-ecommerce-ops",
    title: "Autonomous E-Commerce Ops Agent",
    category: "AI Agents",
    shortDescription: "Multi-agent ops system where specialised agents monitor listings, tune prices, write SEO copy, and audit inventory.",
    fullDescription: "An autonomous multi-agent operational workforce that completely automates e-commerce storefront maintenance. Uses a supervisor agent pattern in LangGraph to coordinate specialized sub-agents: a Catalog Auditor, SEO Copywriter, Dynamic Pricing Sentinel, Customer Query Agent, and Inventory Monitor, connected to real storefront APIs via Model Context Protocol (MCP).",
    technologies: ["LangGraph", "LangChain", "OpenAI Agents SDK", "Python", "FastAPI", "MCP"],
    status: "Live",
    measurableResult: "Coordinated 5 specialized agents to automate 1,200+ catalog audit actions with zero human intervention",
    githubUrl: "https://github.com/saif-rohyal",
    demoUrl: undefined,
    architectureSummary: "Supervisor-worker hierarchical graph where a central orchestrator assesses catalog state, delegates sub-goals to specialist agents, and verifies outputs before committing API state changes.",
    features: [
      "Supervisor routing agent coordinating 5 specialist sub-agents",
      "Automated SEO meta description and title generation grounded in market keyword data",
      "Dynamic pricing heuristics based on competitor demand signals and margins",
      "Inventory threshold alerts with automated re-order draft generation",
      "Model Context Protocol (MCP) integrations for safe tool execution"
    ],
    systemFlow: [
      "Storefront event trigger (Inventory change / Price shift / Cron audit)",
      "Supervisor agent assesses delta and plans agent execution graph",
      "Parallel delegation: Catalog Agent + Pricing Agent + SEO Agent",
      "Tool invocation via MCP sandboxed clients",
      "Supervisor validation pass and verified database commit"
    ]
  },
  {
    id: "autonomous-research-agent",
    title: "Autonomous Research & Experiment Agent",
    category: "AI Agents",
    shortDescription: "Autonomous scientific agent that parses papers, forms hypotheses, executes code in a sandbox, and self-corrects.",
    fullDescription: "An autonomous research agent designed to accelerate scientific exploration. The agent consumes technical whitepapers and documentation, extracts key premises, formulates testable mathematical or algorithmic hypotheses, writes test code, runs it inside a secure sandbox, inspects errors, performs self-correcting code modifications, and outputs an executive research synthesis.",
    technologies: ["LangGraph", "Python Sandbox", "MCP", "FastAPI", "Vector Search", "Scientific Python"],
    status: "In Progress",
    measurableResult: "Iterative self-correction loop successfully debugs code runtime errors with an 88% autonomous resolution rate",
    githubUrl: "https://github.com/saif-rohyal",
    demoUrl: undefined,
    architectureSummary: "Stateful cyclic graph maintaining research state, hypothesis vectors, code execution traces, and compiler feedback loops.",
    features: [
      "Automated document synthesis and claim extraction",
      "Hypothesis formation with mathematical bounds checking",
      "Sandboxed Python execution environment with timeout safeguards",
      "Autonomous reflection and stack-trace debugging loop",
      "Markdown and PDF executive research report generation"
    ],
    systemFlow: [
      "Input research papers / technical specifications",
      "Information extraction & knowledge graph node insertion",
      "Hypothesis generation & verification planning",
      "Code synthesis & sandbox execution",
      "Output evaluation: If error, route to reflection loop; If pass, compile report"
    ]
  },
  {
    id: "ai-customer-support-copilot",
    title: "AI Customer Support Copilot",
    category: "Full Stack",
    shortDescription: "Full-stack support platform with live RAG copilot drafting responses, ticket memory, and CSAT telemetry.",
    fullDescription: "An end-to-end customer support platform built for enterprise help desks. Features a real-time AI copilot that synthesizes answers from verified internal documentation, tracks historical ticket threads to maintain long-term memory, detects escalation signals, and surfaces a live knowledge sidebar for human support representatives.",
    technologies: ["Next.js", "FastAPI", "LangChain", "Vector DB", "PostgreSQL [placeholder]", "Tailwind CSS"],
    status: "Live",
    measurableResult: "Drafted 90%+ accurate support responses and reduced ticket resolution time significantly",
    githubUrl: "https://github.com/saif-rohyal",
    demoUrl: undefined,
    architectureSummary: "Next.js frontend with WebSocket connection to FastAPI RAG backend, querying hybrid vector/keyword document indices and tracking conversation memory in PostgreSQL.",
    features: [
      "Live copilot suggestions with confidence attribution",
      "Retrieval-Augmented Generation (RAG) over company knowledge docs",
      "Sentiment analysis and automated escalation triggers",
      "Agent analytics dashboard showing ticket deflection and CSAT estimates",
      "Full conversation history and customer journey timeline"
    ],
    systemFlow: [
      "Customer submits support query via portal",
      "FastAPI backend embeds query and searches Vector Index",
      "Copilot generates grounded draft with source citations",
      "Human agent reviews, approves or edits with one keystroke",
      "Resolution logged to ticket database and analytics pipeline"
    ]
  },
  {
    id: "voice-booking-assistant",
    title: "Voice Booking Assistant",
    category: "Voice",
    shortDescription: "Conversational voice agent that handles inbound phone calls, checks calendar availability, and books appointments.",
    fullDescription: "A production-grade conversational voice agent that answers calls naturally. Features streaming speech-to-text, low-latency LLM reasoning with availability slot checking, real-time interruption handling (barge-in), and natural speech synthesis, connected to calendar scheduling APIs.",
    technologies: ["Voice AI", "WebSockets", "FastAPI", "Streaming STT", "Calendar API", "Python"],
    status: "In Progress",
    measurableResult: "Achieved sub-900ms round-trip voice interaction latency with dynamic speech barge-in support",
    githubUrl: "https://github.com/saif-rohyal",
    demoUrl: undefined,
    architectureSummary: "Bidirectional WebSocket pipeline streaming PCM audio chunks to an acoustic STT pipeline, piping transcribed tokens into a LangGraph intent router and streaming audio synthesis back to the caller.",
    features: [
      "Sub-second conversational turnaround latency",
      "Interruption and speech barge-in detection",
      "Automated calendar conflict resolution and appointment booking",
      "Confirmation SMS/Email notification trigger",
      "Call transcription and intent summary logging"
    ],
    systemFlow: [
      "Inbound voice stream over WebSocket",
      "Streaming Speech-to-Text token generation",
      "LangGraph intent parsing (Schedule / Reschedule / Cancel / FAQ)",
      "Calendar API query and slot reservation",
      "Text-to-Speech audio stream return to caller"
    ]
  }
];
