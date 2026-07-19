import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/projects";
import Chip from "./ui/Chip";
import Section from "./ui/Section";

const Projects = () => {
  return (
    <Section
      id="projects"
      title="Programming Projects"
      delay={0.1}
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col bg-white dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-formal-900/5 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-formal-900 dark:text-formal-50 leading-snug mb-4">
              {project.title}
            </h3>

            <p className="text-sm text-formal-600 dark:text-formal-300 leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-formal-900 dark:text-formal-100 mb-3 border-b border-formal-100 dark:border-formal-700 pb-2">
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start text-xs text-formal-600 dark:text-formal-400 leading-relaxed"
                  >
                    <span className="mr-2 mt-1.5 block w-1 h-1 bg-formal-400 dark:bg-formal-500 rounded-full shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 pt-4 border-t border-formal-100 dark:border-formal-700">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Chip key={tech} size="sm">
                    {tech}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-formal-900 dark:text-formal-100 hover:text-formal-600 dark:hover:text-formal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-sm"
                >
                  <FaGithub className="text-lg" aria-hidden />
                  <span>GitHub</span>
                </a>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-formal-900 dark:text-formal-100 hover:text-formal-600 dark:hover:text-formal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-sm"
                >
                  <FaExternalLinkAlt className="text-lg" aria-hidden />
                  <span>Live Demo</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
