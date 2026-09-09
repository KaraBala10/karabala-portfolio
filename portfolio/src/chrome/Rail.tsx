import { useEffect, useRef } from "react";
import { sections } from "../content/sections";
import { scrollToSection } from "../lib/scroll";
import styles from "./Rail.module.css";

interface RailProps {
  active: string;
}

/**
 * Desktop wayfinding: a vertical rail of section indices with a reading-
 * progress line. The active label is always visible; others reveal on
 * hover/focus so the rail stays quiet while you read.
 */
export function Rail({ active }: RailProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.setProperty("--progress", p.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav ref={ref} className={styles.rail} aria-label="Sections">
      <div className={styles.track} aria-hidden>
        <span className={styles.progress} />
      </div>
      <ol className={styles.list}>
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={styles.item}
                aria-current={isActive ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(s.id);
                }}
              >
                <span className={`mono ${styles.index}`}>{s.index}</span>
                <span className={styles.label}>{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
