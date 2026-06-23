"use client";

export const SeriesEpisodesHeaderSkeleton = () => {
    return (
        <div className="flex items-center justify-between py-3 animate-pulse">

            {/* Left */}
            <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="relative w-8 h-8 rounded-sm bg-zinc-300 overflow-hidden">
                    <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                    <div className="h-4 w-24 rounded-sm bg-zinc-400" />
                    <div className="h-3 w-40 rounded-sm bg-zinc-400" />
                </div>

            </div>

            {/* Right */}
            <div className="h-3 w-20 rounded-sm bg-zinc-500" />

        </div>
    );
};