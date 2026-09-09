import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "./device";

/**
 * One IntersectionObserver for every [data-reveal] element inside `scope`.
 * Adds `.is-in` once; CSS does the rest (see utilities.css).
 */
export function useReveal(scope: RefObject<HTMLElement>): void {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!targets.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [scope]);
}
