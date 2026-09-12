// Injects the server-rendered app markup into dist/index.html so crawlers
// and AI agents that don't execute JavaScript still see the full content.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");

const { render } = await import(resolve(root, "dist-ssr/entry-server.js"));
const appHtml = render();

const template = readFileSync(indexPath, "utf-8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`Could not find ${marker} in dist/index.html`);
}
writeFileSync(
  indexPath,
  template.replace(marker, `<div id="root">${appHtml}</div>`)
);

// `lastmod` is a promise to crawlers about freshness; stamping it at build time
// keeps it honest without anyone remembering to edit the file.
const sitemapPath = resolve(root, "dist/sitemap.xml");
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  sitemapPath,
  readFileSync(sitemapPath, "utf-8").replace(
    /<lastmod>[^<]*<\/lastmod>/,
    `<lastmod>${today}</lastmod>`
  )
);

// The SSR bundle is only needed at build time.
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log(
  `Prerendered app markup injected into dist/index.html (${(
    appHtml.length / 1024
  ).toFixed(1)} kB of HTML); sitemap lastmod set to ${today}`
);
