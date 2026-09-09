import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/** Build-time entry: renders the full app to static HTML for crawlers and no-JS readers. */
export function render(): string {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
