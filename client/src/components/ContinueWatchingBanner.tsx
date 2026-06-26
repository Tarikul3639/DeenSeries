"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Play, X } from "lucide-react";
import { watchHistoryService } from "@/services/watch-history.service";
import { WatchHistoryEntry } from "@/storage/repositories/watch-history.repository";

export default function ContinueWatchingBanner() {
  const router = useRouter();
  const [entry, setEntry] = useState<WatchHistoryEntry | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    watchHistoryService.getLatest().then(setEntry);
  }, []);

  if (!entry || dismissed) return null;

  const handleClick = () => {
    if (entry.type === "series" && entry.episodeId) {
      router.push(`/series/${entry.contentId}/${entry.episodeId}`);
    } else {
      router.push(`/movies/${entry.contentId}`);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
  };

  const subtitle =
    entry.type === "series" && entry.episodeNumber
      ? `Episode ${entry.episodeNumber}`
      : undefined;

  return (
    <button
      onClick={handleClick}
      className="group relative w-full overflow-hidden rounded-xl border border-border bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-4 text-left transition-all hover:border-primary/30 hover:shadow-md"
    >
      {/* Close button */}
      <div
        onClick={handleDismiss}
        className="absolute right-2 top-2 z-10 rounded-full p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted hover:text-foreground group-hover:opacity-100"
        aria-label="Dismiss"
      >
        <X className="size-4" />
      </div>

      <div className="flex items-center gap-3">
        {/* Play icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Play className="size-5 fill-current" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            Continue Watching
          </p>
          <p className="truncate text-sm font-semibold text-foreground">
            {entry.title}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </button>
  );
}
