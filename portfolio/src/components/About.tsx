import developerImage from "../assets/karabala.jpeg";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  return (
    <AnimatedSection id="about" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Content Section */}
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left space-y-8">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-formal-500 dark:text-formal-400 mb-2 block">
                Hello, I'm
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight leading-tight">
                Mohammad KaraBala
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="px-4 py-1.5 rounded-full bg-formal-100 dark:bg-formal-800 text-formal-800 dark:text-formal-100 text-sm font-medium tracking-wide border border-formal-200 dark:border-formal-700">
                Automation Engineer
              </span>
              <span className="text-formal-300 dark:text-formal-600 hidden sm:inline-block">•</span>
              <span className="px-4 py-1.5 rounded-full bg-formal-100 dark:bg-formal-800 text-formal-800 dark:text-formal-100 text-sm font-medium tracking-wide border border-formal-200 dark:border-formal-700">
                Software Developer
              </span>
            </div>

            <p className="text-lg text-formal-600 dark:text-formal-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Automation Engineer & Full-Stack Developer specializing in Python backend systems, n8n automation, and scalable web applications. Passionate about building self-hosted multi-step pipelines, data collection workflows, and Android emulation infrastructure. Focused on clean architecture, AI integration, and robust deployments using Docker and Linux.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0 pt-4">
              {[
                { icon: "📅", label: "Date of Birth", value: "16/10/2001" },
                { icon: "🌍", label: "Nationality", value: "Syrian" },
                { icon: "📍", label: "Location", value: "Damascus, Syria" },
                { icon: "📱", label: "Phone", value: "(+963) 949257963" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 p-4 rounded-xl border border-formal-200 dark:border-formal-700 bg-white/50 dark:bg-formal-800/50 backdrop-blur-sm transition-colors hover:border-formal-300 dark:hover:border-formal-600">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left">
                    <div className="text-xs uppercase tracking-wider text-formal-500 dark:text-formal-400 font-semibold">{item.label}</div>
                    <div className="text-sm font-medium text-formal-900 dark:text-formal-100">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
              <a href="/Mohammad_KaraBala.pdf" download className="inline-flex items-center space-x-2 px-6 py-3 bg-formal-900 dark:bg-formal-50 hover:bg-formal-800 dark:hover:bg-formal-200 text-white dark:text-formal-900 rounded-lg font-medium transition-colors shadow-md shadow-formal-900/10 dark:shadow-formal-50/5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13V3M10 13L6 9M10 13L14 9M3 17H17" />
                </svg>
                <span>Download CV</span>
              </a>
              <a href="#contact" className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-formal-900 hover:bg-formal-50 dark:hover:bg-formal-800 text-formal-900 dark:text-formal-50 border border-formal-200 dark:border-formal-700 rounded-lg font-medium transition-colors shadow-sm">
                <span>Get In Touch</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.5 15L12.5 10L7.5 5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 order-1 lg:order-2 w-full max-w-md lg:max-w-none mx-auto relative">
            <div className="relative z-10 p-2 rounded-2xl bg-white dark:bg-formal-800 shadow-xl shadow-formal-900/5 dark:shadow-black/20 ring-1 ring-formal-900/5 dark:ring-formal-50/5 aspect-[4/5] sm:aspect-auto overflow-hidden">
              <img 
                src={developerImage} 
                alt="Mohammad KaraBala" 
                className="w-full h-full object-cover rounded-xl object-center"
              />
              <div className="absolute top-6 right-6 inline-flex items-center space-x-2 bg-white/90 dark:bg-formal-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-formal-900 dark:text-formal-100">Available for work</span>
              </div>
            </div>
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-formal-200/50 to-formal-100/50 dark:from-formal-700/30 dark:to-formal-800/30 rounded-full blur-3xl -z-10 transition-colors duration-500"></div>
          </div>

        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
