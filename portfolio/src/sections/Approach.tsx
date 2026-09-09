import type { CSSProperties } from "react";
import { principles } from "../content/principles";
import { SectionShell } from "../ui/SectionShell";
import styles from "./Approach.module.css";

export function Approach() {
  return (
    <SectionShell
      id="approach"
      title="How I work"
      intro="Four rules that show up in every system above. They are less about tools than about what happens after launch."
    >
      <ol className={styles.grid}>
        {principles.map((p, i) => (
          <li key={p.index} className={styles.cell} data-reveal style={{ "--i": i } as CSSProperties}>
            <span className={`display ${styles.index}`} aria-hidden>
              {p.index}
            </span>
            <h3 className={`display ${styles.title}`}>{p.title}</h3>
            <p className={styles.body}>{p.body}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
