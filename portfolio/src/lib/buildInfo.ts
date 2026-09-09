/** Injected at build time (see vite.config.ts). Keeps prerender + hydration deterministic. */
export const BUILD_DATE: string = __BUILD_DATE__;
export const buildDate = new Date(`${BUILD_DATE}T00:00:00Z`);
