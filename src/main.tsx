import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import "./base.css";

import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element was not found");
}

document.addEventListener('touchstart', () => {}, { passive: true });

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
