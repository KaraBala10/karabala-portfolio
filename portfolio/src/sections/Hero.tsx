import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { experience } from "../content/experience";
import { yearsSince } from "../lib/dates";
import { supportsWebGL } from "../lib/device";
import { scrollToSection } from "../lib/scroll";
import { useIdle } from "../lib/useIdle";
import { useLocalTime } from "../lib/useLocalTime";
import { useNow } from "../lib/useNow";
import { useTilt } from "../lib/useTilt";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import styles from "./Hero.module.css";

const LatticeCanvas = lazy(() => import("../gl/LatticeCanvas"));

// Matches the plate in Hero.module.css: 19rem from 1024px up, 16rem below.
const PORTRAIT_SIZES = "(min-width: 1024px) 304px, 256px";
const widths = [400, 640, 900, 1024];
const srcSet = (ext: "webp" | "jpg") => widths.map((w) => `/portrait/portrait-${w}.${ext} ${w}w`).join(", ");

/** Mounts the WebGL chunk only when idle and when WebGL exists. */
function useLatticeReady(): boolean {
  const idle = useIdle(2200);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (idle) setOk(supportsWebGL());
  }, [idle]);
  return ok;
}

export function Hero() {
  const now = useNow();
  const time = useLocalTime(profile.timezone);
  const plateRef = useRef<HTMLDivElement>(null);
  useTilt(plateRef, 4);
  const latticeReady = useLatticeReady();

  const earliest = experience.reduce((min, e) => (e.start < min ? e.start : min), experience[0].start);
  const years = yearsSince(earliest, now);
  const i = (n: number) => ({ "--i": n } as CSSProperties);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`mono ${styles.eyebrow}`} data-reveal style={i(0)}>
            <span className={styles.eyebrowAccent}>{profile.title}</span>
            <span aria-hidden> · </span>
            <span>Damascus → remote</span>
          </p>

          <h1 id="hero-name" className={`display ${styles.name}`} data-reveal style={i(1)}>
            <span className={styles.first}>{profile.firstName}</span>
            <span className={styles.last}>{profile.lastName}</span>
          </h1>

          <p className={`display ${styles.headline}`} data-reveal style={i(2)}>
            {profile.headline}
          </p>

          <p className={`prose ${styles.intro}`} data-reveal style={i(3)}>
            {profile.intro}
          </p>

          <div className={styles.actions} data-reveal style={i(4)}>
            <Button
              href="#work"
              size="lg"
              icon="arrow-down"
              magnetic
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("work");
              }}
            >
              See the work
            </Button>
            <Button href={profile.cvPath} variant="secondary" size="lg" icon="download" download>
              Download CV
            </Button>
            <Button
              href="#contact"
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
            >
              Get in touch
            </Button>
          </div>
        </div>

        <div className={styles.visual} data-reveal style={i(2)}>
          <div className={styles.orbit} aria-hidden="true">
            <div className={styles.orbitFallback} />
            {latticeReady && (
              <Suspense fallback={null}>
                <LatticeCanvas className={styles.lattice} />
              </Suspense>
            )}
          </div>

          <figure className={styles.plate} ref={plateRef} data-parallax="slow">
            <span className={styles.outline} aria-hidden="true" />
            <div className={styles.frame}>
              <picture>
                <source type="image/webp" srcSet={srcSet("webp")} sizes={PORTRAIT_SIZES} />
                <img
                  src="/portrait/portrait-640.jpg"
                  srcSet={srcSet("jpg")}
                  sizes={PORTRAIT_SIZES}
                  width={1024}
                  height={1280}
                  alt="Mohammad KaraBala in a dim office, code on the monitor behind him"
                  decoding="async"
                  {...{ fetchpriority: "high" }}
                />
              </picture>
              <span className={`${styles.corner} ${styles.tl}`} aria-hidden />
              <span className={`${styles.corner} ${styles.br}`} aria-hidden />
            </div>
            <figcaption className={`mono ${styles.caption}`}>
              <span>Fig. 01</span>
              <span>{profile.lastName}, M.</span>
              <span>{profile.location}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className={`container ${styles.statusWrap}`}>
        <dl className={styles.status} aria-label="At a glance">
          <div className={styles.statusItem}>
            <dt className="sr-only">Availability</dt>
            <dd>
              <span className={styles.pulse} aria-hidden />
              {profile.availability} · {profile.availableFor.join(" & ")}
            </dd>
          </div>
          <div className={styles.statusItem}>
            <dt className="sr-only">Experience</dt>
            <dd>
              <span suppressHydrationWarning>{years}</span> years shipping
            </dd>
          </div>
          <div className={styles.statusItem}>
            <dt className="sr-only">Projects</dt>
            <dd>{projects.length} projects documented</dd>
          </div>
          <div className={`${styles.statusItem} ${styles.statusTime}`}>
            <dt className="sr-only">Local time</dt>
            <dd>
              <Icon name="clock" size={12} />
              <span suppressHydrationWarning>{time || "--:--"}</span> {profile.utcOffsetLabel}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
