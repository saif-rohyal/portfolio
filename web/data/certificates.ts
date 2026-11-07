export interface CertificateItem {
  id: string;
  group: "AI and Agents" | "Programming, CS and English";
  title: string;
  issuer: string;
  issuerBadge?: string;
  date: string;
  credentialId: string;
  url: string; // If empty string, "Show credential" button is hidden
  skillsCovered: string[];
}

export const CERTIFICATES: CertificateItem[] = [
  // AI and Agents Group
  {
    id: "cert-google-prompting",
    group: "AI and Agents",
    title: "Google Prompting Essentials Specialization",
    issuer: "Google (via Coursera)",
    issuerBadge: "Specialization",
    date: "October 2026",
    credentialId: "DFTENC93E8V5",
    url: "https://www.coursera.org/account/accomplishments/specialization/DFTENC93E8V5",
    skillsCovered: ["Prompt Engineering", "Multi-modal Prompting", "Workflow Optimization", "Evaluation Frameworks"]
  },
  {
    id: "cert-google-ai-essentials",
    group: "AI and Agents",
    title: "Google AI Essentials",
    issuer: "Google (via Coursera)",
    issuerBadge: "Professional Certificate",
    date: "August 2026",
    credentialId: "8N0ATH5OHM58",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/8N0ATH5OHM58",
    skillsCovered: ["Applied Generative AI", "Responsible AI", "Productivity Automation", "AI Safety"]
  },
  {
    id: "cert-agentic-ai",
    group: "AI and Agents",
    title: "Understanding Agentic AI",
    issuer: "Digital Workforce Services Plc",
    issuerBadge: "Course Certificate",
    date: "August 2026",
    credentialId: "67432c58827e1409ba0ccf8a",
    url: "https://mycourse.app/OGDJaxUj77NShijZ3",
    skillsCovered: ["Autonomous Agents", "Goal Decomposition", "Tool Execution", "Agent Governance"]
  },

  // Programming, CS and English Group
  {
    id: "cert-london-cs-spec",
    group: "Programming, CS and English",
    title: "Introduction to Computer Science and Programming Specialization",
    issuer: "University of London / Goldsmiths (via Coursera)",
    issuerBadge: "Specialization",
    date: "May 3, 2025",
    credentialId: "8SKK5B0FBH9P",
    url: "https://www.coursera.org/account/accomplishments/specialization/8SKK5B0FBH9P",
    skillsCovered: ["Algorithms", "Computational Thinking", "Discrete Mathematics", "Problem Solving"]
  },
  {
    id: "cert-london-prog",
    group: "Programming, CS and English",
    title: "Introduction to Computer Programming",
    issuer: "University of London / Goldsmiths (via Coursera)",
    issuerBadge: "Course Certificate",
    date: "May 2025",
    credentialId: "UAFACJ271VIN",
    url: "https://www.coursera.org/account/accomplishments/records/UAFACJ271VIN",
    skillsCovered: ["Software Fundamentals", "Control Structures", "Object-Oriented Design", "Debugging"]
  },
  {
    id: "cert-london-hardware",
    group: "Programming, CS and English",
    title: "How Computers Work",
    issuer: "University of London / Goldsmiths (via Coursera)",
    issuerBadge: "Course Certificate",
    date: "May 2025",
    credentialId: "2YNF84K30MJP",
    url: "https://www.coursera.org/account/accomplishments/records/2YNF84K30MJP",
    skillsCovered: ["Computer Architecture", "Logic Gates", "Memory Hierarchy", "Machine Systems"]
  },
  {
    id: "cert-naples-english",
    group: "Programming, CS and English",
    title: "English Intermediate B1 Specialization",
    issuer: "Federica Web Learning Center, University of Naples Federico II (via Coursera)",
    issuerBadge: "Specialization",
    date: "January 20, 2025",
    credentialId: "[placeholder: PENDING-ID]",
    url: "", // Hidden button as URL is placeholder
    skillsCovered: ["Professional Technical Communication", "B1 Proficiency", "Technical Documentation"]
  },
  {
    id: "cert-asu-python",
    group: "Programming, CS and English",
    title: "Introduction to Python",
    issuer: "Arizona State University (via Coursera)",
    issuerBadge: "Course Certificate",
    date: "January 7, 2025",
    credentialId: "JUZENZLXQCSI",
    url: "https://www.coursera.org/account/accomplishments/records/JUZENZLXQCSI",
    skillsCovered: ["Python Data Structures", "File I/O", "Functional Paradigms", "Scripting Automation"]
  }
];
