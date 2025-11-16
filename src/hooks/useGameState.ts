import { useState, useCallback, useEffect } from 'react';
import { type GameState, type GameSettings, } from '../types/game';
import { generateCards, createPlayers, playSound } from '../utils/gameUtils';

export const useGameState = (initialSettings: GameSettings) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);
  const [gameState, setGameState] = useState<GameState>(() => ({
    cards: generateCards(initialSettings.cardCount),
    players: createPlayers(initialSettings.playerCount, initialSettings.mode ),
    currentPlayerIndex: 0,
    flippedCards: [],
    isProcessing: false,
    gameStatus: 'playing',
    winner: null,
  }));

  const resetGame = useCallback((newSettings?: Partial<GameSettings>) => {
    const updatedSettings = newSettings ? { ...settings, ...newSettings } : settings;
    setSettings(updatedSettings);
    setGameState({
      cards: generateCards(updatedSettings.cardCount),
      players: createPlayers(updatedSettings.playerCount, updatedSettings.mode ),
      currentPlayerIndex: 0,
      flippedCards: [],
      isProcessing: false,
      gameStatus: 'playing',
      winner: null,
    });
  }, [settings]);

  const flipCard = useCallback((cardId: string) => {
    if (gameState.isProcessing || gameState.flippedCards.length >= 2) return;

    playSound("tap")

    setGameState((prev) => {
      const newCards = prev.cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      );

      return {
        ...prev,
        cards: newCards,
        flippedCards: [...prev.flippedCards, cardId],
      };
    });
  }, [gameState.isProcessing, gameState.flippedCards.length]);

  const nextPlayer = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      currentPlayerIndex: (prev.currentPlayerIndex + 1) % prev.players.length,
    }));
  }, []);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      setGameState((prev) => ({ ...prev, isProcessing: true }));

      const [firstCardId, secondCardId] = gameState.flippedCards;
      const firstCard = gameState.cards.find((c) => c.id === firstCardId);
      const secondCard = gameState.cards.find((c) => c.id === secondCardId);

      if (!firstCard || !secondCard) return;

      const isMatch = firstCard.icon === secondCard.icon;

      setTimeout(() => {
        setGameState((prev) => {
          const newCards = prev.cards.map((card) => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return isMatch
                ? { ...card, isMatched: true }
                : { ...card, isFlipped: false };
            }
            return card;
          });

          const newPlayers = isMatch
            ? prev.players.map((player, index) =>
                index === prev.currentPlayerIndex
                  ? {
                      ...player,
                      score: player.score + 1,
                      earnedCards: [...player.earnedCards, firstCard.icon],
                    }
                  : player
              )
            : prev.players;

          const allMatched = newCards.every((card) => card.isMatched);
          if(allMatched)
             playSound("winner")
            else if(isMatch)
              playSound("match")
            
          const winner = allMatched
            ? newPlayers.reduce((prev, current) =>
                current.score > prev.score ? current : prev
              ).name
            : null;

          return {
            ...prev,
            cards: newCards,
            players: newPlayers,
            flippedCards: [],
            isProcessing: false,
            currentPlayerIndex: isMatch
              ? prev.currentPlayerIndex
              : (prev.currentPlayerIndex + 1) % prev.players.length,
            gameStatus: allMatched ? 'ended' : 'playing',
            winner,
          };
        });
      }, 1000);
    }
  }, [gameState.flippedCards, gameState.cards]);

  return {
    gameState,
    settings,
    flipCard,
    resetGame,
    nextPlayer,
  };
};
