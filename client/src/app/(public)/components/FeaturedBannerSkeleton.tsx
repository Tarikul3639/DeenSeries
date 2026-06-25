"use client";

export const FeaturedBannerSkeleton = () => {
    return (
        <div className="relative h-[45vh] w-full overflow-hidden rounded-sm bg-muted animate-pulse">

            {/* shimmer layer — foreground/10 works in both light and dark */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-foreground/8 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
            </div>

            {/* bottom fade overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/20 to-transparent" />

            {/* content skeleton */}
            <div className="absolute inset-0 flex items-end pb-8 pt-4 px-4 sm:px-8 lg:px-12">
                <div className="max-w-2xl w-full space-y-3">

                    {/* title */}
                    <div className="h-6 sm:h-8 md:h-10 w-2/3 rounded-sm bg-muted-foreground/15" />

                    {/* description */}
                    <div className="space-y-1.5">
                        <div className="h-3 sm:h-3.5 w-full rounded-sm bg-muted-foreground/10" />
                        <div className="h-3 sm:h-3.5 w-4/5 rounded-sm bg-muted-foreground/10" />
                    </div>

                    {/* buttons */}
                    <div className="flex gap-2 sm:gap-4 mt-3 sm:mt-6">
                        <div className="h-7 w-20 sm:h-10 sm:w-28 rounded-sm bg-muted-foreground/15" />
                        <div className="h-7 w-16 sm:h-10 sm:w-24 rounded-sm bg-muted-foreground/10" />
                    </div>

                </div>
            </div>

            {/* dots */}
            <div className="absolute bottom-4 right-4 sm:left-1/2 sm:right-auto flex sm:-translate-x-1/2 gap-1.5 sm:gap-2 bg-muted-foreground/10 backdrop-blur-xs px-2 py-1 rounded-full border border-border/40">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 sm:h-2 rounded-full ${
                            i === 0
                                ? "w-4 sm:w-6 bg-muted-foreground/40"
                                : "w-1.5 sm:w-2 bg-muted-foreground/20"
                        }`}
                    />
                ))}
            </div>

        </div>
    );
};