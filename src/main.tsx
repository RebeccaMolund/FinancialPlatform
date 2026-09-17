import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Visa scrollbars medan användaren scrollar (särskilt viktigt på touch-enheter
// där :hover aldrig triggas). Klassen sätts på <html> och tas bort efter
// en kort paus utan scroll-events.
let scrollHideTimer: number | undefined;
window.addEventListener(
  "scroll",
  () => {
    document.documentElement.classList.add("is-scrolling");
    window.clearTimeout(scrollHideTimer);
    scrollHideTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("is-scrolling");
    }, 800);
  },
  { capture: true, passive: true },
);

createRoot(document.getElementById("root")!).render(<App />);
