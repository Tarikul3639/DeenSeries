"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Tv,
  Info,
  Film,
} from "lucide-react";

// API
import { useGetMovieByIdQuery } from "@/store/features/movies/movie.api";

export default function MovieDetailClient({ movieId }: {movieId: string;}) {

  /* SINGLE FETCH */
  const { data: movie, isLoading, isError } =
    useGetMovieByIdQuery(movieId);

  /* LOADING */
  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  /* ERROR */
  if (isError || !movie) {
    return <p className="text-center py-20">Movie not found</p>;
  }

  return (
    <main className="min-h-screen bg-zinc-50/50 text-zinc-800 pb-16">

      {/* 🔝 NAV */}
      <div className="sticky flex items-left top-0 z-50 w-full bg-linear-to-b from-white via-white/80 to-transparent px-4 backdrop-blur-md h-16.5 sm:h-20">
        <div className="w-full mx-auto max-w-6xl flex items-center">
          <Link
            href="/movies"
            className="group inline-flex items-center gap-2.5 text-base font-medium text-zinc-500 hover:text-zinc-900 transition"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-all duration-300" />

            <span className="relative flex w-24 overflow-hidden">
              <span className="group-hover:translate-x-24 transition-all duration-300">
                Back
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 font-semibold transition-all duration-300">
                To Movies
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* 🎬 MAIN */}
      <div className="mx-auto max-w-6xl px-4 mt-2 space-y-6">

        {/* PLAYER */}
        <div className="relative w-full aspect-video overflow-hidden bg-black rounded-sm border border-zinc-200 shadow-md">
          <div
            className="w-full h-full [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:w-full [&_iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: movie.embed }}
          />
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">

          {/* LEFT */}
          <div className="md:col-span-2 space-y-4">

            <div className="space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600 flex items-center gap-1">
                <Film className="h-3 w-3" />
                Now Playing
              </span>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
                {movie.title}
              </h1>

              <span className="text-xs text-zinc-400 font-medium">
                {movie.duration} • {movie.createdAt?.slice(0, 4)}
              </span>
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Info className="h-3 w-3" /> Overview
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
                {movie.description}
              </p>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="bg-white border border-zinc-200 p-5 rounded-sm space-y-4 shadow-2xs">

            <div className="space-y-1">
              <h2 className="text-sm font-bold text-zinc-900">
                {movie.title}
              </h2>

              <p className="text-[11px] italic text-zinc-500">
                {movie.tagline || "No tagline available"}
              </p>
            </div>

            <div className="h-px bg-zinc-100" />

            {/* META */}
            <div className="space-y-2 text-[11px]">

              <div className="flex justify-between">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Rating
                </span>
                <span className="text-amber-600 font-bold">
                  ★ {movie.rating || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Layers className="h-3 w-3" /> Quality
                </span>
                <span className="bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold uppercase">
                  {movie.quality}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Tv className="h-3 w-3" /> Release
                </span>
                <span className="text-zinc-600">
                  {movie.createdAt?.slice(0, 4)}
                </span>
              </div>
            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-1 pt-2">
              {movie.genres?.map((g) => (
                <span
                  key={g}
                  className="bg-zinc-50 border border-zinc-200 px-2 py-0.5 text-[10px]"
                >
                  {g}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}