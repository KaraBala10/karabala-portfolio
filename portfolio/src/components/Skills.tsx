import AnimatedSection from "./AnimatedSection";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Automation & Scraping",
    skills: ["n8n", "Web Scraping", "Scrapy", "Playwright", "Selenium", "ADB", "Redroid"],
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

const Skills = () => {
  return (
    <AnimatedSection id="skills" className="py-20 lg:py-32 transition-colors duration-500" delay={0.1}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight">Skills & Expertise</h2>
          <div className="mt-4 w-16 h-1 bg-formal-900 dark:bg-formal-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="p-8 rounded-2xl bg-formal-50 dark:bg-formal-800 border border-formal-100 dark:border-formal-700 hover:border-formal-300 dark:hover:border-formal-500 transition-colors shadow-sm">
              <h3 className="text-lg font-bold text-formal-900 dark:text-formal-100 mb-6 uppercase tracking-wide">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-3 py-1.5 bg-white dark:bg-formal-900 border border-formal-200 dark:border-formal-600 text-formal-700 dark:text-formal-300 text-sm font-medium rounded-lg hover:border-formal-400 dark:hover:border-formal-400 hover:text-formal-900 dark:hover:text-formal-50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </AnimatedSection>
  );
};

export default Skills;
