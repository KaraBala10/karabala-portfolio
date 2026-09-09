import { useEffect, type RefObject } from "react";
import { hasFinePointer, prefersReducedMotion } from "./device";

/**
 * Perspective tilt that follows the pointer over an element. Writes --rx/--ry
 * (degrees) so CSS owns the transform. Pointer devices only.
 */
export function useTilt(ref: RefObject<HTMLElement>, maxDeg = 5): void {
  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${(-y * maxDeg).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * maxDeg).toFixed(2)}deg`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [ref, maxDeg]);
}
