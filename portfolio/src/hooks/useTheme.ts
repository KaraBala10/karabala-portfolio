import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  // Start as "light" on both server and first client render so the
  // prerendered HTML hydrates without mismatch; the inline script in
  // index.html has already put the real theme class on <html>, and the
  // effect below syncs React state to it right after mount.
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      return next;
    });
  };

  return { theme, toggleTheme };
};
