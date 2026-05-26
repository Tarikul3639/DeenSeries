"use client";

export const SeriesEpisodesHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between py-3">

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-zinc-200 rounded-sm" />

        <div className="space-y-1">
          <div className="h-4 w-24 bg-zinc-300 rounded" />
          <div className="h-3 w-40 bg-zinc-200 rounded" />
        </div>
      </div>

      <div className="h-3 w-20 bg-zinc-200 rounded" />

    </div>
  );
};