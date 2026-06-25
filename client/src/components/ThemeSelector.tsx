"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme, accents } from "./ThemeProvider";
import { Palette, Sun, Moon, Check, X } from "lucide-react";

export default function ThemeSelector() {
  const { mode, accent, setMode, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-foreground transition hover:bg-muted"
        aria-label="Theme settings"
        title="Theme settings"
      >
        <Palette className="size-5" />
      </button>

      {/* Dialog — rendered in document.body via portal */}
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div ref={ref} className="relative w-72 rounded-2xl border border-border bg-popover p-5 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Title */}
            <p className="mb-4 text-sm font-semibold text-foreground">Appearance</p>

            {/* Mode toggle */}
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Mode
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("light")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    mode === "light"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Sun className="size-4" />
                  Light
                </button>
                <button
                  onClick={() => setMode("dark")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    mode === "dark"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Moon className="size-4" />
                  Dark
                </button>
              </div>
            </div>

            {/* Accent colors */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Accent
              </p>
              <div className="flex flex-wrap gap-2">
                {accents.map((a) => (
                  <button
                    key={a.name}
                    onClick={() => setAccent(a.name)}
                    title={a.label}
                    aria-label={`Set accent to ${a.label}`}
                    className={`relative flex size-8 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      accent === a.name
                        ? "border-foreground scale-110 shadow-sm"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: a.color }}
                  >
                    {accent === a.name && (
                      <Check className="size-3.5 text-white drop-shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}