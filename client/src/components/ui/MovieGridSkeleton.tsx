// components/ui/MovieGridSkeleton.tsx
"use client";

import { MovieCardSkeleton } from "@/components/ui/MovieCardSkeleton";

export const MovieGridSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};