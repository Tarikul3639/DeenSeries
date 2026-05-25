"use client";
import Link from "next/link";
import { Play, Calendar, Star, Tv, ChevronRight, ArrowLeft } from "lucide-react";
import { Series } from "@/store/features/series/series.api";

interface SeriesHeroProps {
  currentSeries: Series;
  firstEpisodeId?: string;
}

export function SeriesHero({ currentSeries, firstEpisodeId }: SeriesHeroProps) {
  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden border-b border-border/30">
      {/* Background Blurred Banner Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSeries.thumbnailPoster || "/placeholder.jpg"}
          alt=""
          className="w-full h-full object-cover scale-105 filter blur-xs brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Hero Content Area */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-end">
          {/* Left Column: Sharp Verticle Thumbnail (Hidden on small mobile) */}
          <div className="hidden md:block md:col-span-1 aspect-4/5 w-full rounded-sm overflow-hidden border border-border/40 shadow-2xl">
            <img
              src={currentSeries.coverPoster || "/placeholder.jpg"}
              alt={currentSeries.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Meta details and controls */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <div className="w-full mx-auto max-w-6xl flex items-center">
              <Link
                href={`/series`}
                className="group inline-flex items-center gap-2.5 text-xs font-medium text-zinc-500 transition-colors duration-200 hover:text-zinc-900"
              >
                <ArrowLeft className="size-3 sm:size-3.5 transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) group-hover:-translate-x-1" />

                <span className="relative flex w-20 sm:w-24 overflow-hidden py-0.5">
                  {/* Sliding Modern Text Mask Layer */}
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-32 text-zinc-500">
                    Back
                  </span>
                  <span className="absolute inset-0 inline-block -translate-x-full font-semibold whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-0 text-zinc-900">
                    To Series
                  </span>
                </span>
              </Link>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <span>Library</span>
              <ChevronRight className="h-3 w-3" />
              <span>Series</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary line-clamp-1">{currentSeries.title}</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-black">
                {currentSeries.title}
              </h1>
              {currentSeries.tagline && (
                <p className="text-sm sm:text-base text-primary/90 font-medium">
                  {currentSeries.tagline}
                </p>
              )}
            </div>

            {/* Badges / Meta Info Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs pt-1">
              {/* 🎬 Genres */}
              {currentSeries.genres?.length ? (
                <div className="flex items-center gap-1 text-[11px] bg-red-600/90 text-white px-2 py-0.5 rounded">
                  {currentSeries.genres.slice(0, 2).join(" • ")}
                </div>
              ) : null}

              {/* Year */}
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {currentSeries.releaseDate
                    ? new Date(currentSeries.releaseDate).getFullYear()
                    : "N/A"}
                </span>
              </div>

              {/* 📺 Episodes */}
              <div className="flex items-center gap-1 text-muted-foreground">
                <Tv className="h-3.5 w-3.5" />
                <span>{currentSeries.totalEpisodes ?? 0} eps</span>
              </div>
            </div>

            {/* Description body */}
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl line-clamp-3 sm:line-clamp-none leading-relaxed">
              {currentSeries.description}
            </p>

            {/* Genre pillbox selection */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentSeries.genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-muted border border-border/60 text-foreground px-2.5 py-0.5 text-[11px] font-medium rounded-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* CTA Action Controls */}
            {firstEpisodeId && (
              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href={`/series/${currentSeries._id}/${firstEpisodeId}`}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground text-background font-semibold px-5 py-2.5 text-xs hover:bg-foreground/90 transition-colors shadow-sm"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch Season 1 (Ep 1)</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
