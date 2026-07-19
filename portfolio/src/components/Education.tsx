import { Calendar, MapPin, GraduationCap } from "lucide-react";
import { education } from "../data/education";
import Section from "./ui/Section";

const Education = () => {
  return (
    <Section
      id="education"
      title="Education & Training"
      delay={0.1}
      maxWidth="max-w-5xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {education.map((edu) => (
          <article
            key={`${edu.institution}-${edu.degree}`}
            className="bg-white dark:bg-formal-800 rounded-2xl p-8 lg:p-10 border border-formal-200 dark:border-formal-700 shadow-sm transition-colors hover:border-formal-300 dark:hover:border-formal-500"
          >
            <div className="w-14 h-14 bg-formal-100 dark:bg-formal-700 rounded-xl flex items-center justify-center text-formal-900 dark:text-formal-100 mb-6">
              <GraduationCap size={28} aria-hidden />
            </div>
            <h3 className="text-2xl font-bold text-formal-900 dark:text-formal-50 leading-snug mb-2">
              {edu.degree}
            </h3>
            <h4 className="text-lg font-semibold text-formal-600 dark:text-formal-400 mb-6">
              {edu.institution}
            </h4>

            <div className="space-y-4 pt-4 border-t border-formal-100 dark:border-formal-700">
              <div className="flex items-center text-sm font-medium text-formal-500 dark:text-formal-400">
                <Calendar
                  size={16}
                  className="mr-3 text-formal-400 dark:text-formal-500"
                  aria-hidden
                />
                <span className="uppercase tracking-wider">{edu.period}</span>
              </div>
              <div className="flex items-center text-sm font-medium text-formal-500 dark:text-formal-400">
                <MapPin
                  size={16}
                  className="mr-3 text-formal-400 dark:text-formal-500"
                  aria-hidden
                />
                <span className="uppercase tracking-wider">{edu.location}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Education;
