import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const STORAGE_KEY = "theme";

/**
 * The inline script in index.html applies the real theme before paint. React
 * starts as "dark" on both server and client (no hydration mismatch) and syncs
 * to the DOM right after mount.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const setAndPersist = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable */
    }
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setAndPersist(theme === "dark" ? "light" : "dark");
  }, [theme, setAndPersist]);

  return { theme, toggleTheme };
}
