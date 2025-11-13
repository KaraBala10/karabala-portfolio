import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Projects.css";

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
    title: "Employee Evaluation System",
    description:
      "Developed a comprehensive employee evaluation system where employees can rate and evaluate each other on various performance metrics.",
    features: [
      "Employee Accounts for submitting and viewing evaluations",
      "Admin Account with full control over the system",
      "MongoDB for efficient data storage",
      "Monthly evaluation withdrawal system",
    ],
    technologies: ["Django", "React", "MongoDB"],
    liveUrl: "http://emp.petrogistix.com:4000/collections",
    status: "STOPPED NOW",
  },
  {
    title: "List Manager Platform",
    description:
      "A comprehensive List Manager web application utilizing Django, React, and MySQL to optimize data management workflows.",
    features: [
      "File Operations: Upload, download, and manage files with automated cleanup",
      "Clean Database Design with proper foreign keys",
      "Django ORM for streamlined data handling",
      "Docker deployment with Ansible automation",
      "TOML-based admin configuration",
    ],
    technologies: ["Django", "React", "MySQL", "Docker", "Ansible"],
    period: "04/04/2024 - Current",
  },
  {
    title: "Operation & Maintenance UI",
    description:
      "Team Workflow Automation Platform for automating team workflows with file management and database operations.",
    features: [
      "File Management: Upload, download, and track files with automated cleanup",
      "Database Operations: Add, delete, and update records",
      "Clean Code: Well-structured, maintainable code",
      "Docker deployment with Ansible server management",
      "TOML configuration files for admin settings",
    ],
    technologies: ["Django", "React", "MySQL", "Docker", "Ansible"],
  },
  {
    title: "Speech-to-Text AI Project",
    description:
      "An AI-based speech-to-text application using Python, focused on converting audio recordings into accurate text transcriptions.",
    features: [
      "Advanced audio preprocessing for noise reduction",
      "State-of-the-art speech recognition models",
      "Docker containerization for scalability",
      "Server deployment with consistent performance",
    ],
    technologies: ["Python", "Docker", "AI/ML"],
    githubUrl: "https://github.com/KaraBala10/speech-correction-api",
  },
  {
    title: "RAG AI Chatbot",
    description:
      "A Retrieval-Augmented Generation (RAG) AI chatbot using LangChain and Ollama models with Arabic language support.",
    features: [
      "Arabic Data Integration with custom dataset",
      "Chroma Database for vector storage and retrieval",
      "RAG Architecture combining retrieval with generation",
      "Docker deployment for scalability",
    ],
    technologies: ["Python", "LangChain", "Ollama", "Chroma", "Docker"],
  },
  {
    title: "DU FMEE Results Bot",
    description:
      '"alamaty" is a Telegram bot for FMEE results at Damascus University. It scrapes the official site, detects specialization, and displays marks.',
    features: [
      "Web scraping from official site",
      "Specialization detection",
      "Marks and averages display",
      "Missing subjects tracking",
      "Arabic language interface",
    ],
    technologies: ["Python", "Telegram Bot API"],
    githubUrl: "https://github.com/KaraBala10/du-fmee-results-bot",
  },
  {
    title: "Free MTN Syria Streamer",
    description:
      "Unofficial MTN Syria streaming client - Watch TV channels and movies for free without consuming mobile data.",
    features: [
      "Free streaming service",
      "No mobile data consumption",
      "TV channels and movies",
    ],
    technologies: ["Python", "Streaming"],
    githubUrl: "https://github.com/KaraBala10/free-mtn-syria-streamer",
  },
  {
    title: "Syria Location Database",
    description:
      "A Python project that extracts and stores Syria administrative divisions (Governorates, Cities, Districts, and Towns) from text files.",
    features: [
      "Data extraction from text files",
      "MySQL and CSV storage",
      "Duplicate prevention",
      "Arabic-English translation support",
      "SQL views for easy queries",
    ],
    technologies: ["Python", "MySQL"],
    githubUrl: "https://github.com/KaraBala10/syria-location-database",
  },
  {
    title: "CV-Finder",
    description:
      "A platform where job seekers upload resumes, and companies search for candidates based on experience.",
    features: [
      "Resume upload and storage",
      "Experience-based candidate search",
      "Resume filtering system",
      "Email reminders for updates",
      "Free-to-use model",
    ],
    technologies: ["Full Stack", "Django", "React"],
    githubUrl: "https://github.com/KaraBala10/cv-finder",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Programming Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              {project.status && (
                <span className="project-status">{project.status}</span>
              )}
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-features">
              <h4 className="project-features-title">Key Features:</h4>
              <ul className="project-features-list">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="project-technologies">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="project-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="project-links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaGithub /> <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaExternalLinkAlt /> <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
