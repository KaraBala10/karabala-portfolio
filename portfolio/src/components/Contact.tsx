import { Phone, MapPin, Rocket } from "lucide-react";
import { site } from "../data/site";
import Section from "./ui/Section";
import SocialLinks from "./ui/SocialLinks";
import TiltCard from "./ui/TiltCard";

const Contact = () => {
  return (
    <Section
      id="contact"
      delay={0.1}
      maxWidth="max-w-5xl"
      containerClassName="text-center"
      className="min-h-[80vh] flex flex-col justify-center"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] max-w-2xl h-56 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[50%] max-w-xl h-40 bg-sky-200/30 dark:bg-sky-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center gap-2 glass-card px-4 py-1.5 rounded-full mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-formal-700 dark:text-formal-300">
              Ready for new challenges
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-formal-900 dark:text-formal-50">
            Let's Build The Future
          </h2>
          <div className="mt-4 mb-6 w-16 h-1 bg-gradient-to-r from-emerald-500 to-sky-500 mx-auto rounded-full" />

          <p className="text-lg text-formal-600 dark:text-formal-400 leading-relaxed max-w-2xl mx-auto">
            Got a massive automation idea? Need a scalable backend system? Or
            maybe a complete web application?
            <span className="text-formal-900 dark:text-formal-100 font-semibold block mt-2">
              I'm here to turn your vision into reality.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 w-full">
          <TiltCard className="rounded-2xl">
          <a
            href={site.contact.phoneHref}
            className="group h-full glass-card p-8 rounded-2xl transition-colors flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
          >
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-4 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-400 dark:group-hover:text-formal-900 transition-colors">
              <Phone size={22} aria-hidden />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold text-formal-500 dark:text-formal-400 mb-2">
              Call Me
            </span>
            <span className="text-xl md:text-2xl font-bold text-formal-900 dark:text-formal-50">
              {site.contact.phone}
            </span>
          </a>
          </TiltCard>

          <TiltCard className="group glass-card p-8 rounded-2xl flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-4 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-400 dark:group-hover:text-formal-900 transition-colors">
              <MapPin size={22} aria-hidden />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold text-formal-500 dark:text-formal-400 mb-2">
              Based In
            </span>
            <span className="text-base md:text-lg font-bold text-formal-900 dark:text-formal-50">
              {site.contact.location}
            </span>
          </TiltCard>
        </div>

        <div className="glass-card rounded-2xl p-8 max-w-4xl mx-auto w-full">
          <h3 className="text-sm font-bold uppercase tracking-widest text-formal-600 dark:text-formal-300 mb-8 flex items-center justify-center gap-3">
            <Rocket
              size={18}
              className="text-formal-400 dark:text-formal-500"
              aria-hidden
            />
            Connect With Me
          </h3>
          <SocialLinks variant="button" />
        </div>

        <footer className="mt-16 pt-6 border-t border-formal-200 dark:border-formal-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-formal-500 dark:text-formal-400">
            &copy; {new Date().getFullYear()} {site.name}. Built with Passion.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
            <p className="text-xs font-bold text-formal-500 dark:text-formal-400 uppercase tracking-widest">
              Available for Opportunities
            </p>
          </div>
        </footer>
      </div>
    </Section>
  );
};

export default Contact;
