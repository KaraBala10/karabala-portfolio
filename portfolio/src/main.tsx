import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const container = document.getElementById("root");
if (!container) throw new Error("#root missing");

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production HTML ships prerendered markup (scripts/prerender.mjs) — hydrate
// it. The dev server serves an empty #root, so render fresh there.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
