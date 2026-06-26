"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, X } from "lucide-react";

import { watchHistoryService } from "@/services/watch-history.service";
import { WatchHistoryEntry } from "@/storage/repositories/watch-history.repository";

export default function ContinueWatchingBanner() {
  const router = useRouter();

  const [entries, setEntries] = useState<WatchHistoryEntry[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const history = await watchHistoryService.getAll();
    history.sort((a, b) => b.updatedAt - a.updatedAt);
    setEntries(history);
  };

  const handleClick = (entry: WatchHistoryEntry) => {
    if (entry.type === "series" && entry.episodeId) {
      router.push(`/series/${entry.contentId}/${entry.episodeId}`);
    } else {
      router.push(`/movies/${entry.contentId}`);
    }
  };

  const handleDismiss = async (
    e: React.MouseEvent,
    entry: WatchHistoryEntry
  ) => {
    e.stopPropagation();
    await watchHistoryService.remove(entry.type, entry.contentId);
    setEntries((prev) =>
      prev.filter(
        (item) =>
          !(item.type === entry.type && item.contentId === entry.contentId)
      )
    );
  };

  if (!entries.length) return null;

  return (
    <section className="mx-auto max-w-7xl space-y-3 px-2 pb-3 sm:space-y-6 sm:px-4 sm:pb-5">
      {/* Header */}
      <header className="flex items-start justify-between">
        <h2 className="border-l-4 border-primary pl-3 text-lg font-semibold capitalize leading-tight text-foreground md:text-2xl sm:text-xl">
          Continue Watching
        </h2>
      </header>

      <div className="space-y-3">
        {entries.map((entry) => {
          const subtitle =
            entry.type === "series"
              ? `Episode ${entry.episodeNumber}`
              : "Movie";

          return (
            <div
              key={`${entry.type}-${entry.contentId}`}
              onClick={() => handleClick(entry)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleClick(entry)}
              className="group relative w-full cursor-pointer overflow-hidden rounded-sm border border-border bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-4 text-left transition-all duration-200 hover:border-primary/30 hover:shadow-md"
            >
              {/* Dismiss */}
              <button
                type="button"
                onClick={(e) => handleDismiss(e, entry)}
                className="absolute right-2 top-2 z-10 rounded-full p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground md:opacity-0 group-hover:opacity-100"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-sm bg-muted">
                  {entry.thumbnail ? (
                    <img
                      src={entry.thumbnail}
                      alt={entry.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                      <Play className="size-6 fill-current" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
                    <div className="flex size-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                      <Play className="size-4 fill-white text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Continue Watching
                  </p>

                  <h3 className="mt-1 truncate text-sm font-semibold text-foreground sm:text-base">
                    {entry.title}
                  </h3>

                  {entry.description && (
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {entry.description}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-muted-foreground">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}