import { useEffect } from "react";
import { useGameState } from "./useGameState";
import { sleep } from "@/utils/gameUtils";

export default function useBotPlayer() {
  const { gameStatus, settings, currentPlayerIndex, flippedCards,flipCard, players, cards } =
    useGameState();

  const shouldGuessPairs = () => {
    const propability = [false, false, true]; // 66%

    return propability[Math.round(Math.random() * propability.length)];
  };

  useEffect(() => {
    if (settings.mode == "bot" && gameStatus == "playing") {
      const executeBotTurn = async () => {

         // don't execute untill, flippedCards becomes empty
        if(flippedCards.length>=2)
           return

        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.isBot) {
          const availableCards = cards.filter(
            (card) => !card.isMatched && !card.isFlipped
          );

          await sleep(500);
          if (flippedCards.length && shouldGuessPairs()) {
            const flippedCard = cards.find(card=>card.id===flippedCards[0])!
            const pairCard = availableCards.find(card=>card.icon===flippedCard.icon && card.id!==flippedCard.id)!
            flipCard(pairCard.id);
          } else {
            const id =
              availableCards[Math.floor(Math.random() * availableCards.length)]
                .id;
            flipCard(id);
          }
        }
      };

      executeBotTurn();
    }
  }, [settings, cards, currentPlayerIndex, gameStatus, players, flippedCards, flipCard]);
}
