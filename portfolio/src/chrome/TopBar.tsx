import { profile } from "../content/profile";
import { scrollToSection } from "../lib/scroll";
import type { Theme } from "../lib/useTheme";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Kbd } from "../ui/Kbd";
import { Monogram } from "./Monogram";
import styles from "./TopBar.module.css";

interface TopBarProps {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenMenu: () => void;
}

/**
 * Minimal fixed header: the mark, the command menu trigger, the theme switch
 * and one call to action. No nav links here — the rail and dock own wayfinding.
 */
export function TopBar({ theme, onToggleTheme, onOpenMenu }: TopBarProps) {
  return (
    <header className={styles.bar}>
      <a
        href="#top"
        className={styles.mark}
        aria-label={`${profile.name} — back to top`}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("top");
        }}
      >
        <Monogram />
        <span className={styles.wordmark}>{profile.lastName}</span>
      </a>

      <div className={styles.cluster}>
        <button type="button" className={styles.cmd} onClick={onOpenMenu} aria-haspopup="dialog">
          <Icon name="search" size={15} />
          <span className={styles.cmdLabel}>Menu</span>
          <span className={styles.kbd} aria-hidden>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "light"}
        >
          <span className={styles.themeIcons} data-theme-state={theme}>
            <Icon name="sun" size={17} className={styles.sun} />
            <Icon name="moon" size={17} className={styles.moon} />
          </span>
        </button>

        <Button
          href="#contact"
          variant="secondary"
          className={styles.cta}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("contact");
          }}
        >
          Say hello
        </Button>
      </div>
    </header>
  );
}
