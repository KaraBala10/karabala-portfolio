import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  isFreelance?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    title: "AI & Automation Engineer",
    company: "BeinMedia",
    location: "Kuwait",
    period: "01/2024 - Present",
    description: [
      "Built and maintained scalable scraping pipelines from virtual mobile environments under dynamic conditions.",
      "Developed and deployed backend services on Linux servers with Docker and CI workflows.",
      "Designed automation systems using n8n for AI-driven content generation and social media publishing.",
      "Automated deployments, monitoring, and system maintenance, reducing manual workload and errors.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Cellusys Company",
    location: "London, United Kingdom",
    period: "12/2022 - Present",
    isFreelance: true,
    description: [
      "Delivered full-stack web applications using Django, React, and Docker for international clients.",
      "Built scalable backend systems, APIs, and automation tools tailored to business needs.",
      "Collaborated directly with clients to gather requirements and deliver production-ready solutions.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Middle East Clients",
    location: "Middle East",
    period: "09/2022 - Present",
    isFreelance: true,
    description: [
      "Delivered custom web and automation solutions for clients across e-commerce, FinTech, and internal platforms.",
      "Built multilingual systems (Arabic/English) with third-party integrations and cloud deployment.",
      "Focused on performance, reliability, and scalable architecture.",
    ],
  },
];

const Experience = () => {
  return (
    <AnimatedSection
      id="experience"
      className="py-20 lg:py-32 relative transition-colors duration-500"
      delay={0.1}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight">
            Work Experience
          </h2>
          <div className="mt-4 w-16 h-1 bg-formal-900 dark:bg-formal-500 mx-auto rounded-full relative z-10"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative z-10 group bg-white/80 dark:bg-formal-800/80 backdrop-blur-xl border border-formal-200 dark:border-formal-700 rounded-2xl p-8 lg:p-10 hover:shadow-2xl hover:shadow-formal-900/10 dark:hover:shadow-black/40 hover:border-formal-400 dark:hover:border-formal-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-formal-900 dark:text-formal-50">
                      {exp.title}
                    </h3>
                    {exp.isFreelance && (
                      <span className="shrink-0 px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-formal-900 text-formal-50 dark:bg-formal-100 dark:text-formal-900 rounded-md shadow-sm">
                        Freelance
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-medium text-formal-600 dark:text-formal-400 mt-2">
                    {exp.company}
                  </h4>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-6 lg:gap-2 text-sm font-medium text-formal-500 dark:text-formal-400 uppercase tracking-wide">
                  <span className="flex items-center gap-2 bg-formal-50 dark:bg-formal-900 px-3 py-1.5 rounded-lg border border-formal-100 dark:border-formal-800">
                    <FaCalendarAlt className="text-formal-500 dark:text-formal-400" />{" "}
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-2 bg-formal-50 dark:bg-formal-900 px-3 py-1.5 rounded-lg border border-formal-100 dark:border-formal-800">
                    <FaMapMarkerAlt className="text-formal-500 dark:text-formal-400" />{" "}
                    {exp.location}
                  </span>
                </div>
              </div>
              <ul className="space-y-4">
                {exp.description.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-formal-700 dark:text-formal-300 leading-relaxed text-[15px]"
                  >
                    <span className="mr-4 mt-2 block w-1.5 h-1.5 bg-formal-900 dark:bg-formal-100 rounded-full shrink-0 shadow-sm"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
