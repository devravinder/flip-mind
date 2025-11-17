import { useEffect } from "react";
import { useGameState } from "./useGameState";
import { sleep } from "@/utils/gameUtils";

export default function useBotPlayer() {
  const { gameStatus, settings, currentPlayerIndex, flippedCardIndices,flipCard, players, cards } =
    useGameState();

  const shouldGuessPairs = () => {
    const propability = [true, false, true]; // 66%

    return propability[Math.round(Math.random() * propability.length)];
  };

  useEffect(() => {
    if (settings.mode == "bot" && gameStatus == "playing") {
      const executeBotTurn = async () => {

         // don't execute untill, flippedCardIndices becomes empty
        if(flippedCardIndices.length>=2)
           return

        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.isBot) {
          const availableCards = cards.filter(
            (card) => !card.isMatched && !card.isFlipped
          );

          await sleep();
          if (flippedCardIndices.length && shouldGuessPairs()) {
            const flippedCard = cards[flippedCardIndices[0]]
            const pairCard = availableCards.find(card=>card.icon===flippedCard.icon && card.id!==flippedCard.id)!
            flipCard(pairCard.id);
          } else {
            const index =
              availableCards[Math.floor(Math.random() * availableCards.length)]
                .id;
            flipCard(index);
          }
        }
      };

      executeBotTurn();
    }
  }, [settings, cards, currentPlayerIndex, gameStatus, players, flippedCardIndices, flipCard]);
}
