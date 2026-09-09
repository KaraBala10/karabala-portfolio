import { useRef, type CSSProperties } from "react";
import { featuredProjects, otherProjects } from "../content/projects";
import type { Project } from "../content/types";
import { useInView } from "../lib/useInView";
import { useMediaQuery } from "../lib/useMediaQuery";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { SectionShell } from "../ui/SectionShell";
import { Tag } from "../ui/Tag";
import { Schematic } from "./Schematic";
import styles from "./Work.module.css";

const linkIcon: Record<Project["links"][number]["kind"], IconName> = {
  github: "github",
  live: "arrow-up-right",
  bot: "bot",
  demo: "arrow-up-right",
  docs: "arrow-up-right",
};

function ProjectCase({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const live = useInView(ref, "-10% 0px -10% 0px");
  const narrow = useMediaQuery("(max-width: 640px)");

  return (
    <article ref={ref} className={styles.case} id={`project-${project.slug}`} aria-labelledby={`project-${project.slug}-title`}>
      <div className={styles.visual}>
        <div className={styles.plate} data-reveal>
          <Schematic flow={project.flow} columns={narrow ? 2 : 3} live={live} />
        </div>
      </div>

      <div className={styles.body}>
        <p className={`mono ${styles.meta}`} data-reveal>
          <span className={styles.metaIndex}>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.domain}</span>
          <span>{project.year}</span>
        </p>
        <h3 id={`project-${project.slug}-title`} className={`display ${styles.title}`} data-reveal style={{ "--i": 1 } as CSSProperties}>
          {project.title}
        </h3>
        <p className={styles.tagline} data-reveal style={{ "--i": 2 } as CSSProperties}>
          {project.tagline}
        </p>
        <p className={`prose ${styles.summary}`} data-reveal style={{ "--i": 3 } as CSSProperties}>
          {project.summary}
        </p>

        <dl className={styles.facts} data-reveal style={{ "--i": 4 } as CSSProperties}>
          <div className={styles.fact}>
            <dt className="mono">Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div className={styles.fact}>
            <dt className="mono">Built</dt>
            <dd>
              <ul className={styles.built}>
                {project.built.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </dd>
          </div>
          {project.impact && (
            <div className={styles.fact}>
              <dt className="mono">Impact</dt>
              <dd>{project.impact}</dd>
            </div>
          )}
          <div className={styles.fact}>
            <dt className="mono">Role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>

        <ul className={styles.stack} aria-label="Stack" data-reveal style={{ "--i": 5 } as CSSProperties}>
          {project.stack.map((s) => (
            <li key={s}>
              <Tag size="sm">{s}</Tag>
            </li>
          ))}
        </ul>

        <div className={styles.links} data-reveal style={{ "--i": 6 } as CSSProperties}>
          {project.links.length > 0 ? (
            project.links.map((l) => (
              <Button key={l.href} href={l.href} variant="secondary" icon={linkIcon[l.kind]} iconPosition="start">
                {l.label}
              </Button>
            ))
          ) : (
            <p className={`mono ${styles.private}`}>Private deployment · no public link</p>
          )}
        </div>
      </div>
    </article>
  );
}

function Ledger({ projects, offset }: { projects: Project[]; offset: number }) {
  return (
    <div className={styles.ledger}>
      <p className={`mono ${styles.ledgerHead}`} data-reveal>
        More work
      </p>
      <ol className={styles.rows}>
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal style={{ "--i": i + 1 } as CSSProperties}>
            <article className={styles.row} id={`project-${p.slug}`} aria-labelledby={`project-${p.slug}-title`}>
              <span className={`mono ${styles.rowIndex}`}>{String(offset + i + 1).padStart(2, "0")}</span>
              <div className={styles.rowMain}>
                <h3 id={`project-${p.slug}-title`} className={styles.rowTitle}>
                  {p.title}
                </h3>
                <p className={styles.rowTagline}>{p.tagline}</p>
                <p className={styles.rowSummary}>{p.summary}</p>
              </div>
              <p className={`mono ${styles.rowStack}`}>{p.stack.join(" · ")}</p>
              <ul className={styles.rowLinks} aria-label={`${p.title} links`}>
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.rowLink}
                      aria-label={`${p.title} — ${l.label}`}
                    >
                      <Icon name={linkIcon[l.kind]} size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Work() {
  return (
    <SectionShell
      id="work"
      title="Selected work"
      intro="Three systems I would put in front of anyone, each drawn as the architecture it actually is, and a ledger of the rest."
    >
      <div className={styles.cases}>
        {featuredProjects.map((p, i) => (
          <ProjectCase key={p.slug} project={p} index={i} />
        ))}
      </div>
      {otherProjects.length > 0 && <Ledger projects={otherProjects} offset={featuredProjects.length} />}
    </SectionShell>
  );
}
