import { useEffect, useRef } from "react";
import { Lattice, type LatticeColors, type RGB } from "./lattice";
import { getQualityTier, hasFinePointer } from "../lib/device";

interface LatticeCanvasProps {
  className?: string;
}

function readColors(): LatticeColors {
  const cs = getComputedStyle(document.documentElement);
  const rgb = (name: string): RGB => {
    const [r, g, b] = cs.getPropertyValue(name).trim().split(/\s+/).map(Number);
    return [r / 255, g / 255, b / 255];
  };
  return { line: rgb("--gl-line"), node: rgb("--gl-node"), packet: rgb("--gl-packet") };
}

/**
 * React boundary around the WebGL lattice. Lazy-loaded; renders only while
 * on screen and the tab is visible; follows the theme via <html data-theme>.
 */
export default function LatticeCanvas({ className }: LatticeCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let lattice: Lattice;
    try {
      lattice = new Lattice(canvas, { tier: getQualityTier(), colors: readColors() });
    } catch {
      canvas.hidden = true;
      return;
    }

    let visible = false;
    const sync = () => {
      if (visible && document.visibilityState === "visible") lattice.start();
      else lattice.stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => lattice.resize());
    ro.observe(canvas);

    const mo = new MutationObserver(() => lattice.setColors(readColors()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    document.addEventListener("visibilitychange", sync);

    let onMove: ((e: PointerEvent) => void) | null = null;
    if (hasFinePointer()) {
      onMove = (e) => {
        lattice.setPointer(
          (e.clientX / window.innerWidth) * 2 - 1,
          -((e.clientY / window.innerHeight) * 2 - 1)
        );
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    canvas.classList.add("is-ready");

    return () => {
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (onMove) window.removeEventListener("pointermove", onMove);
      lattice.destroy();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
