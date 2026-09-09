import { useEffect, useState } from "react";

/**
 * Becomes true once the browser is idle after mount (or after `timeout` ms).
 * Used to defer non-essential work — the WebGL chunk — past first interaction.
 * Always false during prerender, so static HTML never references it.
 */
export function useIdle(timeout = 2000): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setIdle(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setIdle(true), Math.min(timeout, 800));
    return () => window.clearTimeout(id);
  }, [timeout]);
  return idle;
}
