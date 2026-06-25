"use client";

import { useTheme, themes } from "./ThemeProvider";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 p-1 backdrop-blur-sm">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          title={t.label}
          aria-label={`Switch to ${t.label} theme`}
          className={`size-6 rounded-full border-2 transition-all duration-200 ${
            theme === t.name
              ? "border-primary scale-110 shadow-sm"
              : "border-border/40 hover:border-border hover:scale-105"
          }`}
          style={{ backgroundColor: t.color }}
        />
      ))}
    </div>
  );
}
