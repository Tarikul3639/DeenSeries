"use client";

import Link from "next/link";
import FeaturedBanner from "./FeaturedBanner";
import { MovieCard, ItemProps } from "@/components/MovieCard";
import { MovieGridSkeleton } from "../../../components/ui/MovieGridSkeleton";
import { SectionHeader } from "./SectionHeader";

// API
import { useGetSeriesQuery, Series } from "@/store/features/series/series.api";
import { useGetMoviesQuery } from "@/store/features/movies/movie.api";
import { useGetFeaturedQuery } from "@/store/features/home/home.api";

import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { FeaturedBannerSkeleton } from "./FeaturedBannerSkeleton";
import ContinueWatchingBanner from "@/components/ContinueWatchingBanner";

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
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-1 sm:px-4 py-2 sm:py-4 text-center">

        {/* Featured Banner */}
        {featuredLoading && <FeaturedBannerSkeleton />}

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

      {/* Continue Watching Banner */}
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-6">
        <ContinueWatchingBanner />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 space-y-3 sm:space-y-6 pb-10">
        <SectionHeader title="Trending Series" seeAllHref="/series" />

        {seriesLoading && <MovieGridSkeleton count={10} />}

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
          {seriesData?.data?.map((item: Series) => (
            <div key={item._id}>
              <Link href={`/series/${item._id}`} className="select-none group">
                <MovieCard item={item} />
              </Link>
            </div>
          ))}
        </div>

        <SectionHeader title="New Movies" seeAllHref="/movies" />

        {moviesLoading && <MovieGridSkeleton count={10} />}

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
    </div>
  );
}
