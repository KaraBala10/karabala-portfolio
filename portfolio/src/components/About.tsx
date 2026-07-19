import { Mail, Phone, MapPin, Briefcase, Download, ArrowRight } from "lucide-react";
import developerImage from "../assets/karabala.jpeg";
import { site } from "../data/site";
import AnimatedSection from "./AnimatedSection";

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

const About = ({ scrollToSection }: AboutProps) => {
  return (
    <AnimatedSection
      id="about"
      className="relative min-h-dvh w-full overflow-visible pt-20 pb-12 flex flex-col"
    >
      <div className="container mx-auto w-full px-6 lg:px-12 relative z-[2] flex-1 flex items-center">
        <div className="w-full flex flex-col lg:flex-row lg:items-center items-center gap-8 lg:gap-14 xl:gap-16">
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left space-y-5 lg:space-y-6 w-full min-w-0">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-formal-500 dark:text-formal-400 mb-1 block">
                {site.eyebrow}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight leading-tight">
                {site.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {site.roles.map((role, index) => (
                <span key={role} className="contents">
                  {index > 0 ? (
                    <span className="text-formal-300 dark:text-formal-600 hidden sm:inline-block">
                      •
                    </span>
                  ) : null}
                  <span className="px-3.5 py-1.5 rounded-full bg-formal-100/90 dark:bg-formal-800/90 text-formal-800 dark:text-formal-100 text-sm font-medium tracking-wide border border-formal-200 dark:border-formal-700">
                    {role}
                  </span>
                </span>
              ))}
            </div>

            <p className="text-base md:text-lg text-formal-600 dark:text-formal-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {site.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto lg:mx-0">
              {metaItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 p-3 rounded-xl border border-formal-200 dark:border-formal-700 bg-white/70 dark:bg-formal-800/70 backdrop-blur-sm transition-colors hover:border-formal-300 dark:hover:border-formal-600"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-formal-100 dark:bg-formal-700 text-formal-700 dark:text-formal-200">
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
                  </div>
                );
              })}
            </div>

            <div className="relative z-[2] flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
              <a
                href={site.cvPath}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-formal-900 dark:bg-formal-50 hover:bg-formal-800 dark:hover:bg-formal-200 text-white dark:text-formal-900 rounded-lg font-medium transition-colors shadow-md shadow-formal-900/10 dark:shadow-formal-50/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
              >
                <Download size={18} aria-hidden />
                <span>Download CV</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-formal-900 hover:bg-formal-50 dark:hover:bg-formal-800 text-formal-900 dark:text-formal-50 border border-formal-200 dark:border-formal-700 rounded-lg font-medium transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
              >
                <span>Get In Touch</span>
                <ArrowRight size={18} aria-hidden />
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 order-1 lg:order-2 w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[300px] xl:max-w-[340px] mx-auto relative isolate">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-formal-200/40 to-formal-100/40 dark:from-formal-700/25 dark:to-formal-800/25 rounded-full blur-3xl -z-10 transition-colors duration-500"
              aria-hidden
            />
            <div className="relative z-[1] p-2 rounded-2xl bg-white dark:bg-formal-800 shadow-xl shadow-formal-900/5 dark:shadow-black/20 ring-1 ring-formal-900/5 dark:ring-formal-50/5 aspect-[4/5] overflow-hidden">
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
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
