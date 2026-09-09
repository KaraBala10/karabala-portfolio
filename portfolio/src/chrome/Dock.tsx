import { navSections } from "../content/sections";
import { scrollToSection } from "../lib/scroll";
import styles from "./Dock.module.css";

interface DockProps {
  active: string;
}

/** Mobile/tablet wayfinding: a thumb-reachable pill fixed to the bottom edge. */
export function Dock({ active }: DockProps) {
  return (
    <nav className={styles.dock} aria-label="Sections">
      <ul className={styles.list}>
        {navSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={styles.item}
              aria-current={s.id === active ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(s.id);
              }}
            >
              {s.short ?? s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
