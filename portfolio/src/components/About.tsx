import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Download,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import developerImage from "../assets/karabala.jpeg";
import { site } from "../data/site";
import AnimatedSection from "./AnimatedSection";
import TiltCard from "./ui/TiltCard";
import { StaggerContainer, RevealItem } from "./ui/Reveal";

interface AboutProps {
  scrollToSection: (sectionId: string) => void;
}

const metaItems = [
  {
    icon: Mail,
    label: "Email",
    value: site.contact.email,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.contact.phone,
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.contact.location,
  },
  {
    icon: Briefcase,
    label: "Availability",
    value: site.availability,
  },
];

/** Cycles through the roles with a slide/fade swap; width stays stable. */
const RotatingRoles = () => {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % site.roles.length),
      2600
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-base md:text-lg font-semibold tracking-wide text-formal-800 dark:text-formal-100">
      <span className="w-2 h-2 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden />
      {/* All roles share one grid cell so the chip keeps the widest width. */}
      <span className="inline-grid text-left">
        {site.roles.map((role, i) => (
          <motion.span
            key={role}
            className="col-start-1 row-start-1"
            initial={false}
            animate={
              prefersReducedMotion
                ? { opacity: i === 0 ? 1 : 0 }
                : { opacity: i === index ? 1 : 0, y: i === index ? 0 : 10 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-hidden={i !== index}
          >
            {role}
          </motion.span>
        ))}
      </span>
    </span>
  );
};

const About = ({ scrollToSection }: AboutProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatedSection
      id="about"
      className="relative min-h-dvh w-full overflow-visible pt-20 pb-12 flex flex-col"
    >
      <div className="container mx-auto w-full px-6 lg:px-12 relative z-[2] flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row lg:items-center items-center gap-8 lg:gap-14 xl:gap-16">
          <StaggerContainer className="flex-1 order-2 lg:order-1 text-center lg:text-left space-y-5 lg:space-y-6 w-full min-w-0">
            <RevealItem>
              <span className="inline-flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-accent mb-3">
                <span className="w-8 h-px bg-accent/60" aria-hidden />
                {site.eyebrow}
              </span>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold text-gradient tracking-tight leading-tight pb-1">
                {site.name}
              </h1>
            </RevealItem>

            <RevealItem className="flex flex-wrap items-center justify-center lg:justify-start">
              <RotatingRoles />
            </RevealItem>

            <RevealItem>
              <p className="text-base md:text-lg text-formal-600 dark:text-formal-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {site.bio}
              </p>
            </RevealItem>

            <RevealItem className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0">
              {metaItems.map((item) => {
                const Icon = item.icon;
                return (
                  <TiltCard
                    key={item.label}
                    maxTilt={5}
                    className="flex items-center gap-3 p-3 rounded-xl glass-card"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Icon size={16} aria-hidden />
                    </span>
                    <div className="text-left min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-formal-500 dark:text-formal-400 font-semibold">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium text-formal-900 dark:text-formal-100 truncate">
                        {item.value}
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </RevealItem>

            <RevealItem className="relative z-[2] flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
              <a
                href={site.cvPath}
                download
                className="group inline-flex items-center gap-2 px-6 py-3 bg-formal-900 dark:bg-formal-50 hover:bg-formal-800 dark:hover:bg-white text-white dark:text-formal-900 rounded-xl font-semibold transition-all duration-300 shadow-md shadow-formal-900/10 hover:shadow-lg hover:shadow-emerald-600/20 dark:hover:shadow-emerald-400/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
              >
                <Download
                  size={18}
                  className="transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
                <span>Download CV</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center gap-2 px-6 py-3 glass-card text-formal-900 dark:text-formal-50 rounded-xl font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
              >
                <span>Get In Touch</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </RevealItem>
          </StaggerContainer>

          <motion.div
            className="flex-shrink-0 order-1 lg:order-2 w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[300px] xl:max-w-[340px] mx-auto relative isolate"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, scale: 0.92, filter: "blur(10px)" }
            }
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-300/30 via-sky-200/25 to-formal-100/30 dark:from-emerald-500/15 dark:via-sky-500/10 dark:to-indigo-500/15 rounded-full blur-3xl -z-10 transition-colors duration-500"
              aria-hidden
            />
            <TiltCard
              maxTilt={9}
              className="z-[1] p-2 rounded-2xl bg-white dark:bg-formal-800 shadow-xl shadow-formal-900/5 dark:shadow-black/20 ring-1 ring-formal-900/5 dark:ring-formal-50/5 aspect-[4/5] overflow-hidden"
            >
              <img
                src={developerImage}
                alt={site.name}
                className="w-full h-full object-cover rounded-xl object-center"
              />
              <div className="absolute top-5 right-5 inline-flex items-center gap-2 bg-white/90 dark:bg-formal-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <span className="w-2 h-2 bg-accent rounded-full motion-safe:animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-formal-900 dark:text-formal-100">
                  Available for work
                </span>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-[2] flex justify-center pb-2 mt-6">
        <motion.button
          type="button"
          onClick={() => scrollToSection("experience")}
          aria-label="Scroll to experience"
          className="flex flex-col items-center gap-1.5 text-formal-400 dark:text-formal-500 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-md p-1"
          animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
            Scroll
          </span>
          <ChevronDown size={18} aria-hidden />
        </motion.button>
      </div>
    </AnimatedSection>
  );
};

export default About;
