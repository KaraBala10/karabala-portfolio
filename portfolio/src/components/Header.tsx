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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-formal-900/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-formal-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-formal-50 dark:focus:text-formal-900"
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <button
          type="button"
          className="text-2xl font-bold tracking-tight cursor-pointer text-formal-900 dark:text-formal-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-sm"
          onClick={() => handleNavClick("about")}
          aria-label={`${site.name} — go to about`}
        >
          {site.shortName}
        </button>

        <nav
          className="hidden md:flex space-x-8 items-center"
          aria-label="Primary"
        >
          {site.navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`cursor-pointer text-sm font-medium tracking-wide transition-colors duration-200 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-sm ${
                activeSection === item.id
                  ? "text-formal-900 dark:text-formal-50 border-b-2 border-formal-900 dark:border-formal-50"
                  : "text-formal-500 dark:text-formal-400 hover:text-formal-900 dark:hover:text-formal-50 border-b-2 border-transparent"
              }`}
              onClick={() => handleNavClick(item.id)}
              aria-current={activeSection === item.id ? "true" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex space-x-4 text-formal-600 dark:text-formal-400 items-center">
          <SocialLinks />
          <div className="w-px h-6 bg-formal-200 dark:bg-formal-700 mx-2" />
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

        <div className="flex items-center space-x-4 md:hidden">
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
            className="cursor-pointer text-formal-900 dark:text-formal-50 p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
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
          className="md:hidden bg-white dark:bg-formal-900 border-t border-formal-100 dark:border-formal-800 shadow-lg absolute w-full left-0 py-4 mt-4"
        >
          <nav className="flex flex-col space-y-2 px-6" aria-label="Mobile">
            {site.navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`text-left text-sm font-medium uppercase tracking-wide py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-sm ${
                  activeSection === item.id
                    ? "text-formal-900 dark:text-formal-50"
                    : "text-formal-600 dark:text-formal-400"
                }`}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
              >
                {item.label}
              </button>
            ))}
            <div className="flex justify-center pt-4 border-t border-formal-100 dark:border-formal-800">
              <SocialLinks />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
