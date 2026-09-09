import type { Project } from "./types";

/**
 * Projects, full-stack product first. `featured` entries render as full case rows;
 * the rest appear in the compact ledger. `flow` drives the generated
 * schematic, so every project gets a visual without a screenshot.
 */
export const projects: Project[] = [
  {
    slug: "list-manager",
    title: "Full-Stack List Manager",
    tagline: "Internal data management system",
    domain: "Full-stack · Infrastructure",
    year: "2023",
    role: "Backend, frontend, deployment",
    featured: true,
    summary:
      "A production web application for managing and tracking structured data workflows, with secure file handling and fully automated server provisioning.",
    problem:
      "Structured data was tracked by hand across files with no integrity guarantees and no audit trail. It needed a real system: relational, secure and repeatably deployable.",
    built: [
      "Django backend with a relational schema designed around integrity constraints and optimized queries",
      "React front end for managing and tracking workflows",
      "Secure file upload, tracking and automated cleanup",
      "Docker images with server configuration automated through Ansible",
    ],
    impact:
      "One-command deployments and a single source of truth for the data the team relied on.",
    stack: ["Django", "React", "PostgreSQL", "Docker", "Ansible"],
    flow: [
      { label: "React", kind: "source" },
      { label: "Django API", kind: "process" },
      { label: "PostgreSQL", kind: "store" },
      { label: "Files", kind: "store" },
    ],
    links: [],
  },
  {
    slug: "sp-today-api",
    title: "SP Today API",
    tagline: "Real-time currency & gold price service",
    domain: "Backend · Scraping",
    year: "2023",
    role: "Design & engineering",
    featured: true,
    summary:
      "A backend service that continuously collects live currency and gold prices and serves them as a structured API, plus a Telegram bot on top of it.",
    problem:
      "Prices lived on pages that change shape without notice. The service had to keep collecting reliably and answer fast, even while sources misbehaved.",
    built: [
      "Resilient scraping pipeline with structured, validated responses",
      "FastAPI service tuned for fast, continuous delivery",
      "n8n automations for scheduling and notifications",
      "Telegram bot as a consumer of the same API",
    ],
    stack: ["Python", "FastAPI", "Web scraping", "n8n", "Telegram API"],
    flow: [
      { label: "Sources", kind: "source" },
      { label: "Scraper", kind: "process" },
      { label: "FastAPI", kind: "process" },
      { label: "Bot / API", kind: "output" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/sp-today-api" },
      { kind: "bot", label: "Telegram bot", href: "https://t.me/its_sptodayBOT" },
    ],
  },
  {
    slug: "ai-content-pipeline",
    title: "AI Content Automation Pipeline",
    tagline: "Social media publishing with zero manual steps",
    domain: "Automation · AI",
    year: "2024 —",
    role: "Design & engineering, end to end",
    featured: true,
    summary:
      "An end-to-end system that generates, formats and schedules text and video content, then publishes it across Telegram and social platforms without a human in the loop.",
    problem:
      "Publishing across several platforms meant repetitive manual work and inconsistent output. The goal was a pipeline that runs unattended, every day, and fails loudly rather than silently.",
    built: [
      "n8n workflows orchestrating generation, formatting and scheduled distribution",
      "AI-driven text and video generation stages with structured hand-offs between steps",
      "Multi-platform publishing through webhooks and platform APIs",
      "Python services for the steps a visual workflow shouldn't own",
    ],
    impact:
      "Removed the manual publishing workload entirely and made output consistent across platforms.",
    stack: ["n8n", "Python", "LLM APIs", "Webhooks", "Telegram API", "Docker"],
    flow: [
      { label: "Schedule", kind: "source" },
      { label: "n8n", kind: "process" },
      { label: "LLM", kind: "ai" },
      { label: "Format", kind: "process" },
      { label: "Publish", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "cv-mailer",
    title: "CV Mailer",
    tagline: "Automated job application system",
    domain: "Automation",
    year: "2023",
    role: "Design & engineering",
    featured: false,
    summary:
      "Sends personalised application emails with CV attachments at scale, with dynamic generation, scheduling and delivery tracking.",
    problem:
      "Applying widely meant rewriting the same email by hand dozens of times a week.",
    built: [
      "Dynamic email generation from templates and structured inputs",
      "Scheduling and delivery tracking",
    ],
    stack: ["Python", "SMTP", "Automation"],
    flow: [
      { label: "Targets", kind: "source" },
      { label: "Compose", kind: "process" },
      { label: "SMTP", kind: "output" },
    ],
    links: [{ kind: "live", label: "Live", href: "https://cv-mailer-nine.vercel.app/" }],
  },
  {
    slug: "fmee-results-bot",
    title: "FMEE Results Bot",
    tagline: "University exam results, in Telegram, in Arabic",
    domain: "Bot · Scraping",
    year: "2022",
    role: "Design & engineering",
    featured: false,
    summary:
      "A Telegram bot that retrieves and presents university exam results in real time — marks, averages and missing subjects — with specialization detection.",
    problem:
      "Results were buried in a clunky portal; students wanted them in the chat app they already used.",
    built: [
      "Robust scraping with specialization detection and structured output",
      "Arabic-first conversational interface",
    ],
    stack: ["Python", "Web scraping", "Telegram API"],
    flow: [
      { label: "Portal", kind: "source" },
      { label: "Scraper", kind: "process" },
      { label: "Telegram", kind: "output" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/du-fmee-results-bot" },
      { kind: "bot", label: "Telegram bot", href: "https://t.me/Hamak_Marks_BOT" },
    ],
  },
  {
    slug: "syria-location-database",
    title: "Syria Location Database",
    tagline: "Administrative divisions as clean, queryable data",
    domain: "Data · Open source",
    year: "2022",
    role: "Design & engineering",
    featured: false,
    summary:
      "Extracts Syria's governorates, cities, districts and towns from text files into MySQL and CSV, de-duplicated, bilingual and ready to query.",
    problem:
      "No clean, bilingual dataset of Syria's administrative divisions existed for developers.",
    built: [
      "Parsing pipeline with duplicate prevention",
      "Arabic–English translation layer and an SQL view for easy queries",
    ],
    stack: ["Python", "MySQL", "CSV"],
    flow: [
      { label: "Text files", kind: "source" },
      { label: "Parse", kind: "process" },
      { label: "MySQL", kind: "store" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/syria-location-database" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
