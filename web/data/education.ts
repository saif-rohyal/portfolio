export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  highlights: string[];
}

export const EDUCATION: EducationItem[] = [
  {
    id: "ghazi-bs-it",
    degree: "BS Information Technology",
    institution: "Ghazi University",
    location: "Dera Ghazi Khan, Punjab, Pakistan",
    period: "September 2024 – September 2028 (Ongoing)",
    status: "In Progress",
    highlights: [
      "Rigorous grounding in Data Structures, Algorithms, Software Engineering, and Computer Networks",
      "Applied research in Agentic AI architectures, automated reasoning, and distributed systems",
      "Active focus on practical multi-agent engineering alongside undergraduate coursework"
    ]
  }
];
