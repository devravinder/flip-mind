import { type LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { type Card as CardType } from '@/hooks/useGameState';

interface CardProps {
  card: CardType;
  onFlip: (cardId: number) => void;
  disabled: boolean;
}

const Card = ({ card, onFlip, disabled }: CardProps) => {
  const IconComponent = Icons[card.icon ] as LucideIcon;

  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onFlip(card.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || card.isFlipped || card.isMatched}
      className={`
        relative aspect-square w-16 h-16 p-2 border rounded-lg transition-all duration-300
        ${card.isMatched ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
        ${!disabled && !card.isFlipped && !card.isMatched ? 'hover:scale-105 cursor-pointer' : 'cursor-default'}
      `}
      style={{ perspective: '1000px' }}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-500 transform-style-3d
          ${card.isFlipped ? 'rotate-y-180' : ''}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 w-full h-full bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-lg shadow-lg flex items-center justify-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-8 h-8 bg-white/20 rounded-full" />
        </div>

        <div
          className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center backface-hidden rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {IconComponent && (
            <IconComponent className="w-12 h-12 text-blue-600 dark:text-blue-400" strokeWidth={2} />
          )}
        </div>
      </div>
    </button>
  );
};

export default Card;
