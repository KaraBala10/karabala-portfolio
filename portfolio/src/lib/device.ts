/**
 * Capability detection → quality tier. Everything expensive (WebGL, pointer
 * light, parallax) consults this instead of assuming a fast machine.
 */
export type QualityTier = "high" | "low" | "static";

interface NavigatorExtras extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasFinePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches
  );
}

export function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "static";
  if (prefersReducedMotion()) return "static";

  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return "low";

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const small = window.innerWidth < 768;

  if (small || cores <= 4 || memory <= 4) return "low";
  return "high";
}

export function supportsWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
