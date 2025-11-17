import useBotPlayer from "./hooks/useBotPlayer";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import GameSettings from "./components/GameSettings";
import WinnerModal from "./components/WinnerModal";
import ThemeToggle from "./components/ThemeToggle";
import { Brain } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { useGameState } from "./hooks/useGameState";

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    flipCard,
    settings,
    resetGame,
    gameStatus,
    players,
    cards,
    isProcessing,
    winner,
    currentPlayerIndex,
    isBotTurn,
  } = useGameState();

  useBotPlayer();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <GameSettings
        settings={settings}
        onSettingsChange={(newSettings) => resetGame(newSettings)}
        onRestart={() => resetGame()}
      />

      <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              FlipMind
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Test your memory and find the matching pairs!
          </p>
        </header>

        <ScoreBoard players={players} currentPlayerIndex={currentPlayerIndex} />

        <GameBoard
          cards={cards}
          onCardFlip={flipCard}
          disabled={isProcessing || isBotTurn}
        />
      </div>

      {gameStatus === "ended" && winner && (
        <WinnerModal winner={winner} onRestart={() => resetGame()} />
      )}
    </div>
  );
}

export default App;
