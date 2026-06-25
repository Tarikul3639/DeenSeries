"use client";

import {
  Sparkles,
  Layers,
  Tv,
  Info,
  Film,
} from "lucide-react";
import { BackLink } from "@/components/ui/BackLink";
import { MovieDetailSkeleton } from "./MovieDetailSkeleton";

// API
import { useGetMovieByIdQuery } from "@/store/features/movies/movie.api";

export default function MovieDetailClient({ movieId }: {movieId: string;}) {

  /* SINGLE FETCH */
  const { data: movie, isLoading, isError } =
    useGetMovieByIdQuery(movieId);

  /* LOADING */
  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  /* ERROR */
  if (isError || !movie) {
    return <p className="text-center py-20">Movie not found</p>;
  }

  return (
    <main className="min-h-screen bg-muted/50 text-foreground pb-16">

      {/* NAV */}
      <div className="sticky flex items-left top-0 z-50 w-full bg-linear-to-b from-background via-background/80 to-transparent px-4 backdrop-blur-md h-16.5 sm:h-20">
        <div className="w-full mx-auto max-w-6xl flex items-center">
          <BackLink
            href="/movies"
            label="Back"
            hoverLabel="To Movies"
            weight={85}
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-6xl px-4 mt-2 space-y-6">

        {/* PLAYER */}
        <div className="relative w-full aspect-video overflow-hidden bg-black rounded-sm border border-border shadow-md">
          <div
            className="w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: movie.embed }}
          />
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-warning flex items-center gap-1">
                <Film className="h-3 w-3" />
                Now Playing
              </span>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {movie.title}
              </h1>

              <span className="text-xs text-muted-foreground font-medium">
                {movie.duration} • {movie.createdAt?.slice(0, 4)}
              </span>
            </div>

            <div className="h-px bg-muted" />

            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" /> Overview
              </h3>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {movie.description}
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-background border border-border p-5 rounded-sm space-y-4 shadow-2xs">

            <div className="space-y-1">
              <h2 className="text-sm font-bold text-foreground">
                {movie.title}
              </h2>

              <p className="text-[11px] italic text-muted-foreground">
                {movie.tagline || "No tagline available"}
              </p>
            </div>

            <div className="h-px bg-muted" />

            {/* META */}
            <div className="space-y-2 text-[11px]">

              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Rating
                </span>
                <span className="text-warning font-bold">
                  ★ {movie.rating || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Layers className="h-3 w-3" /> Quality
                </span>
                <span className="bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase">
                  {movie.quality}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Tv className="h-3 w-3" /> Release
                </span>
                <span className="text-muted-foreground">
                  {movie.createdAt?.slice(0, 4)}
                </span>
              </div>
            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-1 pt-2">
              {movie.genres?.map((g) => (
                <span
                  key={g}
                  className="bg-muted border border-border px-2 py-0.5 text-[10px]"
                >
                  {g}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}