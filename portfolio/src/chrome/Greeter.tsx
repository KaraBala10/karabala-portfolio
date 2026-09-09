import { useCallback, useEffect, useRef, useState } from "react";
import { profile, socials } from "../content/profile";
import { prefersReducedMotion } from "../lib/device";
import { Icon } from "../ui/Icon";
import styles from "./Greeter.module.css";

type Stage = "hidden" | "typing" | "teaser" | "open" | "dismissed";

const STORAGE_KEY = "greeter-dismissed";
const APPEAR_AFTER_MS = 5000;
const TYPING_MS = 1400;

/**
 * A messenger-style greeting. After a short delay a "typing" bubble appears,
 * then a one-line teaser; clicking it opens a small card with direct contact
 * channels. Dismissal is remembered for the session so it never nags.
 * Client-only: renders nothing during prerender.
 */
export function Greeter() {
  const [stage, setStage] = useState<Stage>("hidden");
  const closeRef = useRef<HTMLButtonElement>(null);
  const teaserRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* storage unavailable: just show it */
    }
    const reduced = prefersReducedMotion();
    const t1 = window.setTimeout(() => setStage(reduced ? "teaser" : "typing"), APPEAR_AFTER_MS);
    const t2 = window.setTimeout(() => setStage("teaser"), APPEAR_AFTER_MS + (reduced ? 0 : TYPING_MS));
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const dismiss = useCallback(() => {
    setStage("dismissed");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  // Escape closes the open card back to the teaser; focus management.
  useEffect(() => {
    if (stage === "open") {
      requestAnimationFrame(() => closeRef.current?.focus());
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setStage("teaser");
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (stage === "teaser") teaserRef.current?.focus({ preventScroll: true });
  }, [stage]);

  if (stage === "hidden" || stage === "dismissed") return null;

  const whatsapp = socials.find((s) => s.id === "whatsapp");
  const telegram = socials.find((s) => s.id === "telegram");

  return (
    <div className={styles.root} data-stage={stage}>
      {stage === "open" ? (
        <section className={styles.card} role="dialog" aria-label="Message from Mohammad">
          <header className={styles.cardHead}>
            <Avatar />
            <div>
              <p className={styles.name}>{profile.firstName}</p>
              <p className={`mono ${styles.status}`}>
                <span className={styles.dot} aria-hidden /> Usually replies within a day
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              className={styles.close}
              onClick={dismiss}
              aria-label="Close message"
            >
              <Icon name="close" size={16} />
            </button>
          </header>

          <p className={styles.message}>{profile.greeter.message}</p>

          <div className={styles.actions}>
            <a href={profile.emailComposeUrl} target="_blank" rel="noopener noreferrer" className={`${styles.action} ${styles.primary}`}>
              <Icon name="mail" size={15} /> Email me
            </a>
            {whatsapp && (
              <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={styles.action}>
                <Icon name="whatsapp" size={15} /> WhatsApp
              </a>
            )}
            {telegram && (
              <a href={telegram.href} target="_blank" rel="noopener noreferrer" className={styles.action}>
                <Icon name="telegram" size={15} /> Telegram
              </a>
            )}
          </div>
        </section>
      ) : (
        <div className={styles.row}>
          <button
            ref={teaserRef}
            type="button"
            className={styles.bubble}
            onClick={() => setStage("open")}
            aria-expanded={false}
            aria-label={stage === "typing" ? "Mohammad is typing a message" : `${profile.greeter.teaser} Open message`}
            disabled={stage === "typing"}
          >
            <Avatar />
            {stage === "typing" ? (
              <span className={styles.typing} aria-hidden>
                <i />
                <i />
                <i />
              </span>
            ) : (
              <span className={styles.teaser}>
                {profile.greeter.teaser}
                <span className={`mono ${styles.hint}`}>Tap to reply</span>
              </span>
            )}
            <span className={styles.badge} aria-hidden />
          </button>
          {stage === "teaser" && (
            <button type="button" className={styles.dismiss} onClick={dismiss} aria-label="Dismiss message">
              <Icon name="close" size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Avatar() {
  return (
    <span className={styles.avatar}>
      <img src="/portrait/portrait-400.webp" width={40} height={40} alt="" loading="lazy" decoding="async" />
    </span>
  );
}
