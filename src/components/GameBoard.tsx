import { type Card as CardType } from '@/types/game';
import Card from './Card';
import { boardWidth } from '@/utils/gameUtils';

interface GameBoardProps {
  cards: CardType[];
  onCardFlip: (cardId: string) => void;
  disabled: boolean;
}

const GameBoard = ({ cards, onCardFlip, disabled }: GameBoardProps) => {

  const width = boardWidth(cards.length)
  return (
    <div className={`mx-auto p-2 min-w-sm ${width} max-w-3xl border rounded-lg`}>
      <div className={`flex flex-row flex-wrap gap-2 md:gap-4 justify-center`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onFlip={onCardFlip}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
