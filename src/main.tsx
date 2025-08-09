import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Use HashRouter for GitHub Pages
import App from "./App.tsx";
import "./index.css";

// Prevent transitions on page load
const Root = () => {
  useEffect(() => {
    // Remove preload class after initial page load
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("preload");
    });
  }, []);

  return (
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  );
};

// Add preload class to prevent transitions on page load
document.documentElement.classList.add("preload");

createRoot(document.getElementById("root")!).render(<Root />);
