import {
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaFacebook,
  FaTelegram,
  FaRocket,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import AnimatedSection from "./AnimatedSection";

const Contact = () => {
  return (
    <AnimatedSection 
      id="contact" 
      className="py-16 lg:py-24 relative text-formal-900 dark:text-white transition-colors duration-500 flex flex-col justify-center min-h-[90vh]" 
      delay={0.1}
    >
      {/* Background Blurs behind the content */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[250px] bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-[250px] bg-emerald-400/30 dark:bg-emerald-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] max-w-2xl h-[200px] bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl text-center relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-white dark:bg-formal-800 px-4 py-1.5 rounded-full mb-6 border border-formal-200 dark:border-formal-700 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-formal-700 dark:text-formal-300">
              Ready for new challenges
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-formal-900 dark:text-white">
            Let's Build The Future
          </h2>

          <p className="text-lg md:text-xl text-formal-600 dark:text-formal-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Got a massive automation idea? Need a scalable backend system? Or maybe a complete web application?
            <span className="text-formal-900 dark:text-formal-100 font-bold block mt-2">
              I'm here to turn your vision into reality.
            </span>
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16 w-full">
          <a
            href="tel:+963949257963"
            className="group bg-white dark:bg-formal-900 p-8 rounded-3xl border border-formal-200 dark:border-formal-800 hover:border-formal-300 dark:hover:border-formal-600 transition-all duration-300 flex flex-col items-center shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-formal-50 dark:bg-formal-800 rounded-2xl flex items-center justify-center text-formal-900 dark:text-white text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white dark:group-hover:bg-blue-600 transition-all duration-300">
              <FaPhone />
            </div>
            <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-formal-500 dark:text-formal-400 mb-2">
              Call Me
            </span>
            <span className="text-xl md:text-2xl font-bold text-formal-900 dark:text-white transition-colors">
              (+963) 949257963
            </span>
          </a>

          <div className="group bg-white dark:bg-formal-900 p-8 rounded-3xl border border-formal-200 dark:border-formal-800 hover:border-formal-300 dark:hover:border-formal-600 transition-all duration-300 flex flex-col items-center shadow-sm hover:shadow-xl hover:-translate-y-1">
            <div className="w-14 h-14 bg-formal-50 dark:bg-formal-800 rounded-2xl flex items-center justify-center text-formal-900 dark:text-white text-xl mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:bg-emerald-600 transition-all duration-300">
              <FaMapMarkerAlt />
            </div>
            <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-formal-500 dark:text-formal-400 mb-2">
              Based In
            </span>
            <span className="text-xl md:text-2xl font-bold text-formal-900 dark:text-white transition-colors">
              Damascus, Syria
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-auto bg-white dark:bg-formal-900 border border-formal-200 dark:border-formal-800 rounded-3xl p-8 max-w-4xl mx-auto w-full shadow-sm hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-formal-600 dark:text-formal-300 mb-8 flex items-center justify-center gap-3">
            <FaRocket className="text-lg text-formal-400 dark:text-formal-500" /> Connect With Me
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/963949257963"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-formal-50 dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-xl hover:bg-[#25D366] dark:hover:bg-[#25D366] hover:border-[#25D366] dark:hover:border-[#25D366] hover:-translate-y-1 transition-all duration-300 text-formal-700 dark:text-formal-200 hover:text-white dark:hover:text-white group shadow-sm hover:shadow-md"
            >
              <IoLogoWhatsapp className="text-2xl text-[#25D366] group-hover:text-white transition-colors" />
              <span className="font-bold text-sm md:text-base">WhatsApp</span>
            </a>
            <a
              href="https://t.me/KaraBala10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-formal-50 dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-xl hover:bg-[#0088cc] dark:hover:bg-[#0088cc] hover:border-[#0088cc] dark:hover:border-[#0088cc] hover:-translate-y-1 transition-all duration-300 text-formal-700 dark:text-formal-200 hover:text-white dark:hover:text-white group shadow-sm hover:shadow-md"
            >
              <FaTelegram className="text-2xl text-[#0088cc] group-hover:text-white transition-colors" />
              <span className="font-bold text-sm md:text-base">Telegram</span>
            </a>
            <a
              href="https://github.com/KaraBala10/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-formal-50 dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-xl hover:bg-formal-900 dark:hover:bg-white hover:border-formal-900 dark:hover:border-white hover:-translate-y-1 transition-all duration-300 text-formal-700 dark:text-formal-200 hover:text-white dark:hover:text-formal-900 group shadow-sm hover:shadow-md"
            >
              <FaGithub className="text-2xl text-formal-900 dark:text-formal-200 group-hover:text-white dark:group-hover:text-formal-900 transition-colors" />
              <span className="font-bold text-sm md:text-base">GitHub</span>
            </a>
            <a
              href="https://www.facebook.com/mohammad.karabala.5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 bg-formal-50 dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-xl hover:bg-[#1877F2] dark:hover:bg-[#1877F2] hover:border-[#1877F2] dark:hover:border-[#1877F2] hover:-translate-y-1 transition-all duration-300 text-formal-700 dark:text-formal-200 hover:text-white dark:hover:text-white group shadow-sm hover:shadow-md"
            >
              <FaFacebook className="text-2xl text-[#1877F2] group-hover:text-white transition-colors" />
              <span className="font-bold text-sm md:text-base">Facebook</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-formal-200 dark:border-formal-800 flex flex-col md:flex-row justify-between items-center gap-4 relative z-20">
          <p className="text-xs md:text-sm font-medium text-formal-500 dark:text-formal-400">
            &copy; {new Date().getFullYear()} Mohammad KaraBala. Built with Passion.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-[10px] md:text-xs font-bold text-formal-500 dark:text-formal-400 uppercase tracking-widest">
              Available for Opportunities
            </p>
          </div>
        </footer>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
