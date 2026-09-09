import { profile, socials } from "../content/profile";
import { BUILD_DATE } from "../lib/buildInfo";
import { scrollToSection } from "../lib/scroll";
import { useLocalTime } from "../lib/useLocalTime";
import { useNow } from "../lib/useNow";
import { Icon } from "../ui/Icon";
import styles from "./Footer.module.css";

/** Colophon: who, when, how it was built, and a way back up. */
export function Footer() {
  const time = useLocalTime(profile.timezone);
  const year = useNow().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <p className={styles.name}>{profile.name}</p>
          <p className={`mono ${styles.meta}`}>
            {profile.location} · <span suppressHydrationWarning>{time || "--:--"}</span> {profile.utcOffsetLabel}
          </p>
        </div>

        <div className={styles.col}>
          <p className={styles.colophon}>
            Designed and built by hand. React 18, TypeScript, Vite, CSS custom properties and a
            hand-written WebGL lattice — no UI framework, no animation library, no 3D engine.
          </p>
          <p className={`mono ${styles.meta}`}>
            Last deployed {BUILD_DATE} · © {year}
          </p>
        </div>

        <div className={styles.col}>
          <ul className={styles.socials} aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                  aria-label={s.label}
                >
                  <Icon name={s.id} size={16} />
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.top}
            onClick={() => scrollToSection("top")}
          >
            <span className="mono">Back to top</span>
            <Icon name="arrow-up" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
