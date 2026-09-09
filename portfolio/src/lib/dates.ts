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

export function formatDuration(months: number): string {
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

/** Whole years of experience since the earliest start month. */
export function yearsSince(startIso: string, now: Date): number {
  return Math.floor(monthsBetween(startIso, null, now) / 12);
}
