import { Calendar, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "../data/experience";
import Section from "./ui/Section";
import TiltCard from "./ui/TiltCard";

const Experience = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="experience"
      title="Work Experience"
      eyebrow="Career Path"
      delay={0.1}
    >
      <div className="relative">
        <div
          className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/70 via-formal-300 to-transparent dark:via-formal-600 md:left-1/2 md:-translate-x-px"
          aria-hidden
        />

        <ol className="space-y-10">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <li key={`${exp.company}-${exp.period}`} className="relative">
                <motion.span
                  className="absolute left-4 top-3 z-10 flex h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-emerald-500 bg-white dark:bg-formal-900 shadow-[0_0_8px_rgba(16,185,129,0.5)] md:left-1/2"
                  initial={prefersReducedMotion ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  aria-hidden
                />

                <motion.div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                  }`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, x: isLeft ? -40 : 40 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <TiltCard
                    as="article"
                    maxTilt={4}
                    className="rounded-2xl glass-card p-6 lg:p-8"
                  >
                    <div className="flex flex-col gap-3 mb-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl lg:text-2xl font-bold text-formal-900 dark:text-formal-50">
                          {exp.title}
                        </h3>
                        {exp.isFreelance ? (
                          <span className="shrink-0 px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold bg-emerald-600 text-white dark:bg-emerald-500/20 dark:text-emerald-300 dark:border dark:border-emerald-500/30 rounded-md">
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
                          <span className="mr-3 mt-2 block w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
};

export default Experience;
