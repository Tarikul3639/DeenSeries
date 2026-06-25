"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ──────────────────────────────────────────────
export type Mode = "light" | "dark";
export type Accent = "blue" | "green" | "purple" | "amber" | "rose";

export interface AccentOption {
  name: Accent;
  label: string;
  color: string; // CSS color for the swatch
}

export const accents: AccentOption[] = [
  { name: "blue", label: "Blue", color: "#2563eb" },
  { name: "green", label: "Green", color: "#16a34a" },
  { name: "purple", label: "Purple", color: "#7c3aed" },
  { name: "amber", label: "Amber", color: "#d97706" },
  { name: "rose", label: "Rose", color: "#e11d48" },
];

// ─── Context ────────────────────────────────────────────
interface ThemeContextValue {
  mode: Mode;
  accent: Accent;
  setMode: (mode: Mode) => void;
  setAccent: (accent: Accent) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  accent: "blue",
  setMode: () => {},
  setAccent: () => {},
});

const MODE_KEY = "deenseries-mode";
const ACCENT_KEY = "deenseries-accent";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("light");
  const [accent, setAccentState] = useState<Accent>("blue");

  // On mount, read from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem(MODE_KEY) as Mode | null;
    const storedAccent = localStorage.getItem(ACCENT_KEY) as Accent | null;

    if (storedMode === "light" || storedMode === "dark") {
      setModeState(storedMode);
      document.documentElement.setAttribute("data-mode", storedMode);
    }
    if (
      storedAccent &&
      accents.some((a) => a.name === storedAccent)
    ) {
      setAccentState(storedAccent);
      document.documentElement.setAttribute("data-accent", storedAccent);
    }
  }, []);

  const setMode = useCallback((newMode: Mode) => {
    setModeState(newMode);
    document.documentElement.setAttribute("data-mode", newMode);
    localStorage.setItem(MODE_KEY, newMode);
  }, []);

  const setAccent = useCallback((newAccent: Accent) => {
    setAccentState(newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
    localStorage.setItem(ACCENT_KEY, newAccent);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
