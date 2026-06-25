"use client";

export const EpisodeDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-background pb-16 animate-pulse">
      {/* NAV */}
      <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center">
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-5">
            {/* Player */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border/20">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="h-6 sm:h-7 w-3/4 bg-muted rounded" />
              <div className="flex gap-3">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-3 w-20 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-5/6 bg-muted rounded" />
            </div>

            {/* Series Card */}
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-md bg-muted" />
                <div className="space-y-1 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted rounded" />
                </div>
              </div>
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-4/5 bg-muted rounded" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:block space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-muted rounded" />
              <div className="h-3 w-16 bg-muted rounded" />
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-2 space-y-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg p-2">
                  <div className="size-10 rounded bg-muted" />
                  <div className="flex-1 space-y-1">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-2.5 w-1/2 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
