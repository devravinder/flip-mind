import * as Icons from 'lucide-react';
export type CardIcon = keyof typeof Icons;

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
  earnedCards: CardIcon[];
  isBot: boolean;
}

export type GameMode = 'bot' | 'friend';

export interface GameState {
  cards: Card[];
  players: Player[];
  currentPlayerIndex: number;
  flippedCards: string[];
  isProcessing: boolean;
  gameStatus: 'setup' | 'playing' | 'ended';
  winner: string | null;
}

export interface GameSettings {
  mode: GameMode;
  cardCount: number;
  playerCount: number;
}
