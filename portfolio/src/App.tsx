import { useCallback, useEffect, useRef, useState } from "react";
import { Atmosphere } from "./chrome/Atmosphere";
import { CommandMenu } from "./chrome/CommandMenu";
import { Dock } from "./chrome/Dock";
import { Footer } from "./chrome/Footer";
import { Greeter } from "./chrome/Greeter";
import { Rail } from "./chrome/Rail";
import { TopBar } from "./chrome/TopBar";
import { useActiveSection } from "./lib/useActiveSection";
import { useHotkey } from "./lib/useHotkey";
import { useReveal } from "./lib/useReveal";
import { useTheme } from "./lib/useTheme";
import { Approach } from "./sections/Approach";
import { Capabilities } from "./sections/Capabilities";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Track } from "./sections/Track";
import { Work } from "./sections/Work";

export default function App() {
  const active = useActiveSection();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useReveal(rootRef);

  useHotkey(
    "mod+k",
    useCallback((e: KeyboardEvent) => {
      e.preventDefault();
      setMenuOpen((open) => !open);
    }, [])
  );

  // Tells the inline safety script in index.html that hydration succeeded.
  useEffect(() => {
    document.documentElement.dataset.hydrated = "1";
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div ref={rootRef}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Atmosphere activeSection={active} />
      <TopBar theme={theme} onToggleTheme={toggleTheme} onOpenMenu={openMenu} />
      <Rail active={active} />
      <main id="main" className="page">
        <Hero />
        <Work />
        <Capabilities />
        <Track />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <Dock active={active} />
      <Greeter />
      <CommandMenu open={menuOpen} onClose={closeMenu} onToggleTheme={toggleTheme} />
    </div>
  );
}
