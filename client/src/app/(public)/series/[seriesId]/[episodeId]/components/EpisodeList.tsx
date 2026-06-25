"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { Episode } from "@/store/features/episodes/episode.api";

interface EpisodeListProps {
  episodes: Episode[];
  seriesId: string;
  currentEpisodeId: string;
}

export function EpisodeList({
  episodes,
  seriesId,
  currentEpisodeId,
}: EpisodeListProps) {
  return (
    <div className="space-y-1">
      {episodes.map((ep) => {
        const isCurrent = ep._id === currentEpisodeId;
        return (
          <Link
            key={ep._id}
            href={`/series/${seriesId}/${ep._id}`}
            className={`group flex items-start gap-2 rounded-lg p-2 transition-all duration-150 ${
              isCurrent ? "bg-primary/10" : "hover:bg-muted active:bg-muted/70"
            }`}
          >
            {/* Episode number */}
            <div className={`flex w-5 shrink-0 self-center items-center justify-center text-center text-[11px] font-medium text-muted-foreground ${isCurrent ? "text-primary" : ""}`}>
              {ep.episodeNumber}
            </div>

            {/* Thumbnail — 16:9 */}
            <div className="relative w-[28vw] max-w-30 min-w-20 shrink-0 overflow-hidden rounded-md bg-muted">
              <div style={{ aspectRatio: "16/9" }}>
                {ep.thumbnail ? (
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center text-sm font-bold ${
                      isCurrent
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ep.episodeNumber}
                  </div>
                )}
              </div>

              {/* Play overlay on hover */}
              {!isCurrent && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 rounded-md">
                  <div className="flex size-7 items-center justify-center rounded-full bg-black/60">
                    <Play className="size-3.5 fill-white text-white" />
                  </div>
                </div>
              )}

              {/* Currently playing indicator */}
              {isCurrent && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                  <div className="flex items-end gap-0.75 h-3.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-0.75 rounded-sm bg-white animate-bounce"
                        style={{
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: "0.8s",
                          height: i === 2 ? "100%" : "60%",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Duration badge */}
              {ep.duration && (
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white leading-none">
                  {ep.duration}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1 pt-0.5">
              <p
                className={`line-clamp-2 text-[12px] sm:text-[13px] font-medium leading-snug ${
                  isCurrent ? "text-primary" : "text-foreground"
                }`}
              >
                {ep.title}
              </p>
              {ep.description && (
                <p className="mt-1 line-clamp-1 sm:line-clamp-2 text-[10px] sm:text-[11px] text-muted-foreground">
                  {ep.description}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}