"use client";

import { useState } from "react";
import { Tv, Sparkles, Layers, Info } from "lucide-react";
import { BackLink } from "@/components/ui/BackLink";
import { useGetEpisodeBySeriesQuery } from "@/store/features/episodes/episode.api";
import { EpisodeDetailsSkeleton } from "./EpisodeDetailsSkeleton";

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

    const { data, isLoading } = useGetEpisodeBySeriesQuery({
        seriesId,
        episodeId,
    });

    if (isLoading) return <EpisodeDetailsSkeleton />;

    if (!data) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center font-medium text-zinc-400 tracking-tight text-xs">
                Episode not found
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50/50 text-zinc-800 pb-16">
            {/* Sticky Navigation */}
            <div className="sticky flex items-left top-0 z-50 w-full bg-linear-to-b from-white via-white/80 to-transparent px-4 backdrop-blur-md h-16.5 sm:h-20">
                <div className="w-full mx-auto max-w-6xl flex items-center">
                    <BackLink
                        href={`/series/${seriesId}`}
                        label="Back"
                        hoverLabel="To Series"
                        weight={80}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-1 space-y-6">
                {/* YouTube-style: Video + Sidebar side by side on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">

                    {/* Left: Video Player (takes 2 cols) */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Theater Player */}
                        <div className="-mx-4.5 sm:mx-0 w-auto relative aspect-video overflow-hidden bg-black rounded-sm border border-zinc-200 shadow-md">
                            {isEmbedLoading && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
                                        <p className="text-xs text-zinc-300">Loading video...</p>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={getEmbedSrc(data.episode.embed)}
                                className="w-full h-full rounded-sm border-0"
                                allowFullScreen
                                onLoad={() => setIsEmbedLoading(false)}
                            />
                        </div>

                        {/* Title (hidden on mobile, shown here on md+) */}
                        <div className="hidden md:block space-y-1">
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

                        {/* Synopsis */}
                        <div className="space-y-2">
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                                <Info className="h-3 w-3" />
                                Episode Overview
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
                                {data.episode.description} Watch this episode in an immersive,
                                distraction-free environment optimized for high-fidelity audio
                                and video playback.
                            </p>
                        </div>
                    </div>

                    {/* Right: Directory Card (1 col, sticky) */}
                    <div className="md:col-span-1 md:sticky md:top-24 bg-white border border-zinc-200 p-5 rounded-sm space-y-4 shadow-2xs self-start">
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

                        {/* Metadata Badges */}
                        <div className="space-y-2.5 pt-1">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-zinc-400 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" /> Rating
                                </span>
                                <span className="text-amber-600 font-bold">
                                    ★ {data.episode.rating}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-zinc-400 flex items-center gap-1">
                                    <Layers className="h-3 w-3" /> Stream
                                </span>
                                <span className="bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 text-[9px] font-bold text-zinc-700 rounded-xs uppercase tracking-wide">
                                    {data.episode.quality}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-zinc-400 flex items-center gap-1">
                                    <Tv className="h-3 w-3" /> Release
                                </span>
                                <span className="text-zinc-600 font-medium">
                                    {data.episode.releaseDate}
                                </span>
                            </div>
                        </div>

                        {/* Genre Labels */}
                        <div className="flex flex-wrap gap-1 pt-1">
                            {data.series.genres?.map((genre: string) => (
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