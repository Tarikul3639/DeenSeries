"use client";

import Link from "next/link";
import { ArrowLeft, Play, Tv, Sparkles, Layers, Info } from "lucide-react";
import { useGetEpisodeBySeriesQuery } from "@/store/features/episodes/episode.api"


export default function EpisodeDetailsPage({ seriesId, episodeId }: { seriesId: string; episodeId: string }) {
    const { data, isLoading, isError, error, refetch } = useGetEpisodeBySeriesQuery({ seriesId, episodeId })

    if (!data) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center font-medium text-zinc-400 tracking-tight text-xs">
                Episode not found
            </div>
        );
    }

    if (isLoading && !data) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center font-medium text-zinc-400 tracking-tight text-xs">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50/50 text-zinc-800 pb-16">

            {/* 🔝 LIGHT ACCENT STICKY NAVIGATION */}
            <div className="sticky flex items-left top-0 z-50 w-full bg-linear-to-b from-white via-white/80 to-transparent px-4 backdrop-blur-md h-16.5 sm:h-20">
                <div className="w-full mx-auto max-w-6xl flex items-center">
                    <Link
                        href={`/series/${data.series._id}`}
                        className="group inline-flex items-center gap-2.5 py-2 text-base font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
                    >
                        <ArrowLeft className="h-5 w-5 transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) group-hover:-translate-x-1" />

                        <span className="relative flex w-20 sm:w-24 overflow-hidden py-0.5">
                            {/* Sliding Modern Text Mask Layer */}
                            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-32 text-zinc-500">
                                Back
                            </span>
                            <span className="absolute inset-0 inline-block -translate-x-full font-semibold whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-0 text-zinc-900">
                                To Series
                            </span>
                        </span>
                    </Link>
                </div>
            </div>

            {/* MAIN STREAMING GRID CONTAINER */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-1 space-y-6">

                {/* THEATER PLAYER CONTAINER */}
                <div className="relative w-full aspect-video overflow-hidden bg-black rounded-sm border border-zinc-200 shadow-md">
                    <div
                        className="absolute inset-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_iframe]:rounded-sm"
                        dangerouslySetInnerHTML={{ __html: data.episode.embed }}
                    />
                </div>

                {/* 📋 ASYMMETRICAL DETAILS VIEW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">

                    {/* LEFT AREA: CURRENT EPISODE SYNOPSIS (2 Columns) */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 block">
                                Now Playing
                            </span>
                            <h1 className="text-xl font-bold tracking-tight sm:text-2xl text-zinc-900">
                                {data.episode.title}
                            </h1>
                            <span className="text-xs font-semibold text-zinc-400 block">
                                {data.series.title} • Season 1
                            </span>
                        </div>

                        <div className="h-px bg-zinc-200 w-full" />

                        <div className="space-y-2">
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                                <Info className="h-3 w-3" /> Episode Overview
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
                                {data.episode.description} Watch this episode in an immersive, distraction-free environment optimized for high-fidelity audio and video playback.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT AREA: SOFT LIGHT CARD DIRECTORY (1 Column) */}
                    <div className="md:col-span-1 bg-white border border-zinc-200 p-5 rounded-sm space-y-4 shadow-2xs self-start">
                        <div className="space-y-1">
                            <h2 className="text-sm font-bold text-zinc-900 tracking-tight">
                                {data.series.title}
                            </h2>
                            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed italic">
                                "{data.series.tagline}"
                            </p>
                        </div>

                        <p className="text-[11px] text-zinc-600 leading-relaxed">
                            {data.series.description}
                        </p>

                        <div className="h-px bg-zinc-100" />

                        {/* PLATFORM SPECS & METADATA BADGES */}
                        <div className="space-y-2.5 pt-1">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-zinc-400 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Rating</span>
                                <span className="text-amber-600 font-bold">★ {data.episode.rating}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-zinc-400 flex items-center gap-1"><Layers className="h-3 w-3" /> Stream</span>
                                <span className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 text-[9px] font-bold text-zinc-700 rounded-xs uppercase tracking-wide">
                                    {data.episode.quality}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-zinc-400 flex items-center gap-1"><Tv className="h-3 w-3" /> Release</span>
                                <span className="text-zinc-600 font-medium">{data.episode.releaseDate}</span>
                            </div>
                        </div>

                        {/* GENRE LABELS */}
                        <div className="flex flex-wrap gap-1 pt-1">
                            {data.series.genres?.map((genre) => (
                                <span
                                    key={genre}
                                    className="rounded-xs bg-zinc-50 border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
}