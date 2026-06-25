"use client";

export const SeriesEpisodesHeaderSkeleton = () => {
    return (
        <div className="flex items-center justify-between py-3 animate-pulse">

            {/* Left */}
            <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="relative w-8 h-8 rounded-sm bg-muted overflow-hidden">
                    <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-foreground/8 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
                </div>

                {/* Text */}
                <div className="space-y-1.5">
                    <div className="h-4 w-24 rounded-sm bg-muted-foreground/15" />
                    <div className="h-3 w-40 rounded-sm bg-muted-foreground/10" />
                </div>

            </div>

            {/* Right */}
            <div className="h-3 w-20 rounded-sm bg-muted-foreground/10" />

        </div>
    );
};