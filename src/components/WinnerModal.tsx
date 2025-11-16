import { Trophy, RotateCcw } from 'lucide-react';

interface WinnerModalProps {
  winner: string;
  onRestart: () => void;
}

const WinnerModal = ({ winner, onRestart }: WinnerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Game Over!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {winner}
            </span>{' '}
            wins!
          </p>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
