"use client";

import { SeriesHeroSkeleton } from "./SeriesHeroSkeleton";
import { SeriesEpisodesHeaderSkeleton } from "./SeriesEpisodesHeaderSkeleton";
import { MovieGridSkeleton as SeriesEpisodesGridSkeleton } from "@/components/ui/MovieGridSkeleton";

export const SeriesDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pb-16 animate-pulse">

      {/* HERO */}
      <SeriesHeroSkeleton />

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-6">

        {/* HEADER */}
        <SeriesEpisodesHeaderSkeleton />

        {/* GRID */}
        <SeriesEpisodesGridSkeleton count={12} />

      </div>
    </div>
  );
};