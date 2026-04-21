import { useState, useEffect } from "react";
import { FaGithub, FaFacebook, FaTelegram, FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Moon, Sun, Menu, X } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const Header = ({ activeSection, scrollToSection, theme, toggleTheme }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-formal-900/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div 
          className="text-2xl font-bold tracking-tight cursor-pointer text-formal-900 dark:text-formal-50 transition-colors"
          onClick={() => scrollToSection("about")}
        >
          MK
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`cursor-pointer text-sm font-medium tracking-wide transition-colors duration-200 uppercase ${
                activeSection === item.id 
                  ? "text-formal-900 dark:text-formal-50 border-b-2 border-formal-900 dark:border-formal-50" 
                  : "text-formal-500 dark:text-formal-400 hover:text-formal-900 dark:hover:text-formal-50 border-b-2 border-transparent"
              }`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Socials & Theme Toggle */}
        <div className="hidden md:flex space-x-4 text-formal-600 dark:text-formal-400 items-center">
          <a href="https://github.com/KaraBala10/" target="_blank" rel="noopener noreferrer" className="hover:text-formal-900 dark:hover:text-formal-50 transition-colors text-lg" aria-label="GitHub"><FaGithub /></a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mohammad.karabala@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-formal-900 dark:hover:text-formal-50 transition-colors text-lg" aria-label="Email"><FaEnvelope /></a>
          <a href="https://www.facebook.com/mohammad.karabala.5" target="_blank" rel="noopener noreferrer" className="hover:text-formal-900 dark:hover:text-formal-50 transition-colors text-lg" aria-label="Facebook"><FaFacebook /></a>
          <a href="https://t.me/KaraBala10" target="_blank" rel="noopener noreferrer" className="hover:text-formal-900 dark:hover:text-formal-50 transition-colors text-lg" aria-label="Telegram"><FaTelegram /></a>
          <a href="https://wa.me/963949257963" target="_blank" rel="noopener noreferrer" className="hover:text-formal-900 dark:hover:text-formal-50 transition-colors text-lg" aria-label="WhatsApp"><IoLogoWhatsapp /></a>
          
          <div className="w-px h-6 bg-formal-200 dark:bg-formal-700 mx-2"></div>
          
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-full hover:bg-formal-100 dark:hover:bg-formal-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 text-formal-600 dark:text-formal-400 rounded-full hover:bg-formal-100 dark:hover:bg-formal-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="cursor-pointer text-formal-900 dark:text-formal-50 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-formal-900 border-t border-formal-100 dark:border-formal-800 shadow-lg absolute w-full left-0 py-4 mt-4">
          <div className="flex flex-col space-y-4 px-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`text-left text-sm font-medium uppercase tracking-wide py-2 ${
                  activeSection === item.id ? "text-formal-900 dark:text-formal-50" : "text-formal-600 dark:text-formal-400"
                }`}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
            <div className="flex space-x-6 text-formal-600 dark:text-formal-400 pt-4 border-t border-formal-100 dark:border-formal-800 justify-center">
              <a href="https://github.com/KaraBala10/" target="_blank" rel="noopener noreferrer"><FaGithub className="text-xl hover:text-formal-900 dark:hover:text-formal-50 transition-colors" /></a>
              <a href="mailto:mohammad.karabala@gmail.com" aria-label="Email"><FaEnvelope className="text-xl hover:text-formal-900 dark:hover:text-formal-50 transition-colors" /></a>
              <a href="https://www.facebook.com/mohammad.karabala.5" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-xl hover:text-formal-900 dark:hover:text-formal-50 transition-colors" /></a>
              <a href="https://t.me/KaraBala10" target="_blank" rel="noopener noreferrer"><FaTelegram className="text-xl hover:text-formal-900 dark:hover:text-formal-50 transition-colors" /></a>
              <a href="https://wa.me/963949257963" target="_blank" rel="noopener noreferrer"><IoLogoWhatsapp className="text-xl hover:text-formal-900 dark:hover:text-formal-50 transition-colors" /></a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
