import type { Theme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 left-4 p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg shadow-lg transition-colors z-10"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;
