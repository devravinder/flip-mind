import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const initialState: ThemeState = {
  theme: "system",
  toggleTheme: () => null,
};

const ThemeContext = createContext<ThemeState>(initialState);

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProps) => {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "light");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme=()=>{
    const newTheme = theme=='dark' ? 'light' : 'dark'
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
  }

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};