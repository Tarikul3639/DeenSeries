"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export interface ItemProps {
    _id: string;

    // Basic Info
    title: string;
    slug?: string;
    description?: string;
    tagline?: string;

    // Media
    poster?: string;
    thumbnail?: string;

    // Video
    embed?: string;

    // Meta
    duration?: string;
    releaseDate?: string;
    genres?: string[];
    rating?: number;
    quality?: string;
    totalEpisodes?: number;

    // Status
    isPublished: boolean;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

interface MovieCardProps {
    item?: ItemProps;
}

export const MovieCard = ({ item }: MovieCardProps) => {
    if (!item) return null;

    const {
        title,
        thumbnail,
        poster,
        quality,
        rating,
        releaseDate,
        description,
        totalEpisodes,
    } = item;

    const displayImage =
        thumbnail && !poster
            ? thumbnail
            : poster || thumbnail || undefined;

            // console.log(displayImage);

    return (
        <div className="group flex flex-col gap-2">
            {/* Poster Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-foreground shadow-sm">
                {/* Avatar instead of img */}
                <Avatar className="h-full w-full rounded-none">
                    <AvatarImage
                        src={displayImage}
                        alt={title}
                        className="h-full w-full rounded-none object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Same style fallback */}
                    <AvatarFallback className="flex items-center justify-center bg-linear-to-br from-[#193cb8] to-black text-white text-lg font-semibold rounded-md">
                        {title?.slice(0, 3).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <svg width="56" height="56" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.2)" />
                        <circle cx="28" cy="28" r="22" fill="rgba(255,255,255,0.3)" />
                        <polygon points="23,18 40,28 23,38" fill="white" />
                    </svg>
                </div>

                {/* Quality badge */}
                {quality && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#C82323] px-1.5 py-0.5 text-[11px] font-medium text-white rounded-xs">
                            {quality}
                        </span>
                    </div>
                )}

                {/* Episodes badge */}
                {totalEpisodes && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#C82323] px-1.5 py-0.5 text-[11px] font-medium text-white rounded-xs">
                            {totalEpisodes} Episodes
                        </span>
                    </div>
                )}

                {/* Rating */}
                <div className="absolute bottom-0 right-0 z-10 bg-black/90 px-2 py-1 flex items-center gap-1.5 rounded-tl-sm">
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4 text-[#FFD700]"
                    >
                        <path d="M12 2l2.9 6.26 6.9.59-5.2 4.5 1.56 6.65L12 16.9 5.84 20l1.56-6.65-5.2-4.5 6.9-.59L12 2z" />
                    </svg>

                    {rating && (
                        <span className="text-xs font-semibold text-muted-foreground">
                            {rating?.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="mt-1 space-y-1">
                {title && (
                    <h3 className="group-hover:text-primary hover:underline text-sm font-medium">
                        {title}
                    </h3>
                )}

                {description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        {description}
                    </p>
                )}

                {releaseDate && (
                    <p className="text-xs text-muted-foreground">{releaseDate}</p>
                )}
            </div>
        </div>
    );
};
