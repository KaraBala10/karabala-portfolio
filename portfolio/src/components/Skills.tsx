import "./Skills.css";

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "XML"],
  },
  {
    name: "Frameworks & Libraries",
    skills: ["React", "Django", "Node.js"],
  },
  {
    name: "Tools & Technologies",
    skills: [
      "Git",
      "Docker",
      "Linux & Linux Servers",
      "Windows & Windows Server",
      "RESTful API",
      "ADB Commands",
      "Object-Oriented Programming",
    ],
  },
  {
    name: "Databases",
    skills: ["MySQL", "MongoDB", "PostgreSQL"],
  },
  {
    name: "DevOps & Infrastructure",
    skills: ["Server Management", "CI/CD", "Ansible", "Monitoring"],
  },
  {
    name: "AI & ML",
    skills: ["LLMs", "LangChain", "RAG", "Ollama"],
  },
  {
    name: "Office & Communication",
    skills: ["Microsoft Office", "Google Workspace", "Microsoft Teams"],
  },
];

const languages = [
  { name: "Arabic", level: "Mother tongue" },
  { name: "English", level: "C1 - Advanced" },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="section-title">Skills</h2>

      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3 className="skill-category-name">{category.name}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="languages-section">
        <h3 className="languages-title">Language Skills</h3>
        <div className="languages-grid">
          {languages.map((lang, index) => (
            <div key={index} className="language-item">
              <span className="language-name">{lang.name}</span>
              <span className="language-level">{lang.level}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
