"use client";

import { SeriesHero } from "./SeriesHero";
import { SeriesEpisodesHeader } from "./SeriesEpisodesHeader";
import { SeriesEpisodesGrid } from "./SeriesEpisodesGrid";

import { useGetEpisodesBySeriesQuery } from "@/store/features/episodes/episode.api";
import { ErrorState } from "@/components/ErrorState";
import { Loader2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export default function SeriesDetailsPage({ seriesId }: { seriesId: string }) {
  const { data, isLoading, isError, error, refetch } =
    useGetEpisodesBySeriesQuery(seriesId);

  /* EXTRACT DATA */
  const episodes = data?.episode || [];
  const series = data?.series;

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      {isLoading && (
        <div className="flex-1 flex flex-col justify-center items-center min-h-100 gap-3">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading ...</p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="flex-1 flex items-center justify-center min-h-100">
          <ErrorState
            title="Failed to load episodes"
            rawError={error}
            onRetry={refetch}
          />
        </div>
      )}

      {/* EMPTY */}
      {!isLoading && !isError && episodes && episodes.length === 0 && (
        <div className="flex-1 flex items-center justify-center min-h-100">
          <EmptyState onReset={() => {}} />
        </div>
      )}
      {!isLoading && !isError && series && (
        <>
          <SeriesHero
            currentSeries={series}
            firstEpisodeId={episodes[0]?._id}
          />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
            <SeriesEpisodesHeader
              totalEpisodes={series?.totalEpisodes || 0}
              season={series?.title || "1"}
            />

            <div className="group-wrapper">
              <SeriesEpisodesGrid episodes={episodes} seriesId={seriesId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
