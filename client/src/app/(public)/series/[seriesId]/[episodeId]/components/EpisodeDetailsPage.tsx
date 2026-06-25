"use client";

import { useState } from "react";
import Link from "next/link";
import { Tv, Star, Calendar, ChevronRight, Layers } from "lucide-react";
import { useGetEpisodeBySeriesQuery, useGetEpisodesBySeriesQuery } from "@/store/features/episodes/episode.api";
import { EpisodeDetailsSkeleton } from "./EpisodeDetailsSkeleton";
import { EpisodeList } from "./EpisodeList";

const getEmbedSrc = (embed: string) => {
  const match = embed.match(/src=["']([^"']+)["']/);
  return match ? match[1] : "";
};

export default function EpisodeDetailsPage({
  seriesId,
  episodeId,
}: {
  seriesId: string;
  episodeId: string;
}) {
  const [isEmbedLoading, setIsEmbedLoading] = useState(true);

  const { data: episodeData, isLoading: isEpisodeLoading } = useGetEpisodeBySeriesQuery({
    seriesId,
    episodeId,
  });

  const { data: allEpisodesData, isLoading: isListLoading } = useGetEpisodesBySeriesQuery(seriesId);

  if (isEpisodeLoading || isListLoading) return <EpisodeDetailsSkeleton />;

  if (!episodeData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-xs font-medium text-muted-foreground tracking-tight">
        Episode not found
      </div>
    );
  }

  const { episode, series } = episodeData;
  const allEpisodes = allEpisodesData?.episode || [];

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-450 px-4 pt-4 pb-16 sm:px-6 lg:flex lg:items-start lg:gap-6">

        {/* LEFT COLUMN — Player + Info */}
        <div className="min-w-0 flex-1 space-y-4">

          {/* ── Video Player ─────────────────────────── */}
          <div
            className="relative w-full overflow-hidden rounded-xl bg-black shadow-xl ring-1 ring-border/20"
            style={{ aspectRatio: "16/9" }}
          >
            {isEmbedLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-border border-t-primary" />
                <p className="text-[11px] text-muted-foreground">Loading video...</p>
              </div>
            )}
            <iframe
              src={getEmbedSrc(episode.embed)}
              className="h-full w-full border-0"
              allowFullScreen
              onLoad={() => setIsEmbedLoading(false)}
            />
          </div>

          {/* ── Episode Title ─────────────────────────── */}
          <h1 className="text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl">
            {episode.title}
          </h1>

          {/* ── Meta Row ──────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">{series.title}</span>
            <span className="flex items-center gap-1">
              <Tv className="size-3.5" />
              Episode {episode.episodeNumber}
            </span>
            {episode.releaseDate && (
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {episode.releaseDate}
              </span>
            )}
            {episode.rating && (
              <span className="flex items-center gap-1">
                <Star className="size-3.5 text-warning" />
                {episode.rating}
              </span>
            )}
          </div>

          {/* ── Divider ───────────────────────────────── */}
          <div className="h-px bg-border/60" />

          {/* ── Description ── */}
          {(episode.description || series.description) && (
            <div className="rounded-xl bg-muted/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
                  <Layers className="size-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground leading-none">{series.title}</p>
                  {series.tagline && (
                    <p className="mt-0.5 text-[10px] italic text-muted-foreground">"{series.tagline}"</p>
                  )}
                </div>
              </div>

              {series.genres && series.genres.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {series.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-sm text-muted-foreground leading-relaxed">
                {episode.description || series.description}
              </div>
            </div>
          )}

          {/* ── Mobile Episode List ───────────────────── */}
          {allEpisodes.length > 0 && (
            <div className="lg:hidden space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">All Episodes</h3>
                <span className="text-xs text-muted-foreground">{allEpisodes.length} episodes</span>
              </div>
              <div className="max-h-80 overflow-y-auto rounded-xl border border-border bg-background p-2">
                <EpisodeList
                  episodes={allEpisodes}
                  seriesId={seriesId}
                  currentEpisodeId={episodeId}
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR — Desktop only */}
        {allEpisodes.length > 0 && (
          <aside className="hidden lg:block lg:w-95 xl:w-100 shrink-0">
            <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{series.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{allEpisodes.length} Episodes</p>
                </div>
                <Link
                  href={`/series/${seriesId}`}
                  className="flex items-center gap-0.5 text-xs text-primary hover:underline shrink-0"
                >
                  See all <ChevronRight className="size-3" />
                </Link>
              </div>

              {/* Scrollable episode list */}
              <div className="overflow-y-auto p-2 max-h-[calc(100vh-5rem)]">
                <EpisodeList
                  episodes={allEpisodes}
                  seriesId={seriesId}
                  currentEpisodeId={episodeId}
                />
              </div>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}