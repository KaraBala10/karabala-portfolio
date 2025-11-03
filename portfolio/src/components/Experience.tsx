import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Experience.css";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Full Stack Developer",
    company: "Annecto Company",
    location: "London, United Kingdom",
    period: "Recent",
    description: [
      "Developed full-stack web applications using React, Django, and Docker as part of a collaborative team.",
      "Managed source control and project versions with Git, while effectively organizing tasks and meeting project deadlines.",
      "Enhanced skills in documentation and team communication using Microsoft Teams.",
    ],
  },
  {
    title: "Python & DevOps Developer",
    company: "BeinMedia",
    location: "Kuwait",
    period: "Previous",
    description: [
      "Designed and implemented scalable scraping pipelines that harvest data from virtual mobile environments (emulators/simulators), ensuring reliable collection under varying network and UI conditions.",
      "Built and maintained backend services and servers on Ubuntu, including deployment automation, monitoring and incident troubleshooting.",
      "Wrote clean, well-tested Python code (modular, documented, with CI) to enable maintainable long-term operations.",
      "Automated operational workflows (deployment, backups, log rotation, health checks) using scripts and tooling to reduce manual intervention and deployment errors.",
      "Implemented monitoring and alerting to detect regressions and performance issues early; participated in on-call rotations and incident response.",
    ],
  },
  {
    title: "Freelance Full Stack Developer",
    company: "Middle East Clients",
    location: "Middle East",
    period: "01/10/2022 - Current",
    description: [
      "Expert in building scalable full-stack applications using Django (backend), React (frontend), and Docker (containerization).",
      "Specialized in multi-language support (Arabic/English), integrations, and deployment on cloud platforms.",
      "Proven experience in delivering custom solutions for e-commerce, FinTech, and enterprise applications, tailored to meet Middle Eastern client needs.",
      "Strong focus on performance, security, and user experience, with flexibility in project execution and clear communication.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <h2 className="section-title">Work Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <h3 className="experience-title">{exp.title}</h3>
              <h4 className="experience-company">{exp.company}</h4>
            </div>
            <div className="experience-meta">
              <span className="experience-period">
                <FaCalendarAlt /> {exp.period}
              </span>
              <span className="experience-location">
                <FaMapMarkerAlt /> {exp.location}
              </span>
            </div>
            <ul className="experience-description">
              {exp.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
