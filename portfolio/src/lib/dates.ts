/** Month-precision date helpers for experience durations and computed stats. */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseMonth(iso: string): { y: number; m: number } {
  const [y, m] = iso.split("-").map(Number);
  return { y, m };
}

export function formatMonth(iso: string): string {
  const { y, m } = parseMonth(iso);
  return `${MONTHS[m - 1]} ${y}`;
}

export function monthsBetween(startIso: string, endIso: string | null, now: Date): number {
  const a = parseMonth(startIso);
  const b = endIso ? parseMonth(endIso) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  return Math.max(0, (b.y - a.y) * 12 + (b.m - a.m));
}

/**
 * Durations count the year currently in progress: an engagement running since
 * Sep 2022 reads as five years during 2026, not four. Finished entries stay
 * exact, and an ongoing one under a year still reports its months.
 */
export function formatDuration(months: number, inProgress = false): string {
  if (inProgress && months >= 12) {
    return `${Math.floor(months / 12) + 1} yrs`;
  }
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m || !y) parts.push(`${m} mo${m !== 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function formatRange(startIso: string, endIso: string | null): string {
  return `${formatMonth(startIso)} — ${endIso ? formatMonth(endIso) : "Present"}`;
}

/** Years of experience since the earliest start month, counting the year in progress. */
export function yearsSince(startIso: string, now: Date): number {
  const months = monthsBetween(startIso, null, now);
  const whole = Math.floor(months / 12);
  return months < 12 ? whole : whole + 1;
}
