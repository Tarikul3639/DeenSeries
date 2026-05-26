"use client";

export const FeaturedBannerSkeleton = () => {
    return (
        <div className="relative h-[45vh] w-full overflow-hidden rounded-2xl bg-zinc-200">

            {/* shimmer layer */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-primary/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
            </div>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* content skeleton */}
            <div className="absolute inset-0 flex items-end pb-8 pt-4 px-4 sm:px-8 lg:px-12">
                <div className="max-w-2xl w-full space-y-3">
                    <div className="h-6 sm:h-8 md:h-10 w-3/4 rounded bg-zinc-300" />
                    <div className="space-y-2">
                        <div className="h-3 sm:h-4 w-full rounded bg-zinc-300" />
                        <div className="h-3 sm:h-4 w-5/6 rounded bg-zinc-300" />
                    </div>
                    <div className="flex gap-3 mt-4">
                        <div className="h-8 w-24 rounded bg-zinc-300" />
                        <div className="h-8 w-20 rounded bg-zinc-300" />
                    </div>
                </div>
            </div>



            {/* Dots */}
            <div className="absolute bottom-4 right-4 sm:left-1/2 sm:-translate-x-1/2 flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-zinc-400" />
                ))}
            </div>

        </div>
    );
};