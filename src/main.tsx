import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { applyTheme, getSavedThemeMode } from "@/features/themes";
import { BrowserRouter } from "react-router-dom";

// load all settign then apply tehn start or app
async function bootStrap() {
  const mode = getSavedThemeMode();
  await applyTheme(mode);

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}

bootStrap();
