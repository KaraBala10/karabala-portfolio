export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Automation & Scraping",
    skills: [
      "n8n",
      "Web Scraping",
      "Scrapy",
      "Playwright",
      "Selenium",
      "ADB",
      "Redroid",
    ],
  },
  {
    name: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Bash", "SQL"],
  },
  {
    name: "Frameworks & Libraries",
    skills: ["Django", "Flask", "React"],
  },
  {
    name: "AI & LLM",
    skills: ["LangChain", "LangGraph", "Claude", "GPT", "Gemma", "Ollama"],
  },
  {
    name: "DevOps & Infrastructure",
    skills: ["Docker", "Linux", "Ansible", "CI/CD", "Server Management"],
  },
  {
    name: "Databases & Tools",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Git", "RESTful API"],
  },
];
