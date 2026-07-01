"use client";

export const MovieDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-muted/50 text-foreground pb-16 animate-pulse">

      {/* NAV */}
      <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md px-4 h-16.5 sm:h-20 flex items-center">
        <div className="w-full mx-auto max-w-6xl">
          <div className="h-4 w-24 bg-muted-foreground/15 rounded" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-4 mt-2 space-y-6">

        {/* PLAYER */}
        <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-muted">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-foreground/8 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            {/* TITLE */}
            <div className="space-y-2">
              <div className="h-3 w-24 bg-muted-foreground/10 rounded" />
              <div className="h-6 sm:h-8 w-3/4 bg-muted-foreground/15 rounded" />
              <div className="h-3 w-40 bg-muted-foreground/10 rounded" />
            </div>

            <div className="h-px bg-border" />

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <div className="h-3 w-32 bg-muted-foreground/15 rounded" />
              <div className="space-y-1">
                <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                <div className="h-3 w-5/6 bg-muted-foreground/10 rounded" />
                <div className="h-3 w-4/6 bg-muted-foreground/10 rounded" />
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-background border border-border p-5 rounded-sm space-y-4">

            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-muted-foreground/15 rounded" />
              <div className="h-3 w-1/2 bg-muted-foreground/10 rounded" />
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-10 bg-muted-foreground/15 rounded" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-12 bg-muted-foreground/10 rounded" />
              ))}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};