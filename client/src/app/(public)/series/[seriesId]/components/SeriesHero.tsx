"use client";

import {
  Play,
  Calendar,
  Star,
  Tv,
  ChevronRight,
} from "lucide-react";

type SeriesData = {
  title: string;
  tagline?: string;
  description: string;
  coverPoster: string;
  thumbnailPoster: string;
  rating: string;
  quality: string;
  releaseDate: string;
  genres: string[];
  totalEpisodes: number;
};

interface SeriesHeroProps {
  currentSeries: SeriesData;
}

export function SeriesHero({ currentSeries }: SeriesHeroProps) {
  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden border-b border-border/30">
      {/* Background Blurred Banner Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSeries.coverPoster}
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
              src={currentSeries.thumbnailPoster}
              alt={currentSeries.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Meta details and controls */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <span>Library</span>
              <ChevronRight className="h-3 w-3" />
              <span>Series</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-primary">{currentSeries.title}</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
                {currentSeries.title}
              </h1>
              {currentSeries.tagline && (
                <p className="text-sm sm:text-base text-primary/90 font-medium">
                  {currentSeries.tagline}
                </p>
              )}
            </div>

            {/* Badges / Meta Info Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium pt-1">
              <span className="bg-[#C82323] px-1.5 py-0.5 text-[10px] font-bold text-white rounded-xs">
                {currentSeries.quality}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-zinc-100 font-semibold">
                  {currentSeries.rating} Rating
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{currentSeries.releaseDate}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Tv className="h-3.5 w-3.5" />
                <span>{currentSeries.totalEpisodes} Episodes</span>
              </div>
            </div>

            {/* Description body */}
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl line-clamp-3 sm:line-clamp-none leading-relaxed">
              {currentSeries.description}
            </p>

            {/* Genre pillbox selection */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {currentSeries.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-muted border border-border/60 text-foreground px-2.5 py-0.5 text-[11px] font-medium rounded-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* CTA Action Controls */}
            <div className="pt-3 flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground text-background font-semibold px-5 py-2.5 text-xs hover:bg-foreground/90 transition-colors shadow-sm">
                <Play className="h-4 w-4 fill-current" />
                <span>Watch Season 1 (Ep 1)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}