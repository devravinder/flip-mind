import { Settings, X, Users, Grid3x3, Gamepad2 } from 'lucide-react';
import { useState } from 'react';
import { type GameSettings as GameSettingsType } from '@/types/game';

interface GameSettingsProps {
  settings: GameSettingsType;
  onSettingsChange: (settings: Partial<GameSettingsType>) => void;
  onRestart: () => void;
}

const GameSettings = ({ settings, onSettingsChange, onRestart }: GameSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onRestart();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors z-10"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Game Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Gamepad2 className="w-4 h-4" />
                  Game Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSettingsChange({ mode: 'bot', playerCount: 2 })}
                    className={`
                      p-3 rounded-lg border-2 font-medium transition-all
                      ${
                        settings.mode === 'bot'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                      }
                    `}
                  >
                    vs Bot
                  </button>
                  <button
                    onClick={() => onSettingsChange({ mode: 'friend' })}
                    className={`
                      p-3 rounded-lg border-2 font-medium transition-all
                      ${
                        settings.mode === 'friend'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                      }
                    `}
                  >
                    vs Friend
                  </button>
                </div>
              </div>

              {settings.mode === 'friend' && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4" />
                    Number of Players
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={settings.playerCount}
                    onChange={(e) =>
                      onSettingsChange({ playerCount: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span>2</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {settings.playerCount}
                    </span>
                    <span>20</span>
                  </div>
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Grid3x3 className="w-4 h-4" />
                  Number of Cards
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="2"
                  value={settings.cardCount}
                  onChange={(e) =>
                    onSettingsChange({ cardCount: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>20</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {settings.cardCount}
                  </span>
                  <span>100</span>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Apply & Restart Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameSettings;
