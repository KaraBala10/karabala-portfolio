import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

interface Project {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  period?: string;
}

const projects: Project[] = [
  {
    title: "Social Media Intelligence",
    description: "LangGraph pipeline that discovers & analyzes profiles across 8+ platforms using Bright Data MCP.",
    features: [
      "AI-driven profile analysis and data extraction",
      "Multi-platform scraping via Bright Data",
      "Integration with LangGraph for reasoning pipelines",
    ],
    technologies: ["Python", "LangGraph", "Bright Data MCP"],
  },
  {
    title: "n8n Automation Suite",
    description: "Self-hosted multi-step pipelines for data collection, transformation, API integration, and notifications.",
    features: [
      "Production workflows for scraping & lead gen",
      "Custom nodes and webhook triggers",
      "Monitoring and automated alerts",
    ],
    technologies: ["n8n", "JavaScript", "Webhooks"],
  },
  {
    title: "Redroid + ADB Farm",
    description: "Dockerized Android emulation farm for mobile automation at scale with Python integration.",
    features: [
      "Headless Android containers on cloud servers",
      "Parallel instance execution and task scheduling",
      "Controlled via ADB for app interaction",
    ],
    technologies: ["Docker", "Android", "ADB", "Python"],
  },
  {
    title: "Syria Location Database",
    description: "A Python project extracting Syria's administrative divisions from text into MySQL and CSV.",
    features: [
      "Duplicate prevention and data cleaning",
      "Arabic-English translation support",
      "SQL view for complex data queries",
    ],
    technologies: ["Python", "MySQL"],
    githubUrl: "https://github.com/KaraBala10/syria-location-database",
  },
  {
    title: "RAG AI Chat (Gemma2)",
    description: "Arabic-supported AI chat application with retrieval-augmented generation.",
    features: [
      "Custom dataset integration for contextual answers",
      "Vector database implementation for retrieval",
      "Dockerized container for scalable deployment",
    ],
    technologies: ["Python", "LangChain", "Gemma", "Docker"],
  },
  {
    title: "Speech Correction API",
    description: "Django REST API designed to improve pronunciation in children by detecting and correcting mistakes.",
    features: [
      "Audio preprocessing and noise reduction",
      "Speech recognition and analysis models",
      "Fast API response for real-time usage",
    ],
    technologies: ["Python", "Django REST", "AI/ML"],
    githubUrl: "https://github.com/KaraBala10/speech-correction-api",
  },
  {
    title: "List Manager Platform",
    description: "A full-stack List Manager web application to optimize internal data management workflows.",
    features: [
      "Secure file upload and automated cleanup",
      "Clean relational database with foreign keys",
      "Docker deployment and Ansible server management",
    ],
    technologies: ["Django", "React", "MySQL", "Ansible"],
    period: "04/2024 - Current",
  },
  {
    title: "DU FMEE Results Bot",
    description: "\"alamaty\" is a Telegram bot for FMEE results at Damascus University to view marks and averages.",
    features: [
      "Web scraping from official university site",
      "Specialization detection",
      "Missing subjects tracking in Arabic",
    ],
    technologies: ["Python", "Telegram Bot API"],
    githubUrl: "https://github.com/KaraBala10/du-fmee-results-bot",
  },
  {
    title: "Video Text Generator API",
    description: "A RESTful API built with Flask that allows you to add text overlays to videos and replace audio tracks.",
    features: [
      "Dynamic text sizing and overlay positioning",
      "Audio track replacement and looping",
      "High-quality MP4 output generation",
    ],
    technologies: ["Python", "Flask", "FFmpeg"],
    githubUrl: "https://github.com/KaraBala10/video-text-generator-api",
  },
];

const Projects = () => {
  return (
    <AnimatedSection id="projects" className="py-20 lg:py-32 transition-colors duration-500" delay={0.2}>
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight">Programming Projects</h2>
          <div className="mt-4 w-16 h-1 bg-formal-900 dark:bg-formal-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col bg-white dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-2xl p-8 hover:shadow-xl hover:shadow-formal-900/5 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
              <div className="mb-6 flex justify-between items-start gap-4">
                <h3 className="text-xl font-bold text-formal-900 dark:text-formal-50 leading-snug">{project.title}</h3>
                {project.status && (
                  <span className="shrink-0 px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-md border border-red-200 dark:border-red-800/50">
                    {project.status}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-formal-600 dark:text-formal-300 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-formal-900 dark:text-formal-100 mb-3 border-b border-formal-100 dark:border-formal-700 pb-2">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-formal-600 dark:text-formal-400 leading-relaxed">
                      <span className="mr-2 mt-1.5 block w-1 h-1 bg-formal-400 dark:bg-formal-500 rounded-full shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8 pt-4 border-t border-formal-100 dark:border-formal-700">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-formal-50 dark:bg-formal-900 text-formal-700 dark:text-formal-300 border border-formal-200 dark:border-formal-600 text-xs font-medium rounded-md cursor-default transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-formal-900 dark:text-formal-100 hover:text-formal-600 dark:hover:text-formal-400 transition-colors"
                  >
                    <FaGithub className="text-lg" /> <span>GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-formal-900 dark:text-formal-100 hover:text-formal-600 dark:hover:text-formal-400 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-lg" /> <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Projects;
