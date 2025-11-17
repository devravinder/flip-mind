import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { createPlayers, generateCards, playSound } from "@/utils/gameUtils";
import GameSettings from "@/components/GameSettings";
export type CardIcon = keyof typeof Icons;
import * as Icons from "lucide-react";

export interface Card {
  id: string;
  icon: CardIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  isBot: boolean;
}

export type GameMode = "bot" | "pass-play";

export type GameStatus = "setup" | "playing" | "ended";

export interface GameState {
  settings: GameSettings;
  cards: Card[];
  players: Player[];
  currentPlayerIndex: number;
  flippedCards: string[];
  isProcessing: boolean;
  gameStatus: "setup" | "playing" | "ended";
  winner: string | null;
  isBotTurn: boolean,
  resetGame: (settings?: Partial<GameSettings>) => void;
  flipCard: (cardId: string) => void;
}

export interface GameSettings {
  mode: GameMode;
  cardCount: number;
  playerCount: number;
}

//====

type StateProps = {
  children: ReactNode;
  initialSettings: GameSettings;
};

const initialState: GameState = {
  settings: { mode: "pass-play", cardCount: 10, playerCount: 2 },
  cards: [],
  players: [],
  currentPlayerIndex: 0,
  flippedCards: [],
  isProcessing: false,
  gameStatus: "playing",
  winner: null,
  isBotTurn:false,
  resetGame: () => {},
  flipCard: () => {},
};

const AppContext = createContext<GameState>(initialState);

export const GameStateProvider = ({
  children,
  initialSettings,
  ...props
}: StateProps) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [cards, setCards] = useState<Card[]>(() =>
    generateCards(initialSettings.cardCount)
  );
  const [players, setPlayers] = useState<Player[]>(() =>
    createPlayers(initialSettings.playerCount, initialSettings.mode)
  );

  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [winner, setWinner] = useState<string | null>(null);

  const resetGame = (newSettings?: Partial<GameSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    setCards(generateCards(updatedSettings.cardCount));
    setPlayers(
      createPlayers(updatedSettings.playerCount, updatedSettings.mode)
    );
    setFlippedCards([])
    setCurrentPlayerIndex(0);
    setIsProcessing(false);
    setGameStatus("playing");
    setWinner(null);
  };

  const onSecondCardFlip = (
    cards: Card[],
    players: Player[],
    currentPlayerIndex: number,
    flippedCards: string[]
  ) => {
    setIsProcessing(true);

    setTimeout(() => {
      const [firstCard, secondCard] = cards.filter(card=>flippedCards.includes(card.id));

      if (!firstCard || !secondCard) return;

      const isMatch = firstCard.icon === secondCard.icon;

      const newCards = cards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return isMatch
            ? { ...card, isMatched: true }
            : { ...card, isFlipped: false };
        }
        return card;
      });

      const newPlayers = isMatch
        ? players.map((player, index) =>
            index === currentPlayerIndex
              ? {
                  ...player,
                  score: player.score + 1,
                }
              : player
          )
        : players;

      const allMatched = newCards.every((card) => card.isMatched);
      if (allMatched) playSound("winner");
      else if (isMatch) playSound("match");

      const winner = allMatched
        ? newPlayers.reduce((prev, current) =>
            current.score > prev.score ? current : prev
          ).name
        : null;

      //===
      setCards(newCards);
      setPlayers(newPlayers);
      setFlippedCards([]);
      setGameStatus(allMatched ? "ended" : "playing");
      setCurrentPlayerIndex(
        isMatch ? currentPlayerIndex : (currentPlayerIndex + 1) % players.length
      );

      setWinner(winner);

      setIsProcessing(false);
    }, 1000);
  };
  const flipCard = (cardId: string) => {
    if (isProcessing || flippedCards.length >= 2) return;

    playSound("tap");
    const newCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    const newFlippedCards = [...flippedCards, cardId];
    setCards(newCards);
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length == 2)
      onSecondCardFlip(
        newCards,
        players,
        currentPlayerIndex,
        newFlippedCards
      );
  };


  const isBotTurn = useMemo(() => settings.mode=="bot" && currentPlayerIndex===1, [settings.mode, currentPlayerIndex])

  const value = {
    settings,
    cards,
    players,
    currentPlayerIndex,
    flippedCards,
    isProcessing,
    gameStatus,
    winner,
    isBotTurn,
    resetGame,
    flipCard,
  };

  return (
    <AppContext.Provider value={value} {...props}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameState = () => {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error("useGameState must be used within a GameStateProvider");

  return context;
};
