import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { site } from "../data/site";
import SocialLinks from "./ui/SocialLinks";

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Header = ({
  activeSection,
  scrollToSection,
  theme,
  toggleTheme,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 lg:px-6 pt-3">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-formal-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-formal-50 dark:focus:text-formal-900"
      >
        Skip to main content
      </a>

      {/* Floating glass pill */}
      <div
        className={`mx-auto max-w-6xl flex items-center justify-between rounded-2xl px-4 lg:px-6 transition-all duration-300 ${
          scrolled ? "glass-bar py-2.5" : "border border-transparent py-3.5"
        }`}
      >
        <button
          type="button"
          className="font-display text-xl font-bold tracking-tight cursor-pointer text-formal-900 dark:text-formal-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-md"
          onClick={() => handleNavClick("about")}
          aria-label={`${site.name} — go to about`}
        >
          {site.shortName}
          <span className="text-accent">.</span>
        </button>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary"
        >
          {site.navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`cursor-pointer text-[13px] font-semibold tracking-wide uppercase px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 ${
                activeSection === item.id
                  ? "bg-formal-900 text-white dark:bg-formal-50 dark:text-formal-900 shadow-sm"
                  : "text-formal-500 dark:text-formal-400 hover:text-formal-900 dark:hover:text-formal-50 hover:bg-formal-100/70 dark:hover:bg-formal-800/70"
              }`}
              onClick={() => handleNavClick(item.id)}
              aria-current={activeSection === item.id ? "true" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 text-formal-600 dark:text-formal-400">
          <SocialLinks />
          <div className="w-px h-6 bg-formal-200 dark:bg-formal-700" />
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full hover:bg-formal-100 dark:hover:bg-formal-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="cursor-pointer p-2 text-formal-600 dark:text-formal-400 rounded-full hover:bg-formal-100 dark:hover:bg-formal-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            className="cursor-pointer text-formal-900 dark:text-formal-50 p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-nav"
          className="md:hidden glass-bar rounded-2xl mx-auto max-w-6xl mt-2 py-4"
        >
          <nav className="flex flex-col space-y-1 px-5" aria-label="Mobile">
            {site.navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`text-left text-sm font-semibold uppercase tracking-wide py-2.5 px-3 rounded-lg cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 ${
                  activeSection === item.id
                    ? "bg-formal-900 text-white dark:bg-formal-50 dark:text-formal-900"
                    : "text-formal-600 dark:text-formal-400 hover:bg-formal-100/70 dark:hover:bg-formal-800/70"
                }`}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
              >
                {item.label}
              </button>
            ))}
            <div className="flex justify-center pt-4 mt-2 border-t border-formal-100 dark:border-formal-800">
              <SocialLinks />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
