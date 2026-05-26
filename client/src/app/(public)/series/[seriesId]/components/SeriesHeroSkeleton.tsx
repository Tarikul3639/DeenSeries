"use client";

export const SeriesHeroSkeleton = () => {
  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-zinc-200">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-y-0 w-[200%] bg-linear-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto max-w-7xl w-full px-4 pb-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

          {/* LEFT POSTER */}
          <div className="hidden md:block md:col-span-1 aspect-4/5 bg-zinc-300 rounded-sm" />

          {/* RIGHT */}
          <div className="md:col-span-3 space-y-3">

            <div className="h-3 w-24 bg-zinc-300 rounded" />
            <div className="h-8 w-3/4 bg-zinc-400 rounded" />
            <div className="h-3 w-1/2 bg-zinc-300 rounded" />

            <div className="flex gap-2">
              <div className="h-4 w-16 bg-zinc-300 rounded" />
              <div className="h-4 w-16 bg-zinc-300 rounded" />
            </div>

            <div className="space-y-1">
              <div className="h-3 w-full bg-zinc-300 rounded" />
              <div className="h-3 w-5/6 bg-zinc-300 rounded" />
            </div>

            <div className="flex gap-2 pt-2">
              <div className="h-6 w-24 bg-zinc-400 rounded" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};