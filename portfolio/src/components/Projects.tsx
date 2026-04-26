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
    title: "AI Content Automation Pipeline",
    description: "Social Media Automation System",
    features: [
      "Designed and implemented end-to-end automation workflows for generating and publishing content across multiple social media platforms",
      "Built AI-driven pipelines for automated content (text/video) creation, formatting, and scheduled distribution",
      "Integrated multi-platform publishing (Telegram, social media) with zero manual intervention",
      "Significantly reduced manual workload and improved publishing consistency"
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
      "Deployed using Docker with automated server configuration (Ansible)"
    ],
    technologies: ["Django", "React", "Docker", "PostgreSQL"],
  },
  {
    title: "CV Mailer",
    description: "Automated Job Application System",
    features: [
      "Built an automation tool to send personalized job application emails with CV attachments at scale",
      "Implemented dynamic email generation, scheduling, and delivery tracking",
      "Reduced repetitive manual work and improved outreach efficiency"
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
      "Optimized performance for fast and continuous data delivery"
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
      "Delivered real-time results (marks, averages, missing subjects) in Arabic"
    ],
    technologies: ["Python", "Web Scraping", "Telegram API"],
    githubUrl: "https://github.com/KaraBala10/du-fmee-results-bot",
    liveUrl: "https://t.me/Hamak_Marks_BOT",
  },
  {
    title: "syria-location-database",
    description: "Syria Administrative Data Processing that extracts and stores data from text files into MySQL and CSV.",
    features: [
      "Prevents duplicates during data extraction",
      "Supports Arabic-English translation",
      "Includes an SQL view for easy queries"
    ],
    technologies: ["Python", "MySQL", "CSV"],
    githubUrl: "https://github.com/KaraBala10/syria-location-database",
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
