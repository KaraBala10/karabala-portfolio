import { useEffect, useState } from "react";
import { sections } from "../content/sections";

/**
 * Tracks which registered section crosses a thin band at the viewport's
 * vertical centre. Mirrors the id onto <html data-section> for CSS hooks.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-section", active);
  }, [active]);

  return active;
}
