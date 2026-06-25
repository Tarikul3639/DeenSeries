"use client";

import { useState } from "react";
import { MovieFilters } from "./MovieFilters";
import { MovieGrid } from "./MovieGrid";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { MovieGridSkeleton } from "@/components/ui/MovieGridSkeleton";

// API Integration
import { useGetMoviesQuery } from "@/store/features/movies/movie.api";
import { Pagination } from "@/components/Pagination";

/**
 * AllMoviesPage Component
 * Renders the aggregated catalog of movies with client-side searching,
 * specialized state screens (loading, empty, error), and pagination triggers.
 */
export default function AllMoviesPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeQuery, setActiveQuery] = useState("");

    const { data, isLoading, isError, error, refetch } =
        useGetMoviesQuery(
            {
                page,
                limit: 12,
                search: activeQuery,
            }
        );

    // console.log("API Response:", { data, isLoading, isError, error });

    return (
        <div className="min-h-screen flex flex-col justify-between py-4 md:py-6 px-2 sm:px-4 bg-muted/50">
            <div className="w-full mx-auto max-w-7xl space-y-6 flex-1 flex flex-col">
                {/* Search & Filter Header bar */}
                <MovieFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={() => {
                        setPage(1); // Reset pagination
                        setActiveQuery(searchQuery);
                    }}
                    onClear={() => {
                        setPage(1); // Reset pagination
                        setSearchQuery("");
                        setActiveQuery("");
                    }}
                />

                {isLoading && (
                    <MovieGridSkeleton count={12} />
                )}

                {isError && !isLoading && (
                    <div className="flex-1 flex items-center justify-center min-h-100">
                        <ErrorState
                            title="Failed to load movies"
                            rawError={error}
                            onRetry={refetch}
                        />
                    </div>
                )}

                {/* GRID */}
                {!isLoading && !isError && (
                    <MovieGrid movies={data?.data || []} />
                )}

                {/* EMPTY */}
                {!isLoading && data && data.data.length === 0 && (
                    <div className="flex-1 flex items-center justify-center min-h-100">
                        <EmptyState
                            onReset={() => {
                                setPage(1);
                                setSearchQuery("");
                                setActiveQuery("");
                            }}
                        />
                    </div>
                )}
            </div>

            {/* PAGINATION */}
            {data && data?.totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={data.totalPages}
                    onPageChange={(newPage) => {
                        setPage(newPage);
                        // window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </div>
    );
}
