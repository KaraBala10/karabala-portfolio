import { useId } from "react";
import type { FlowKind, FlowNode } from "../content/types";
import styles from "./Schematic.module.css";

interface SchematicProps {
  flow: FlowNode[];
  /** Nodes per row; rows snake so the connector always continues. */
  columns?: 2 | 3;
  /** Animate packets along the connectors. */
  live?: boolean;
  title?: string;
}

const W = 116;
const H = 44;
const GX = 52;
const GY = 40;
const PAD = 22;
const HEAD = 26;

function Glyph({ kind }: { kind: FlowKind }) {
  switch (kind) {
    case "source":
      return <circle cx="6" cy="6" r="4.5" />;
    case "process":
      return <rect x="1.5" y="1.5" width="9" height="9" rx="1" />;
    case "ai":
      return <path d="M6 .8 11.2 6 6 11.2.8 6z" />;
    case "store":
      return (
        <>
          <ellipse cx="6" cy="2.6" rx="4.8" ry="1.8" />
          <path d="M1.2 2.6v6.8c0 1 2.1 1.8 4.8 1.8s4.8-.8 4.8-1.8V2.6" />
        </>
      );
    case "output":
      return <path d="M1 1h6l4 5-4 5H1z" />;
  }
}

/**
 * Generated pipeline schematic. Pure SVG from the project's `flow` data —
 * every project gets a consistent, meaningful visual without a screenshot.
 */
export function Schematic({ flow, columns = 3, live = false, title = "Data flow" }: SchematicProps) {
  const uid = useId().replace(/:/g, "");
  const n = flow.length;
  const cols = Math.min(columns, n);
  const rows = Math.ceil(n / cols);
  const width = PAD * 2 + cols * W + (cols - 1) * GX;
  const height = PAD * 2 + HEAD + rows * H + (rows - 1) * GY;

  const pos = flow.map((_, i) => {
    const row = Math.floor(i / cols);
    const col = row % 2 === 0 ? i % cols : cols - 1 - (i % cols);
    return { x: PAD + col * (W + GX), y: PAD + HEAD + row * (H + GY) };
  });

  const connectors = flow.slice(1).map((_, i) => {
    const a = pos[i];
    const b = pos[i + 1];
    const sameRow = a.y === b.y;
    if (sameRow) {
      const dir = b.x > a.x ? 1 : -1;
      const x1 = dir > 0 ? a.x + W : a.x;
      const x2 = dir > 0 ? b.x : b.x + W;
      const y = a.y + H / 2;
      return { d: `M${x1} ${y}H${x2}`, tip: `M${x2 - dir * 6} ${y - 4}L${x2} ${y}L${x2 - dir * 6} ${y + 4}` };
    }
    const x = a.x + W / 2;
    const y1 = a.y + H;
    const y2 = b.y;
    return { d: `M${x} ${y1}V${y2}`, tip: `M${x - 4} ${y2 - 6}L${x} ${y2}L${x + 4} ${y2 - 6}` };
  });

  return (
    <svg
      className={styles.svg}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${title}: ${flow.map((f) => f.label).join(" → ")}`}
      data-live={live ? "true" : "false"}
    >
      <defs>
        <pattern id={`dots-${uid}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" className={styles.dot} />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#dots-${uid})`} />

      <text x={PAD} y={PAD + 8} className={styles.head}>
        {title.toUpperCase()}
      </text>
      <text x={width - PAD} y={PAD + 8} className={`${styles.head} ${styles.headRight}`}>
        {n} STAGES
      </text>

      {connectors.map((c, i) => (
        <g key={i}>
          <path d={c.d} className={styles.base} />
          <path d={c.d} className={styles.flow} />
          <path d={c.tip} className={styles.tip} />
        </g>
      ))}

      {flow.map((node, i) => (
        <g key={i} transform={`translate(${pos[i].x} ${pos[i].y})`} className={styles.node} data-kind={node.kind}>
          <rect width={W} height={H} rx="4" className={styles.box} />
          <g transform="translate(12 16)" className={styles.glyph}>
            <Glyph kind={node.kind} />
          </g>
          <text x="32" y={H / 2 + 4} className={styles.label}>
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
