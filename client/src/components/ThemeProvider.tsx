"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type ThemeName =
  | "white"
  | "dark"
  | "blue"
  | "green"
  | "purple"
  | "amber"
  | "rose";

export interface ThemeOption {
  name: ThemeName;
  label: string;
  color: string; // CSS color for the swatch
}

export const themes: ThemeOption[] = [
  { name: "white", label: "Light", color: "#ffffff" },
  { name: "dark", label: "Dark", color: "#1a1a1a" },
  { name: "blue", label: "Blue", color: "#2563eb" },
  { name: "green", label: "Green", color: "#16a34a" },
  { name: "purple", label: "Purple", color: "#7c3aed" },
  { name: "amber", label: "Amber", color: "#d97706" },
  { name: "rose", label: "Rose", color: "#e11d48" },
];

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "white",
  setTheme: () => {},
});

const STORAGE_KEY = "deenseries-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("white");

  // On mount, read from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && themes.some((t) => t.name === stored)) {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
