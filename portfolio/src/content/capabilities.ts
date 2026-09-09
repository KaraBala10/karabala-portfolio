import type { Capability } from "./types";

/**
 * Four pillars of expertise. `level` drives the visual hierarchy:
 * core = deep, daily use · working = productive · exploring = actively learning
 */
export const capabilities: Capability[] = [
  {
    id: "automation",
    index: "01",
    title: "Automation & data extraction",
    lead: "Workflows that run unattended.",
    description:
      "From n8n orchestration to scraping pipelines that survive dynamic pages, anti-bot measures and virtual mobile environments. I build the parts that have to keep working at 3 a.m.",
    skills: [
      { name: "n8n", level: "core" },
      { name: "Web scraping", level: "core" },
      { name: "Playwright", level: "core" },
      { name: "Scrapy", level: "working" },
      { name: "Selenium", level: "working" },
      { name: "ADB / Redroid", level: "working" },
      { name: "Webhooks", level: "core" },
    ],
  },
  {
    id: "ai",
    index: "02",
    title: "AI & LLM systems",
    lead: "Models wired into real pipelines.",
    description:
      "Structured generation, multi-step chains and agentic workflows — with the retries, validation and observability that turn a demo into a service.",
    skills: [
      { name: "LLM APIs (Claude, GPT)", level: "core" },
      { name: "LangChain", level: "working" },
      { name: "LangGraph", level: "exploring" },
      { name: "Ollama", level: "exploring" },
      { name: "Prompt & output validation", level: "core" },
    ],
  },
  {
    id: "backend",
    index: "03",
    title: "Backend & full-stack",
    lead: "Python services, React on top.",
    description:
      "REST APIs, relational schemas and the front ends that use them. Multilingual (Arabic/English) products with third-party integrations.",
    skills: [
      { name: "Python", level: "core" },
      { name: "Django", level: "core" },
      { name: "FastAPI", level: "working" },
      { name: "Flask", level: "working" },
      { name: "React", level: "core" },
      { name: "TypeScript", level: "working" },
      { name: "Next.js", level: "working" },
      { name: "PostgreSQL", level: "core" },
      { name: "MySQL", level: "working" },
      { name: "MongoDB", level: "working" },
      { name: "REST APIs", level: "core" },
    ],
  },
  {
    id: "infra",
    index: "04",
    title: "DevOps & infrastructure",
    lead: "Repeatable deployments, monitored.",
    description:
      "Containerised services on Linux, provisioned with Ansible, shipped through CI, and kept healthy with automated monitoring and maintenance.",
    skills: [
      { name: "Docker", level: "core" },
      { name: "Linux servers", level: "core" },
      { name: "Ansible", level: "core" },
      { name: "CI/CD", level: "working" },
      { name: "Bash", level: "working" },
      { name: "Git", level: "core" },
      { name: "Monitoring", level: "working" },
    ],
  },
];
