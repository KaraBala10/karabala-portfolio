import { useEffect, useState } from "react";
import { buildDate } from "./buildInfo";

/**
 * Deterministic "now": the build date during prerender and first render
 * (hydration-safe), then the real clock after mount.
 */
export function useNow(): Date {
  const [now, setNow] = useState(buildDate);
  useEffect(() => setNow(new Date()), []);
  return now;
}
