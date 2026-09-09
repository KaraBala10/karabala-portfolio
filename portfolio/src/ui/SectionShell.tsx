import type { CSSProperties, ReactNode } from "react";
import { sections } from "../content/sections";
import styles from "./SectionShell.module.css";

interface SectionShellProps {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Standard section frame: index + label rule, display title, optional intro.
 * Every section shares this so spacing, hierarchy and reveals stay consistent
 * while the body composition stays free.
 */
export function SectionShell({ id, title, eyebrow, intro, children, className }: SectionShellProps) {
  const meta = sections.find((s) => s.id === id);

  return (
    <section
      id={id}
      className={[styles.section, className].filter(Boolean).join(" ")}
      aria-labelledby={`${id}-title`}
    >
      <div className="container">
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={`mono ${styles.index}`} aria-hidden>
              {meta?.index ?? "—"}
            </span>
            <span className={`mono ${styles.label}`}>{eyebrow ?? meta?.label ?? ""}</span>
            <span className={styles.rule} data-reveal="line" aria-hidden />
          </div>
          <h2 id={`${id}-title`} className={`display ${styles.title}`} data-reveal>
            {title}
          </h2>
          {intro && (
            <p className={`prose ${styles.intro}`} data-reveal style={{ "--i": 1 } as CSSProperties}>
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
