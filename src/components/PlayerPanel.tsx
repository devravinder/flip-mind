import { Bot, User } from "lucide-react";
import { type Player } from "@/hooks/useGameState";

interface PlayerPanelProps {
  player: Player;
  isActive: boolean;
  bg: string;
}

const Pulse = () => (
  <span className="absolute flex size-3 top-0 right-0 -translate-y-[50%] translate-x-[50%]">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 dark:bg-white opacity-75"></span>
    <span className="relative inline-flex size-3 rounded-full bg-blue-400 dark:bg-white"></span>
  </span>
);
const PlayerPanel = ({ player, isActive, bg }: PlayerPanelProps) => {
  return (
    <div className={`relative rounded-lg text-white p-2 ${bg}`}>
      {isActive && <Pulse />}
      <div className="flex items-center gap-2">
        {player.isBot ? (
          <Bot className="w-5 h-5" />
        ) : (
          <User className="w-5 h-5 " />
        )}{" "}
        :<h3 className="font-semibold ">{player.score}</h3>
      </div>
    </div>
  );
};

export default PlayerPanel;
