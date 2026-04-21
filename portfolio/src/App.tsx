import { useState, useEffect } from "react";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import BackgroundDecorations from "./components/BackgroundDecorations";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { navId: "about", elementId: "about" },
        { navId: "experience", elementId: "experience" },
        { navId: "education", elementId: "education" },
        { navId: "skills", elementId: "skills" },
        { navId: "projects", elementId: "projects" },
        { navId: "contact", elementId: "contact" },
      ];
      const scrollPosition = window.scrollY + 150;

      for (const { navId, elementId } of sections) {
        const element = document.getElementById(elementId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(navId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className={`min-h-screen font-sans relative bg-formal-50 text-formal-900 selection:bg-formal-900 selection:text-white dark:bg-formal-900 dark:text-formal-50 dark:selection:bg-formal-50 dark:selection:text-formal-900 transition-colors duration-500`}>
      <BackgroundDecorations />
      <Header activeSection={activeSection} scrollToSection={scrollToSection} theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-20 relative z-10">
        <About />
        <Experience />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
