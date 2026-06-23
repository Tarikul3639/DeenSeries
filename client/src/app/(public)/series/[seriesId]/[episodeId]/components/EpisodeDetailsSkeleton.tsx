"use client";

export const EpisodeDetailsSkeleton = () => {
  return (
    <main className="min-h-screen bg-zinc-50/50 text-zinc-800 pb-16 animate-pulse">

      {/* NAV */}
      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md px-4 h-16.5 sm:h-20 flex items-center">
        <div className="w-full mx-auto max-w-6xl">
          <div className="h-4 w-24 bg-zinc-200 rounded" />
        </div>
      </div>

      {/* MAIN */}
      <div className="mx-auto max-w-6xl px-4 mt-1 space-y-6">

        {/* YouTube-style grid: player+synopsis left, card right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">

          {/* LEFT: Player + Title + Synopsis */}
          <div className="md:col-span-2 space-y-4">

            {/* Player */}
            <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-zinc-200 border border-zinc-200">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
              </div>
            </div>

            {/* Title (md+) */}
            <div className="space-y-2">
              <div className="h-3 w-24 bg-zinc-200 rounded" />
              <div className="h-6 w-3/4 bg-zinc-300 rounded" />
              <div className="h-3 w-40 bg-zinc-200 rounded" />
            </div>

            <div className="h-px bg-zinc-200" />

            {/* Synopsis */}
            <div className="space-y-2">
              <div className="h-3 w-32 bg-zinc-200 rounded" />
              <div className="space-y-1">
                <div className="h-3 w-full bg-zinc-200 rounded" />
                <div className="h-3 w-5/6 bg-zinc-200 rounded" />
                <div className="h-3 w-4/6 bg-zinc-200 rounded" />
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:col-span-1 md:sticky md:top-24 bg-white border border-zinc-200 p-5 rounded-sm space-y-4 self-start">

            {/* Title */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-zinc-300 rounded" />
              <div className="h-3 w-1/2 bg-zinc-200 rounded" />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-zinc-200 rounded" />
              <div className="h-3 w-5/6 bg-zinc-200 rounded" />
            </div>

            <div className="h-px bg-zinc-100" />

            {/* Meta */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-zinc-200 rounded" />
                <div className="h-3 w-10 bg-zinc-300 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-zinc-200 rounded" />
                <div className="h-3 w-10 bg-zinc-300 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-zinc-200 rounded" />
                <div className="h-3 w-10 bg-zinc-300 rounded" />
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-12 bg-zinc-200 rounded" />
              ))}
            </div>

          </div>

        </div>

      </div>
    </main>
  );
};