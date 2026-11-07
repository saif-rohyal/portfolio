export interface AchievementItem {
  id: string;
  title: string;
  award: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
  description: string;
  badgeText: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "pak-angels-gen-ai",
    title: "Pak Angels Gen AI",
    award: "Promising Performer",
    issuer: "ASPIRE Pakistan",
    date: "October 2026",
    credentialId: "PAGAI-PP-0266",
    url: "https://aspirepk.org/hub/certificate/035beace-5b92-47a5-a726-19e2851ecb4f/",
    description: "Recognized as a 'Promising Performer' in the prestigious national Pak Angels Generative AI initiative for engineering novel autonomous multi-agent systems and real-world AI applications.",
    badgeText: "National Recognition"
  }
];
