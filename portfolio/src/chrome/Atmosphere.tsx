import { useEffect, useRef, type CSSProperties } from "react";
import { sections } from "../content/sections";
import { getQualityTier, hasFinePointer } from "../lib/device";
import styles from "./Atmosphere.module.css";

interface AtmosphereProps {
  activeSection: string;
}

/**
 * The background system: a warm glow that migrates as you move between
 * sections, a faint rule grid near the top of the viewport, film-grain noise,
 * and (pointer devices, high tier) a light that follows the cursor.
 * Everything is compositor-only: transforms and opacity, no per-frame paint.
 */
export function Atmosphere({ activeSection }: AtmosphereProps) {
  const meta = sections.find((s) => s.id === activeSection) ?? sections[0];
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light || getQualityTier() !== "high" || !hasFinePointer()) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let active = false;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      light.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(tick);
      else active = false;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      light.style.opacity = "1";
      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const leave = () => {
      light.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={styles.atmosphere}
      aria-hidden="true"
      style={{ "--atmo-x": meta.atmosphere.x, "--atmo-y": meta.atmosphere.y } as CSSProperties}
    >
      <div className={styles.glow} />
      <div className={styles.grid} />
      <div className={styles.noise} />
      <div className={styles.light} ref={lightRef} />
    </div>
  );
}
