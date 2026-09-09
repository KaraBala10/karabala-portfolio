/**
 * Content model. Every section renders from these types; adding content is a
 * data change, not an interface change.
 */

export type LinkKind = "github" | "live" | "bot" | "demo" | "docs";

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  href: string;
}

/** A stage in a project's data flow, used to draw its schematic. */
export type FlowKind = "source" | "process" | "ai" | "store" | "output";

export interface FlowNode {
  label: string;
  kind: FlowKind;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line positioning, e.g. "Social media automation system". */
  tagline: string;
  /** Domain label shown as mono metadata. */
  domain: string;
  year: string;
  role: string;
  featured: boolean;
  summary: string;
  problem: string;
  built: string[];
  impact?: string;
  stack: string[];
  flow: FlowNode[];
  links: ProjectLink[];
}

export type SkillLevel = "core" | "working" | "exploring";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface Capability {
  id: string;
  index: string;
  title: string;
  lead: string;
  description: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  location: string;
  /** ISO month, e.g. "2024-01". */
  start: string;
  /** ISO month or null when ongoing. */
  end: string | null;
  engagement: "full-time" | "freelance" | "contract";
  highlights: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string | null;
  href?: string;
}

export interface Principle {
  index: string;
  title: string;
  body: string;
}

export type SocialBrand =
  | "github"
  | "linkedin"
  | "email"
  | "telegram"
  | "whatsapp"
  | "facebook";

export interface SocialLink {
  id: SocialBrand;
  label: string;
  handle: string;
  href: string;
  /** Primary channels appear in the contact ledger's first tier. */
  primary?: boolean;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  monogram: string;
  title: string;
  headline: string;
  intro: string;
  location: string;
  timezone: string;
  utcOffsetLabel: string;
  availability: string;
  availableFor: string[];
  languages: { name: string; level: string }[];
  email: string;
  emailComposeUrl: string;
  phone: string;
  phoneHref: string;
  cvPath: string;
  siteUrl: string;
  now: string[];
  /** The chat-style greeting bubble that appears after a short delay. */
  greeter: {
    teaser: string;
    message: string;
  };
}
