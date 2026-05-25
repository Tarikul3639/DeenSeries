"use client";

import { Layers, Tv } from "lucide-react";

interface SeriesEpisodesHeaderProps {
  totalEpisodes: number;
}

export function SeriesEpisodesHeader({
  totalEpisodes,
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
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            Full list of available episodes
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <Tv className="size-4 -mt-0.5" />
        <span>{totalEpisodes ?? 0} Episodes</span>
      </div>
    </div>
  );
}