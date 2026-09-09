import type { SkillLevel } from "../content/types";
import styles from "./Tag.module.css";

interface TagProps {
  children: string;
  level?: SkillLevel;
  size?: "sm" | "md";
}

/** Technology tag. `level` sets the visual weight: core › working › exploring. */
export function Tag({ children, level, size = "md" }: TagProps) {
  const cls = [styles.tag, level && styles[level], size === "sm" && styles.sm]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} data-level={level}>
      {level === "core" && <span className={styles.dot} aria-hidden />}
      {children}
      {level && <span className="sr-only"> ({level})</span>}
    </span>
  );
}
