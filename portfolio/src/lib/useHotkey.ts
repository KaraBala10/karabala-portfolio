import { useEffect } from "react";

/** Global keyboard shortcut. `combo` like "mod+k" (mod = ⌘ on Mac, Ctrl elsewhere). */
export function useHotkey(combo: string, handler: (e: KeyboardEvent) => void): void {
  useEffect(() => {
    const parts = combo.toLowerCase().split("+");
    const key = parts[parts.length - 1];
    const needMod = parts.includes("mod");
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (needMod !== mod) return;
      if (e.key.toLowerCase() !== key) return;
      handler(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [combo, handler]);
}
