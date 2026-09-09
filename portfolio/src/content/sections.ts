/**
 * Section registry. Navigation (rail, dock, command menu) and the active-
 * section observer derive from this list, so adding a section is one entry.
 */
export interface SectionMeta {
  id: string;
  index: string;
  label: string;
  /** Compact label for the mobile dock; falls back to `label`. */
  short?: string;
  /** Position of the atmospheric glow while this section is active (viewport %). */
  atmosphere: { x: number; y: number };
}

export const sections: SectionMeta[] = [
  { id: "top", index: "00", label: "Intro", atmosphere: { x: 72, y: 18 } },
  { id: "work", index: "01", label: "Work", atmosphere: { x: 20, y: 40 } },
  { id: "capabilities", index: "02", label: "Capabilities", short: "Skills", atmosphere: { x: 80, y: 55 } },
  { id: "track", index: "03", label: "Track record", short: "Track", atmosphere: { x: 30, y: 70 } },
  { id: "approach", index: "04", label: "Approach", atmosphere: { x: 75, y: 35 } },
  { id: "contact", index: "05", label: "Contact", atmosphere: { x: 50, y: 85 } },
];

export const navSections = sections.filter((s) => s.id !== "top");
