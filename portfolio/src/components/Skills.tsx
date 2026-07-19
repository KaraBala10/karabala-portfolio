import { skillCategories } from "../data/skills";
import Chip from "./ui/Chip";
import Section from "./ui/Section";

const Skills = () => {
  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      delay={0.1}
      maxWidth="max-w-6xl"
      elevated
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <article
            key={category.name}
            className="p-8 rounded-2xl bg-formal-50 dark:bg-formal-800/80 border border-formal-100 dark:border-formal-700 hover:border-formal-300 dark:hover:border-formal-500 transition-colors shadow-sm"
          >
            <h3 className="text-lg font-bold text-formal-900 dark:text-formal-100 mb-6 uppercase tracking-wide">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <Chip key={skill} elevated>
                  {skill}
                </Chip>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
