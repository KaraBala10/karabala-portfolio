import type { CSSProperties } from "react";
import { education, experience } from "../content/experience";
import { formatDuration, formatRange, monthsBetween, yearsSince } from "../lib/dates";
import { useNow } from "../lib/useNow";
import { SectionShell } from "../ui/SectionShell";
import { TextLink } from "../ui/TextLink";
import styles from "./Track.module.css";

const engagementLabel: Record<(typeof experience)[number]["engagement"], string> = {
  "full-time": "Full-time",
  freelance: "Freelance",
  contract: "Contract",
};

export function Track() {
  const now = useNow();
  const earliest = experience.reduce((min, e) => (e.start < min ? e.start : min), experience[0].start);
  const years = yearsSince(earliest, now);
  const current = experience.find((e) => e.end === null && e.engagement === "full-time");
  const ongoing = experience.filter((e) => e.end === null).length;

  return (
    <SectionShell
      id="track"
      title="Track record"
      intro="Where the work has happened: one full-time role and two freelance engagements running in parallel since 2022, on top of an engineering degree."
    >
      <div className={styles.grid}>
        <ol className={styles.timeline} aria-label="Experience">
          {experience.map((e, i) => {
            const months = monthsBetween(e.start, e.end, now);
            const isCurrent = e.end === null;
            return (
              <li key={e.id} className={styles.entry} data-reveal style={{ "--i": i } as CSSProperties}>
                <div className={styles.when}>
                  <span className={`${styles.marker} ${isCurrent ? styles.markerLive : ""}`} aria-hidden />
                  <span className={`mono ${styles.range}`}>{formatRange(e.start, e.end)}</span>
                  <span className={`mono ${styles.duration}`} suppressHydrationWarning>
                    {formatDuration(months, isCurrent)}
                  </span>
                  <span className={`mono ${styles.badge}`}>{engagementLabel[e.engagement]}</span>
                </div>
                <div className={styles.what}>
                  <h3 className={styles.role}>{e.role}</h3>
                  <p className={styles.org}>
                    <span>{e.org}</span>
                    <span className="faint"> · {e.location}</span>
                  </p>
                  <ul className={styles.highlights}>
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>

        <aside className={styles.aside}>
          <div className={styles.panel} data-reveal>
            <p className={`mono ${styles.panelLabel}`}>In numbers</p>
            <dl className={styles.stats}>
              <div>
                <dt>Years shipping</dt>
                <dd className="display" suppressHydrationWarning>
                  {years}
                </dd>
              </div>
              <div>
                <dt>Concurrent engagements</dt>
                <dd className="display">{ongoing}</dd>
              </div>
              {current && (
                <div>
                  <dt>Currently at</dt>
                  <dd className={styles.statText}>{current.org}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className={styles.panel} data-reveal style={{ "--i": 1 } as CSSProperties}>
            <p className={`mono ${styles.panelLabel}`}>Education</p>
            <ul className={styles.education}>
              {education.map((ed) => (
                <li key={ed.id} className={styles.edu}>
                  <p className={styles.degree}>{ed.degree}</p>
                  <p className={styles.institution}>
                    {ed.href ? <TextLink href={ed.href}>{ed.institution}</TextLink> : ed.institution}
                    <span className="faint"> · {ed.location}</span>
                  </p>
                  <p className={`mono ${styles.range}`}>{formatRange(ed.start, ed.end)}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
