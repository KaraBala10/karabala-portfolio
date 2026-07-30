import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ui/ScrollProgress";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { useActiveSection } from "./hooks/useActiveSection";

// Heavy WebGL/Three.js payload — split out so it never blocks first paint.
const ThreeBackground = lazy(() => import("./components/ThreeBackground"));

/**
 * Mount the aurora only once the browser is idle: the 100+ kB Three.js
 * chunk and WebGL context creation otherwise compete with hydration and
 * first interaction. Also stays false during prerender, so the static
 * HTML never references the canvas.
 */
function useMountWhenIdle() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return ready;
}

function App() {
  const activeSection = useActiveSection("about");
  const { theme, toggleTheme } = useTheme();
  const backgroundReady = useMountWhenIdle();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen font-sans relative bg-formal-50 text-formal-900 selection:bg-formal-900 selection:text-white dark:bg-formal-900 dark:text-formal-50 dark:selection:bg-formal-50 dark:selection:text-formal-900 transition-colors duration-500">
      {backgroundReady && (
        <Suspense fallback={null}>
          <ThreeBackground theme={theme} />
        </Suspense>
      )}
      <ScrollProgress />
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main id="main" className="relative z-[2]">
        <About scrollToSection={scrollToSection} />
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
