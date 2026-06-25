"use client";

import { useState } from "react";
import Link from "next/link";
import { Tv, Sparkles, Layers, Info, Star, Calendar, ChevronRight } from "lucide-react";
import { BackLink } from "@/components/ui/BackLink";
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

  // Fetch current episode details
  const { data: episodeData, isLoading: isEpisodeLoading } = useGetEpisodeBySeriesQuery({
    seriesId,
    episodeId,
  });

  // Fetch all episodes for sidebar/list
  const { data: allEpisodesData, isLoading: isListLoading } = useGetEpisodesBySeriesQuery(seriesId);

  if (isEpisodeLoading || isListLoading) return <EpisodeDetailsSkeleton />;

  if (!episodeData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center font-medium text-muted-foreground tracking-tight text-xs">
        Episode not found
      </div>
    );
  }

  const { episode, series } = episodeData;
  const allEpisodes = allEpisodesData?.episode || [];

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <BackLink
            href={`/series/${seriesId}`}
            label="Back"
            hoverLabel="To Series"
            className="text-sm sm:text-base"
            weight={300}
          />
          <span className="text-xs text-muted-foreground font-medium truncate max-w-[200px] sm:max-w-none">
            {series.title}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ═══════════════════════════════════════
              LEFT: Player + Details (2 cols on desktop)
              ═══════════════════════════════════════ */}
          <div className="lg:col-span-2 space-y-5">

            {/* Video Player */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg ring-1 ring-border/20">
              {isEmbedLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />
                    <p className="text-xs text-muted-foreground">Loading video...</p>
                  </div>
                </div>
              )}
              <iframe
                src={getEmbedSrc(episode.embed)}
                className="h-full w-full border-0"
                allowFullScreen
                onLoad={() => setIsEmbedLoading(false)}
              />
            </div>

            {/* Episode Title & Meta */}
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-foreground">
                {episode.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="font-medium text-primary">
                  {series.title}
                </span>
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
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Description */}
            {episode.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">About this episode</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {episode.description}
                </p>
              </div>
            )}

            {/* Series Info Card */}
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
                  <Layers className="size-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{series.title}</h3>
                  {series.tagline && (
                    <p className="text-[11px] text-muted-foreground italic">"{series.tagline}"</p>
                  )}
                </div>
              </div>
              {series.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {series.description}
                </p>
              )}
              {series.genres && series.genres.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
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
            </div>

            {/* ═══════════════════════════════════════
                Mobile-only: Episode List (below player)
                ═══════════════════════════════════════ */}
            {allEpisodes.length > 0 && (
              <div className="lg:hidden space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    All Episodes
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {allEpisodes.length} episodes
                  </span>
                </div>
                <div className="rounded-lg border border-border bg-background p-2 max-h-80 overflow-y-auto">
                  <EpisodeList
                    episodes={allEpisodes}
                    seriesId={seriesId}
                    currentEpisodeId={episodeId}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════
              RIGHT: Episode Sidebar (desktop only)
              ═══════════════════════════════════════ */}
          {allEpisodes.length > 0 && (
            <div className="hidden lg:block lg:sticky lg:top-20 self-start space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Up Next
                </h3>
                <Link
                  href={`/series/${seriesId}`}
                  className="flex items-center gap-0.5 text-xs text-primary hover:underline"
                >
                  See all <ChevronRight className="size-3" />
                </Link>
              </div>
              <div className="rounded-lg border border-border bg-muted/20 p-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
                <EpisodeList
                  episodes={allEpisodes}
                  seriesId={seriesId}
                  currentEpisodeId={episodeId}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
