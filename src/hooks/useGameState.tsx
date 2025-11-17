import { createContext, useContext, useState, type ReactNode } from "react";
import * as Icons from "lucide-react";
import { createPlayers, generateCards, playSound } from "@/utils/gameUtils";
import GameSettings from "@/components/GameSettings";
export type CardIcon = keyof typeof Icons;

export interface Card {
  id: number;
  icon: CardIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: number;
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
  flippedCardIndices: number[];
  isProcessing: boolean;
  gameStatus: "setup" | "playing" | "ended";
  winner: string | null;
  setGameState: <K extends keyof GameState>(
    key: K,
    value: GameState[K]
  ) => void;
  resetGame: (settings?: Partial<GameSettings>) => void;
  flipCard: (cardId: number) => void;
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
  flippedCardIndices: [],
  isProcessing: false,
  gameStatus: "playing",
  winner: null,
  setGameState: () => {},
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

  const [flippedCardIndices, setFlippedCardIndices] = useState<number[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [winner, setWinner] = useState<string | null>(null);

  // we can pass all the setter seperately
  const setGameState = <K extends keyof GameState>(
    key: K,
    value: GameState[K]
  ) => {
    switch (key) {
      case "settings": {
        setSettings(value as GameSettings);
        return;
      }
      case "cards": {
        setCards(value as Card[]);
        return;
      }
      case "players": {
        setPlayers(value as Player[]);
        return;
      }
      case "flippedCardIndices": {
        setFlippedCardIndices(value as number[]);
        return;
      }
      case "currentPlayerIndex": {
        setCurrentPlayerIndex(value as number);
        return;
      }
      case "isProcessing": {
        setIsProcessing(value as boolean);
        return;
      }
      case "gameStatus": {
        setGameStatus(value as GameStatus);
        return;
      }
      case "winner": {
        setWinner(value as string);
        return;
      }
    }
  };

  const resetGame = (newSettings?: Partial<GameSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    setCards(generateCards(updatedSettings.cardCount));
    setPlayers(
      createPlayers(updatedSettings.playerCount, updatedSettings.mode)
    );
    setCurrentPlayerIndex(0);
    setIsProcessing(false);
    setGameStatus("playing");
    setWinner(null);
  };

  const onSecondCardFlip = (
    cards: Card[],
    players: Player[],
    currentPlayerIndex: number,
    flippedCardIndices: number[]
  ) => {
    setIsProcessing(true);

    setTimeout(() => {
      const [firstCardId, secondCardId] = flippedCardIndices;
      const firstCard = cards[firstCardId];
      const secondCard = cards[secondCardId];
      if (!firstCard || !secondCard) return;

      const isMatch = firstCard.icon === secondCard.icon;

      const newCards = cards.map((card) => {
        if (card.id === firstCardId || card.id === secondCardId) {
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
      setFlippedCardIndices([]);
      setGameStatus(allMatched ? "ended" : "playing");
      setCurrentPlayerIndex(
        isMatch ? currentPlayerIndex : (currentPlayerIndex + 1) % players.length
      );

      setWinner(winner);

      setIsProcessing(false);
    }, 1000);
  };
  const flipCard = (cardId: number) => {
    if (isProcessing || flippedCardIndices.length >= 2) return;

    playSound("tap");
    const newCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    const newFlippedCardIndices = [...flippedCardIndices, cardId];
    setCards(newCards);
    setFlippedCardIndices(newFlippedCardIndices);

    if (newFlippedCardIndices.length == 2)
      onSecondCardFlip(
        newCards,
        players,
        currentPlayerIndex,
        newFlippedCardIndices
      );
  };

  const value = {
    settings,
    cards,
    players,
    currentPlayerIndex,
    flippedCardIndices,
    isProcessing,
    gameStatus,
    winner,
    setGameState,
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
