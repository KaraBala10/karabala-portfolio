export interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "AI Content Automation Pipeline",
    description: "Social Media Automation System",
    features: [
      "Designed and implemented end-to-end automation workflows for generating and publishing content across multiple social media platforms",
      "Built AI-driven pipelines for automated content (text/video) creation, formatting, and scheduled distribution",
      "Integrated multi-platform publishing (Telegram, social media) with zero manual intervention",
      "Significantly reduced manual workload and improved publishing consistency",
    ],
    technologies: ["n8n", "Python", "AI APIs", "Webhooks"],
  },
  {
    title: "Full-Stack List Manager",
    description: "Internal Data Management System",
    features: [
      "Developed a full-stack web application to manage and track structured data workflows",
      "Designed relational database architecture with optimized queries and data integrity constraints",
      "Implemented secure file handling, tracking, and automated cleanup processes",
      "Deployed using Docker with automated server configuration (Ansible)",
    ],
    technologies: ["Django", "React", "Docker", "PostgreSQL"],
  },
  {
    title: "CV Mailer",
    description: "Automated Job Application System",
    features: [
      "Built an automation tool to send personalized job application emails with CV attachments at scale",
      "Implemented dynamic email generation, scheduling, and delivery tracking",
      "Reduced repetitive manual work and improved outreach efficiency",
    ],
    technologies: ["Python", "SMTP", "Automation"],
    liveUrl: "https://cv-mailer-nine.vercel.app/",
  },
  {
    title: "SP Today API",
    description: "Real-Time Data Scraping Service",
    features: [
      "Built a backend service to collect and serve real-time currency and gold prices",
      "Designed reliable scraping pipelines with structured API responses",
      "Optimized performance for fast and continuous data delivery",
    ],
    technologies: ["Python", "FastAPI", "Web Scraping", "n8n"],
    githubUrl: "https://github.com/KaraBala10/sp-today-api",
    liveUrl: "https://t.me/its_sptodayBOT",
  },
  {
    title: "FMEE Results Bot",
    description: "Telegram Automation Bot for university exam results",
    features: [
      "Developed a Telegram bot that automates retrieval and display of university exam results",
      "Built robust scraping logic with specialization detection and structured output",
      "Delivered real-time results (marks, averages, missing subjects) in Arabic",
    ],
    technologies: ["Python", "Web Scraping", "Telegram API"],
    githubUrl: "https://github.com/KaraBala10/du-fmee-results-bot",
    liveUrl: "https://t.me/Hamak_Marks_BOT",
  },
  {
    title: "syria-location-database",
    description:
      "Syria Administrative Data Processing that extracts and stores data from text files into MySQL and CSV.",
    features: [
      "Prevents duplicates during data extraction",
      "Supports Arabic-English translation",
      "Includes an SQL view for easy queries",
    ],
    technologies: ["Python", "MySQL", "CSV"],
    githubUrl: "https://github.com/KaraBala10/syria-location-database",
  },
];
