export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  isFreelance?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    title: "AI & Automation Engineer",
    company: "BeinMedia",
    location: "Kuwait",
    period: "01/2024 - Present",
    description: [
      "Built and maintained scalable scraping pipelines from virtual mobile environments under dynamic conditions.",
      "Developed and deployed backend services on Linux servers with Docker and CI workflows.",
      "Designed automation systems using n8n for AI-driven content generation and social media publishing.",
      "Automated deployments, monitoring, and system maintenance, reducing manual workload and errors.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Cellusys Company",
    location: "London, United Kingdom",
    period: "12/2022 - Present",
    isFreelance: true,
    description: [
      "Delivered full-stack web applications using Django, React, and Docker for international clients.",
      "Built scalable backend systems, APIs, and automation tools tailored to business needs.",
      "Collaborated directly with clients to gather requirements and deliver production-ready solutions.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Middle East Clients",
    location: "Middle East",
    period: "09/2022 - Present",
    isFreelance: true,
    description: [
      "Delivered custom web and automation solutions for clients across e-commerce, FinTech, and internal platforms.",
      "Built multilingual systems (Arabic/English) with third-party integrations and cloud deployment.",
      "Focused on performance, reliability, and scalable architecture.",
    ],
  },
];
