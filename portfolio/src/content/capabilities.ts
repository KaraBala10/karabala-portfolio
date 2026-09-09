import type { Capability } from "./types";

/**
 * Four pillars of expertise, full-stack first. `level` drives the visual
 * hierarchy: core = deep, daily use · working = productive · exploring = learning
 */
export const capabilities: Capability[] = [
  {
    id: "backend",
    index: "01",
    title: "Backend & APIs",
    lead: "Python services that scale and stay up.",
    description:
      "REST APIs, relational schemas designed around integrity, background jobs and integrations with third-party systems. Django when the product needs batteries, FastAPI when it needs speed.",
    skills: [
      { name: "Python", level: "core" },
      { name: "Django", level: "core" },
      { name: "FastAPI", level: "working" },
      { name: "Flask", level: "working" },
      { name: "REST API design", level: "core" },
      { name: "PostgreSQL", level: "core" },
      { name: "MySQL", level: "working" },
      { name: "MongoDB", level: "working" },
      { name: "SQL", level: "core" },
    ],
  },
  {
    id: "frontend",
    index: "02",
    title: "Frontend & product",
    lead: "Interfaces people actually use.",
    description:
      "Component-driven React applications with TypeScript, responsive and accessible by default, including bilingual Arabic/English products with right-to-left layouts.",
    skills: [
      { name: "React", level: "core" },
      { name: "TypeScript", level: "working" },
      { name: "JavaScript", level: "core" },
      { name: "Next.js", level: "working" },
      { name: "HTML & CSS", level: "core" },
      { name: "Responsive & RTL UI", level: "core" },
      { name: "Accessibility", level: "working" },
    ],
  },
  {
    id: "infra",
    index: "03",
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
  {
    id: "automation",
    index: "04",
    title: "Automation & AI integration",
    lead: "Workflows and models wired into real products.",
    description:
      "n8n orchestration, resilient scraping pipelines and LLM stages with the retries, validation and observability that turn a demo into a service.",
    skills: [
      { name: "n8n", level: "core" },
      { name: "Web scraping", level: "core" },
      { name: "Playwright", level: "core" },
      { name: "Scrapy", level: "working" },
      { name: "LLM APIs (Claude, GPT)", level: "core" },
      { name: "LangChain", level: "working" },
      { name: "LangGraph", level: "exploring" },
      { name: "Ollama", level: "exploring" },
    ],
  },
];
