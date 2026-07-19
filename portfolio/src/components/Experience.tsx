import { Calendar, MapPin } from "lucide-react";
import { experiences } from "../data/experience";
import Section from "./ui/Section";

const Experience = () => {
  return (
    <Section id="experience" title="Work Experience" delay={0.1} elevated>
      <div className="relative">
        <div
          className="absolute left-4 top-2 bottom-2 w-px bg-formal-200 dark:bg-formal-700 md:left-1/2 md:-translate-x-px"
          aria-hidden
        />

        <ol className="space-y-10">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li key={`${exp.company}-${exp.period}`} className="relative">
                <span
                  className="absolute left-4 top-3 z-10 flex h-3 w-3 -translate-x-1/2 rounded-full border-2 border-formal-900 bg-white dark:border-formal-100 dark:bg-formal-900 md:left-1/2"
                  aria-hidden
                />

                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                  }`}
                >
                  <article className="rounded-2xl border border-formal-200 dark:border-formal-700 bg-white dark:bg-formal-800/80 p-6 lg:p-8 transition-colors hover:border-formal-300 dark:hover:border-formal-500">
                    <div className="flex flex-col gap-3 mb-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl lg:text-2xl font-bold text-formal-900 dark:text-formal-50">
                          {exp.title}
                        </h3>
                        {exp.isFreelance ? (
                          <span className="shrink-0 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold bg-formal-900 text-formal-50 dark:bg-formal-100 dark:text-formal-900 rounded-md">
                            Freelance
                          </span>
                        ) : null}
                      </div>
                      <h4 className="text-base font-medium text-formal-600 dark:text-formal-400">
                        {exp.company}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-xs font-medium text-formal-500 dark:text-formal-400 uppercase tracking-wide">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={14} aria-hidden />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} aria-hidden />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.description.map((item) => (
                        <li
                          key={item}
                          className="flex items-start text-formal-700 dark:text-formal-300 leading-relaxed text-[15px]"
                        >
                          <span className="mr-3 mt-2 block w-1.5 h-1.5 bg-formal-900 dark:bg-formal-100 rounded-full shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
};

export default Experience;
