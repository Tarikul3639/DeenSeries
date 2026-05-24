"use client";

import { useState, useMemo } from "react";
import { MovieFilters } from "./MovieFilters";
import { MovieGrid } from "./MovieGrid";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { ArrowRight, Loader2 } from "lucide-react";

// API Integration
import { useGetMoviesQuery } from "@/store/features/movies/movie.api";

/**
 * AllMoviesPage Component
 * Renders the aggregated catalog of movies with client-side searching,
 * specialized state screens (loading, empty, error), and pagination triggers.
 */
export default function AllMoviesPage() {
    // 1. Server Data Retrieval
    const { data, isLoading, isError, error, refetch } = useGetMoviesQuery();
    console.log(data);
    // 2. Local State Management for Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [activeQuery, setActiveQuery] = useState("");

    /**
     * 3. Domain Model Transformation
     * Map database payload model into standardized client UI model structure.
     */
    const movies = useMemo(() => {
        if (!data) return [];

        return data.map((movie) => ({
            id: movie._id,
            title: movie.title,
            description: movie.description,
            poster: "https://via.placeholder.com/300x400", // Fallback static resource
            quality: movie.quality,
            rating: "N/A",
            releaseDate: movie.createdAt ? movie.createdAt.slice(0, 4) : "N/A",
        }));
    }, [data]);

    /**
     * 4. Client Side Filter Core
     * Dynamically filters normalized dataset based on confirmed search tokens.
     */
    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            const matchesSearch =
                movie.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
                movie.description?.toLowerCase().includes(activeQuery.toLowerCase());

            return matchesSearch;
        });
    }, [movies, activeQuery]);

    // 5. Actions & Event Handlers
    const handleSearch = () => {
        setActiveQuery(searchQuery);
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setActiveQuery("");
    };

    // 6. Evaluated Flags for Layout Render Machine
    const hasData = filteredMovies.length > 0;
    const isFeedEmpty = !isLoading && !isError && filteredMovies.length === 0;

    return (
        <div className="min-h-screen flex flex-col justify-between py-8 px-4 bg-slate-50/50">
            <div className="w-full mx-auto max-w-7xl space-y-6 flex-1 flex flex-col">
                {/* Search & Filter Header bar */}
                <MovieFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                />

                {/* --- STATE DISPLAY CONTROL LAYER --- */}

                {/* Scenario A: Request Active & Loading */}
                {isLoading && (
                    <div className="flex-1 flex flex-col justify-center items-center min-h-100 gap-3">
                        <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
                        <p className="text-sm font-medium text-slate-500">Loading master catalog...</p>
                    </div>
                )}

                {/* Scenario B: Server Request Error Fallback */}
                {isError && !isLoading && (
                    <div className="flex-1 flex items-center justify-center min-h-100">
                        <ErrorState
                            title="Failed to load movies"
                            rawError={error}
                            onRetry={refetch}
                        />
                    </div>
                )}

                {/* Scenario C: Active Feed Render */}
                {hasData && !isLoading && <MovieGrid movies={filteredMovies} />}

                {/* Scenario D: Complete Clean Output With Zero Records Matches */}
                {isFeedEmpty && (
                    <div className="flex-1 flex items-center justify-center min-h-100">
                        <EmptyState onReset={handleResetFilters} />
                    </div>
                )}
            </div>

            {/* Pagination Controls Layer */}
            {hasData && !isLoading && (
                <div className="pt-8 flex justify-center shrink-0">
                    <button className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-850 active:scale-[0.98] cursor-pointer">
                        Load More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            )}
        </div>
    );
}