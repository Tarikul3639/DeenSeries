"use client";

import Link from "next/link";
import FeaturedBanner from "./FeaturedBanner";
import { MovieCard, ItemProps } from "@/components/MovieCard";
import { SectionHeader } from "./SectionHeader";

// API
import { useGetSeriesQuery } from "@/store/features/series/series.api";
import { useGetMoviesQuery } from "@/store/features/movies/movie.api";
import { useGetFeaturedQuery } from "@/store/features/home/home.api";

import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const {
    data: seriesData,
    isLoading: seriesLoading,
    isError: isSeriesError,
    error: seriesError,
    refetch: refetchSeries,
  } = useGetSeriesQuery({ page: 1, limit: 12 });

  const {
    data: moviesData,
    isLoading: moviesLoading,
    isError: isMoviesError,
    error: moviesError,
    refetch: refetchMovies,
  } = useGetMoviesQuery({ page: 1, limit: 12 });

  const {
    data: featuredData,
    isLoading: featuredLoading,
    isError: isFeaturedError,
    error: featuredError,
  } = useGetFeaturedQuery();

  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-10 text-center">

        {/* Featured Banner */}
        {featuredLoading && !featuredError && (
          <div className="flex-1 flex flex-col justify-center items-center min-h-100 gap-3">
            <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">
              Loading featured content...
            </p>
          </div>
        )}

        {isFeaturedError && !featuredLoading && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <ErrorState
              title="Failed to load featured content"
              rawError={featuredError}
              onRetry={() => { }}
            />
          </div>
        )}

        {!featuredLoading && featuredData && featuredData.length > 0 && (
          <FeaturedBanner items={featuredData} />
        )}

        {/* Empty State for Featured */}
        {!featuredLoading && !featuredData && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <EmptyState onReset={() => { }} />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-3 sm:space-y-6 pb-10">
        <SectionHeader title="Trending Series" seeAllHref="/series" />

        {seriesLoading && (
          <div className="flex-1 flex flex-col justify-center items-center min-h-100 gap-3">
            <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading ...</p>
          </div>
        )}

        {/* Pass custom paths seamlessly */}
        {isSeriesError && !seriesLoading && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <ErrorState
              title="Failed to load series"
              rawError={seriesError}
              onRetry={refetchSeries}
            />
          </div>
        )}

        {/* Empty State */}
        {!seriesLoading && seriesData && seriesData.data.length === 0 && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <EmptyState onReset={() => { }} />
          </div>
        )}

        {/* Scroll Row */}
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {seriesData?.data?.map((item: ItemProps) => (
            <div key={item._id}>
              <Link href={`/series/${item._id}`} className="select-none group">
                <MovieCard item={item} />
              </Link>
            </div>
          ))}
        </div>

        <SectionHeader title="New Movies" seeAllHref="/movies" />

        {moviesLoading && (
          <div className="flex-1 flex flex-col justify-center items-center min-h-100 gap-3">
            <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading ...</p>
          </div>
        )}

        {isMoviesError && !moviesLoading && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <ErrorState
              title="Failed to load movies"
              rawError={moviesError}
              onRetry={refetchMovies}
            />
          </div>
        )}

        {/* EMPTY Movies */}
        {!moviesLoading && moviesData && moviesData.data.length === 0 && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <EmptyState onReset={() => { }} />
          </div>
        )}

        {/* Scroll Row */}
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {moviesData?.data?.map((item: ItemProps) => (
            <div key={item._id}>
              <Link href={`/movies/${item._id}`} className="select-none group">
                <MovieCard item={item} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
