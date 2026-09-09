import type { Principle } from "./types";

/** Engineering philosophy — short, specific, and true to how the work gets done. */
export const principles: Principle[] = [
  {
    index: "01",
    title: "Production is the spec",
    body: "A pipeline that works once is a prototype. I design for the second week: retries, validation, logs you can actually read, and alerts before users notice.",
  },
  {
    index: "02",
    title: "Automate the boring, watch the rest",
    body: "If a human repeats it, a machine should do it — and a dashboard should prove it did. Deployments, monitoring and cleanup are automated by default.",
  },
  {
    index: "03",
    title: "Boring infrastructure, interesting products",
    body: "Docker, Linux, Postgres, plain HTTP. Well-understood tools leave the budget for the parts that are genuinely new, like the AI stages.",
  },
  {
    index: "04",
    title: "Build for the people who use it",
    body: "Arabic-first interfaces, fast responses, no dead ends. Good engineering is measured at the point where someone relies on it.",
  },
];
