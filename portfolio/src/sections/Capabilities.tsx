import type { CSSProperties } from "react";
import { capabilities } from "../content/capabilities";
import { profile } from "../content/profile";
import { SectionShell } from "../ui/SectionShell";
import { Tag } from "../ui/Tag";
import styles from "./Capabilities.module.css";

export function Capabilities() {
  return (
    <SectionShell
      id="capabilities"
      title="Where I'm strongest"
      intro="Four areas of depth and the tools inside each. The weight is honest: solid means daily use, plain means productive, dashed means I'm learning it right now."
    >
      <p className={`mono ${styles.legend}`} data-reveal aria-label="Legend">
        <span>
          <i className={styles.legendCore} aria-hidden /> Core
        </span>
        <span>
          <i className={styles.legendWorking} aria-hidden /> Working
        </span>
        <span>
          <i className={styles.legendExploring} aria-hidden /> Exploring
        </span>
      </p>

      <div className={styles.grid}>
        {capabilities.map((c, i) => (
          <article key={c.id} className={styles.plate} data-reveal style={{ "--i": i } as CSSProperties} aria-labelledby={`cap-${c.id}`}>
            <header className={styles.head}>
              <span className={`mono ${styles.index}`}>{c.index}</span>
              <h3 id={`cap-${c.id}`} className={`display ${styles.title}`}>
                {c.title}
              </h3>
              <p className={styles.lead}>{c.lead}</p>
            </header>
            <p className={styles.description}>{c.description}</p>
            <ul className={styles.tags} aria-label={`${c.title} tools`}>
              {c.skills.map((s) => (
                <li key={s.name}>
                  <Tag level={s.level}>{s.name}</Tag>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.foot} data-reveal>
        <div className={styles.now}>
          <p className={`mono ${styles.nowLabel}`}>
            <span className={styles.live} aria-hidden /> Currently exploring
          </p>
          <ul className={styles.nowList}>
            {profile.now.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div className={styles.languages}>
          <p className={`mono ${styles.nowLabel}`}>Languages</p>
          <ul className={styles.nowList}>
            {profile.languages.map((l) => (
              <li key={l.name}>
                {l.name} <span className="faint">— {l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
