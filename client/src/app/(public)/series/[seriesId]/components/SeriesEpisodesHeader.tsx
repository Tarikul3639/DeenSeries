"use client";

import { Layers } from "lucide-react";

interface SeriesEpisodesHeaderProps {
  totalEpisodes: number;
  season?: string;
}

export function SeriesEpisodesHeader({
  totalEpisodes,
  season = "Season 1",
}: SeriesEpisodesHeaderProps) {
  return (
    <div className="relative flex items-center justify-between py-3">

      {/* gradient divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-border via-border/60 to-transparent" />

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-primary/10 border border-primary/20">
          <Layers className="h-4 w-4 text-primary" />
        </div>

        <div className="flex flex-col leading-tight">
          <h2 className="text-base sm:text-lg font-semibold tracking-tight">
            Episodes
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Full list of available episodes
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-[11px] text-muted-foreground">
          {totalEpisodes} Episodes
        </span>

        <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-sm border border-primary/20">
          {season}
        </span>
      </div>
    </div>
  );
}