import { type Player } from '@/types/game';
import PlayerPanel from './PlayerPanel';
import { userColors } from '@/utils/gameUtils';

interface ScoreBoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

const ScoreBoard = ({ players, currentPlayerIndex }: ScoreBoardProps) => {
  return (
    <div className="max-w-4xl w-sm md:w-full mx-auto p-2">
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {players.map((player, index) => (
          <PlayerPanel
            key={player.id}
            player={player}
            isActive={index === currentPlayerIndex}
            bg={userColors[index % players.length].backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;
