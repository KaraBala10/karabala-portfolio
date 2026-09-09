import { useCallback, useEffect, useRef, useState } from "react";

/** Clipboard copy with a short "copied" state for button feedback. */
export function useCopy(resetMs = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), resetMs);
      } catch {
        setCopied(false);
      }
    },
    [resetMs]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { copied, copy };
}
