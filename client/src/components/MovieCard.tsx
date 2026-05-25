"use client";
export interface ItemProps {
    _id: string;

    // Basic Info
    title: string;
    slug: string;
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
    rating?: string;
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

    const { _id, title, poster, quality, rating, releaseDate, description, totalEpisodes } = item;
    return (
        <div className="flex flex-col gap-2">

            {/* Poster Container */}
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-md bg-zinc-900 shadow-md">

                {/* Movie Poster Image */}
                <img
                    src={poster}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />

                {/* Play button — center, hover only */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.2)" />
                        <circle cx="28" cy="28" r="22" fill="rgba(255,255,255,0.3)" />
                        <polygon points="23,18 40,28 23,38" fill="white" />
                    </svg>
                </div>

                {/* Quality badge — top left */}
                {quality && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#C82323] px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-white rounded-xs">
                            {quality}
                        </span>
                    </div>
                )}

                {/* Total Episodes badge — top left */}
                {totalEpisodes && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#C82323] px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-white rounded-xs">
                            {totalEpisodes} Episodes
                        </span>
                    </div>
                )}

                {/* Rating — bottom right */}
                <div className="absolute bottom-0 right-0 z-10 bg-black/90 px-2 py-1 flex items-center gap-1.5 rounded-tl-sm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-3.5 w-3.5 text-[#FFD700]"
                    >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-semibold text-zinc-100 tracking-tight">
                        {rating}
                    </span>
                </div>

            </div>

            {/* Movie Info */}
            <div className="mt-1 space-y-1">
                {title && (
                    <h3 className="group-hover:text-primary hover:underline text-sm font-medium text-foreground line-clamp-1">
                        {item.title}
                    </h3>
                )}
                {description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                        {description}
                    </p>
                )}
                {releaseDate && (
                    <p className="text-xs text-muted-foreground">
                        {releaseDate}
                    </p>
                )}
                {/* {totalEpisodes && (
                    <p className="text-xs text-muted-foreground">
                        {totalEpisodes} Episodes
                    </p>
                )} */}
            </div>
        </div>
    );
}