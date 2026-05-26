// components/ui/MovieCardSkeleton.tsx
"use client";

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">

      {/* Poster Skeleton */}
      <div className="aspect-4/5 w-full bg-zinc-200 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 w-[200%] bg-linear-to-r from-transparent via-primary/10 to-transparent animate-[shimmer_1.2s_linear_infinite]" />
      </div>

      {/* Text Skeleton */}
      <div className="space-y-1">
        <div className="h-3 w-3/4 rounded bg-zinc-200" />
        <div className="h-3 w-1/2 rounded bg-zinc-200" />
        <div className="h-3 w-1/3 rounded bg-zinc-200" />
      </div>

    </div>
  );
};