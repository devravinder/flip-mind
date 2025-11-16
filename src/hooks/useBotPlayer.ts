import { useEffect, useRef } from 'react';
import { type GameState } from '@/types/game';

interface BotMemory {
  [cardId: string]: string;
}

export const useBotPlayer = (
  gameState: GameState,
  flipCard: (cardId: string) => void
) => {
  const botMemoryRef = useRef<BotMemory>({});
  const isExecutingRef = useRef(false);

  useEffect(() => {
    gameState.cards.forEach((card) => {
      if (card.isFlipped && !card.isMatched) {
        botMemoryRef.current[card.id] = card.icon;
      }
    });
  }, [gameState.cards]);

  useEffect(() => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];

    if (
      !currentPlayer?.isBot ||
      gameState.isProcessing ||
      gameState.gameStatus !== 'playing' ||
      isExecutingRef.current
    ) {
      return;
    }

    isExecutingRef.current = true;

    const executeBotTurn = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const availableCards = gameState.cards.filter(
        (card) => !card.isFlipped && !card.isMatched
      );

      if (availableCards.length === 0) {
        isExecutingRef.current = false;
        return;
      }

      const knownPairs: { card1: string; card2: string }[] = [];
      const knownCards = Object.entries(botMemoryRef.current);

      for (let i = 0; i < knownCards.length; i++) {
        for (let j = i + 1; j < knownCards.length; j++) {
          if (knownCards[i][1] === knownCards[j][1]) {
            const card1 = gameState.cards.find((c) => c.id === knownCards[i][0]);
            const card2 = gameState.cards.find((c) => c.id === knownCards[j][0]);

            if (card1 && card2 && !card1.isMatched && !card2.isMatched) {
              knownPairs.push({ card1: knownCards[i][0], card2: knownCards[j][0] });
            }
          }
        }
      }

      let firstCardId: string;
      let secondCardId: string;

      if (knownPairs.length > 0 && Math.random() > 0.3) {
        const pair = knownPairs[Math.floor(Math.random() * knownPairs.length)];
        firstCardId = pair.card1;
        secondCardId = pair.card2;
      } else {
        const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
        firstCardId = shuffled[0].id;
        secondCardId = shuffled[1]?.id || shuffled[0].id;
      }

      flipCard(firstCardId);

      await new Promise((resolve) => setTimeout(resolve, 600));

      if (firstCardId !== secondCardId) {
        flipCard(secondCardId);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
      isExecutingRef.current = false;
    };

    executeBotTurn();
  }, [
    gameState.currentPlayerIndex,
    gameState.players,
    gameState.isProcessing,
    gameState.gameStatus,
    gameState.cards,
    flipCard,
  ]);
};
