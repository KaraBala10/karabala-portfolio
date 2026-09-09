import { prefersReducedMotion } from "./device";

/** Scrolls a section into view; respects reduced motion and updates the hash. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? " " : `#${id}`);
}
