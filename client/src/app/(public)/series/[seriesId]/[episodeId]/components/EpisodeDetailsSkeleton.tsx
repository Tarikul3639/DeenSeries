"use client";

export const EpisodeDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-background animate-pulse">
      <div className="mx-auto max-w-450 px-4 pt-4 pb-16 sm:px-6 lg:flex lg:items-start lg:gap-6">

        {/* LEFT COLUMN */}
        <div className="min-w-0 flex-1 space-y-4">

          {/* Player */}
          <div className="relative w-full overflow-hidden rounded-xl bg-muted" style={{ aspectRatio: "16/9" }}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
            </div>
          </div>

          {/* Title */}
          <div className="h-6 w-3/4 rounded-lg bg-muted" />

          {/* Meta row */}
          <div className="flex flex-wrap gap-3">
            <div className="h-3 w-28 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-3 w-24 rounded bg-muted" />
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60" />

          {/* Description card */}
          <div className="rounded-xl bg-muted/40 p-4 space-y-3">
            {/* Series header */}
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-md bg-muted" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-36 rounded bg-muted" />
                <div className="h-2.5 w-24 rounded bg-muted" />
              </div>
            </div>
            {/* Genres */}
            <div className="flex gap-1.5">
              {[60, 48, 72].map((w, i) => (
                <div key={i} className="h-5 rounded-full bg-muted" style={{ width: w }} />
              ))}
            </div>
            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-muted" />
              <div className="h-3 w-5/6 rounded bg-muted" />
              <div className="h-3 w-4/6 rounded bg-muted" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR — Desktop only */}
        <aside className="hidden lg:block lg:w-95 xl:w-100 shrink-0">
          <div className="rounded-xl border border-border bg-muted/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <div className="space-y-1.5">
                <div className="h-3.5 w-32 rounded bg-muted" />
                <div className="h-2.5 w-16 rounded bg-muted" />
              </div>
              <div className="h-3 w-14 rounded bg-muted" />
            </div>

            {/* Episode list skeletons */}
            <div className="p-2 space-y-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg p-2">
                  {/* Episode number */}
                  <div className="w-6 shrink-0 flex justify-center">
                    <div className="h-3 w-3 rounded bg-muted" />
                  </div>
                  {/* Thumbnail */}
                  <div className="w-30 shrink-0 rounded-md bg-muted" style={{ aspectRatio: "16/9" }} />
                  {/* Info */}
                  <div className="flex-1 pt-0.5 space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                    <div className="h-2.5 w-1/2 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};