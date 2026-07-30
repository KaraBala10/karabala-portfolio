import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/** Build-time entry: renders the full app to static HTML for SEO. */
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
