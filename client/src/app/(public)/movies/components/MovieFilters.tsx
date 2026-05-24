"use client";

import { Search, X } from "lucide-react";

interface MovieFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export function MovieFilters({
  searchQuery,
  setSearchQuery,
  onSearch,
}: MovieFiltersProps) {
  return (
    <div className="space-y-6">
      {/* HEADER SECTION & CONTROLS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-5 transaction-colors duration-300">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
            All Movies
          </h1>
          <p className="text-sm text-muted-foreground mt-1 sm:line-clamp-1">
            Explore our collection of meaningful Islamic movies, carefully curated for a distraction-free viewing experience.
          </p>
        </div>

        {/* 🔍 SEARCH CONTROL */}
        <div className="group relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transaction-colors duration-300" />

          <input
            type="text"
            placeholder="Search movies or series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="w-full rounded-sm border border-input bg-background pl-9 pr-24 py-2.5 sm:py-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary transaction-colors duration-300 focus:ring-2 focus:ring-primary/50 focus-within:ring-2 focus-within:ring-primary/50"
          />

          {/* CLEAR BUTTON */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-20 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4.5 sm:size-5" />
            </button>
          )}

          {/* SEARCH BUTTON */}
          <button
            onClick={onSearch}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-medium rounded-sm bg-primary text-primary-foreground hover:opacity-90 transition active:scale-98"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}