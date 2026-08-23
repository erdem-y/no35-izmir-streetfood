import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted variable fonts. Avoids a render-blocking request to a font CDN.
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/geist";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
