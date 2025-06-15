import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ThemeType, ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeType;
}

export function ThemeProvider({
  children,
  defaultTheme = "material",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "material" ? "shadcn" : "material"));
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
