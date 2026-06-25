"use client";

export const SeriesHeroSkeleton = () => {
    return (
        <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden animate-pulse">

            {/* Background */}
            <div className="absolute inset-0 bg-muted">

                {/* Shimmer */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-muted/40 via-muted/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-end">
                <div className="mx-auto max-w-7xl w-full px-4 pb-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

                    {/* LEFT POSTER */}
                    <div className="hidden md:block md:col-span-1">
                        <div className="relative aspect-4/5 rounded-sm bg-muted overflow-hidden">

                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
                            </div>

                            <div className="absolute inset-0 bg-linear-to-t from-muted/30 via-transparent to-transparent" />

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="md:col-span-3 space-y-4">

                        {/* Category */}
                        <div className="h-3 w-24 rounded-sm bg-muted" />

                        {/* Title */}
                        <div className="h-8 md:h-10 w-3/4 rounded-sm bg-muted" />

                        {/* Meta */}
                        <div className="h-3 w-1/2 rounded-sm bg-muted" />

                        {/* Tags */}
                        <div className="flex gap-2">
                            <div className="h-5 w-16 rounded-sm bg-muted" />
                            <div className="h-5 w-16 rounded-sm bg-muted" />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <div className="h-3 w-full rounded-sm bg-muted" />
                            <div className="h-3 w-5/6 rounded-sm bg-muted" />
                            <div className="h-3 w-3/4 rounded-sm bg-muted" />
                        </div>

                        {/* Button */}
                        <div className="pt-2">
                            <div className="h-8 w-28 rounded-sm bg-muted" />
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};