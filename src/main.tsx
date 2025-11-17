import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import { GameStateProvider } from "./hooks/useGameState.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameStateProvider initialSettings={{mode:"pass-play",cardCount:10, playerCount:2}}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GameStateProvider>
  </StrictMode>
);
