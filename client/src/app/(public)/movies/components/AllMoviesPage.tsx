"use client";

import { useState, useMemo } from "react";
import { ItemProps } from "@/components/MovieCard";
import { MovieFilters } from "./MovieFilters";
import { MovieGrid } from "./MovieGrid";
import { EmptyState } from "@/components/EmptyState";
import { ArrowRight } from "lucide-react";

// 📌 DEMO DATA same
const DEMO_MOVIES: ItemProps[] = [
    {
        id: "gilani",
        title: "Gilani Series",
        description: "The spiritual journey...",
        episodes: 24,
        poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        quality: "HD",
        rating: "9.8",
        releaseDate: "2025",
    },
    {
        id: "salahuddin",
        title: "Salahuddin Ayyubi",
        description: "The legendary...",
        episodes: 30,
        poster: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
        quality: "4K",
        rating: "9.6",
        releaseDate: "2024",
    },
    {
        id: "ertugrul",
        title: "Dirilis Ertugrul",
        description: "The heroic story...",
        episodes: 150,
        poster: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        quality: "HD",
        rating: "9.5",
        releaseDate: "2014",
    },
    {
        id: "omar",
        title: "Omar Series",
        description: "The monumental...",
        episodes: 31,
        poster: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
        quality: "HD",
        rating: "9.9",
        releaseDate: "2012",
    },
    {
        id: "payitaht",
        title: "Payitaht Abdulhamid",
        description: "The struggle of...",
        episodes: 154,
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
        quality: "HD",
        rating: "8.9",
        releaseDate: "2017",
    },
    {
        id: "kurulus-osman",
        title: "Kurulus Osman",
        description: "The epic foundation...",
        episodes: 120,
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
        quality: "4K",
        rating: "9.2",
        releaseDate: "2019",
    },
    {
        id: "ibn-battuta",
        title: "The Journey of Ibn Battuta",
        description: "Following the...",
        poster: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        quality: "BlueRay",
        rating: "8.7",
        releaseDate: "2023",
    },
    {
        id: "andalus",
        title: "Fath Al-Andalus",
        description: "The historical...",
        episodes: 30,
        poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        quality: "HD",
        rating: "9.0",
        releaseDate: "2022",
    },
];

export default function AllMoviesPage() {
    const [searchQuery, setSearchQuery] = useState(""); // input typing
    const [activeQuery, setActiveQuery] = useState(""); // actual search

    // 🔍 FILTER ONLY ON activeQuery
    const filteredMovies = useMemo(() => {
        return DEMO_MOVIES.filter((movie) => {
            const matchesSearch =
                movie.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
                movie.description?.toLowerCase().includes(activeQuery.toLowerCase());

            return matchesSearch;
        });
    }, [activeQuery]);

    // 🔍 trigger search
    const handleSearch = () => {
        setActiveQuery(searchQuery);
    };

    const handleResetFilters = () => {
        setSearchQuery("");
        setActiveQuery("");
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* FILTERS */}
                <MovieFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                />

                {/* CONTENT */}
                {filteredMovies.length > 0 ? (
                    <MovieGrid movies={filteredMovies} />
                ) : (
                    <EmptyState onReset={handleResetFilters} />
                )}

                {/* LOAD MORE */}
                {filteredMovies.length > 0 && (
                    <div className="pt-8 flex justify-center">
                        <button className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
                            Load More
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}