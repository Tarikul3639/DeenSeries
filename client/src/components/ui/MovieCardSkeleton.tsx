// components/ui/MovieCardSkeleton.tsx
"use client";

export const MovieCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 animate-pulse">

            {/* Poster Skeleton */}
            <div className="aspect-4/5 w-full rounded-sm bg-zinc-300 relative overflow-hidden">

                {/* shimmer */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
                </div>

                {/* subtle overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-700/20 via-transparent to-transparent" />
            </div>

            {/* Text Skeleton */}
            <div className="space-y-2">
                <div className="h-3 w-3/4 rounded-sm bg-zinc-400" />
                <div className="h-3 w-1/2 rounded-sm bg-zinc-400" />
                <div className="h-3 w-1/3 rounded-sm bg-zinc-500" />
            </div>

        </div>
    );
};