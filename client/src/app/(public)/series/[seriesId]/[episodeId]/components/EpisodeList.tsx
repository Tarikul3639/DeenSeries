"use client";

import Link from "next/link";
import { Play, CheckCircle } from "lucide-react";
import { Episode } from "@/store/features/episodes/episode.api";

interface EpisodeListProps {
  episodes: Episode[];
  seriesId: string;
  currentEpisodeId: string;
}

export function EpisodeList({ episodes, seriesId, currentEpisodeId }: EpisodeListProps) {
  return (
    <div className="space-y-1">
      {episodes.map((ep) => {
        const isCurrent = ep._id === currentEpisodeId;
        return (
          <Link
            key={ep._id}
            href={`/series/${seriesId}/${ep._id}`}
            className={`group flex items-center gap-3 rounded-lg p-2 transition-all duration-150 ${
              isCurrent
                ? "bg-primary/10 ring-1 ring-primary/30"
                : "hover:bg-muted active:bg-muted/70"
            }`}
          >
            {/* Thumbnail / Episode number */}
            <div className="relative shrink-0">
              {ep.thumbnail ? (
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="size-10 rounded object-cover"
                />
              ) : (
                <div
                  className={`flex size-10 items-center justify-center rounded text-xs font-bold ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {ep.episodeNumber}
                </div>
              )}
              {isCurrent && (
                <div className="absolute inset-0 flex items-center justify-center rounded bg-black/40">
                  <CheckCircle className="size-4 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium ${
                  isCurrent ? "text-primary" : "text-foreground"
                }`}
              >
                {ep.title}
              </p>
              <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Play className="size-3" />
                Episode {ep.episodeNumber}
                {ep.duration && ` • ${ep.duration}`}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
