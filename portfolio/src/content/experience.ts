import type { EducationEntry, ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    id: "beinmedia",
    role: "AI & Automation Engineer",
    org: "BeinMedia",
    location: "Kuwait · remote",
    start: "2024-01",
    end: null,
    engagement: "full-time",
    highlights: [
      "Built and maintain scalable scraping pipelines running from virtual mobile environments under constantly changing conditions.",
      "Develop and deploy backend services on Linux servers with Docker and CI workflows.",
      "Designed n8n automation systems for AI-driven content generation and social media publishing.",
      "Automated deployments, monitoring and maintenance — fewer manual steps, fewer errors.",
    ],
  },
  {
    id: "cellusys",
    role: "Software Engineer",
    org: "Cellusys",
    location: "London, UK · remote",
    start: "2022-12",
    end: null,
    engagement: "freelance",
    highlights: [
      "Delivered full-stack web applications with Django, React and Docker for international clients.",
      "Built scalable backend systems, APIs and automation tools tailored to business needs.",
      "Worked directly with clients from requirements through production delivery.",
    ],
  },
  {
    id: "freelance-me",
    role: "Software Engineer",
    org: "Independent clients",
    location: "Middle East · remote",
    start: "2022-09",
    end: null,
    engagement: "freelance",
    highlights: [
      "Custom web and automation solutions for e-commerce, FinTech and internal platforms.",
      "Multilingual (Arabic/English) systems with third-party integrations and cloud deployment.",
      "Performance, reliability and scalable architecture as the default, not the upgrade.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: "damascus-university",
    degree: "B.Sc. Computer & Automation Engineering",
    institution: "Damascus University",
    location: "Damascus, Syria",
    start: "2019-09",
    end: "2025-09",
    href: "http://damascusuniversity.edu.sy/fmee/",
  },
  {
    id: "enmaa",
    degree: "Web Development programme",
    institution: "Enmaa Charity Association",
    location: "Rif Dimashq, Syria",
    start: "2022-05",
    end: "2023-04",
  },
];
