"use client";
import Link from "next/link";
import { Play, Calendar, Star, Tv, ChevronRight, ArrowLeft } from "lucide-react";
import { Series } from "@/store/features/series/series.api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SeriesHeroProps {
  currentSeries: Series;
  firstEpisodeId?: string;
}

export function SeriesHero({ currentSeries, firstEpisodeId }: SeriesHeroProps) {
  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] overflow-hidden border-b border-border/30">
      {/* Background Blurred Banner Image */}
      <div className="absolute inset-0 z-0">
        <Avatar className="w-full h-full rounded-none">
          <AvatarImage
            src={currentSeries.poster || currentSeries.thumbnail || undefined}
            alt=""
            className="w-full h-full rounded-none object-cover scale-105 blur-sm brightness-75"
          />
          <AvatarFallback className="w-full h-full flex items-center justify-center rounded-none bg-linear-to-br from-[#193cb8] to-black text-white text-4xl font-bold" />
        </Avatar>

        {/* overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Hero Content Area */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-6 md:pb-12 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-end">

          {/* Left Column: Sharp Vertical Thumbnail */}
          <div className="hidden md:block md:col-span-1 aspect-4/5 w-full rounded-sm overflow-hidden border border-border/40 shadow-2xl">
            <Avatar className="w-full h-full rounded-sm overflow-hidden">
              <AvatarImage
                src={currentSeries.thumbnail || currentSeries.poster || undefined}
                alt={currentSeries.title}
                className="w-full h-full rounded-sm object-cover"
              />
              <AvatarFallback className="flex items-center justify-center rounded-none bg-linear-to-br from-[#193cb8] via-[#0f2a80] to-black text-white text-3xl font-bold tracking-tight">
                {currentSeries.title?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Right Column: Meta details and controls */}
          <div className="col-span-1 md:col-span-3 space-y-2.5 sm:space-y-4">
            <div className="w-full mx-auto max-w-6xl flex items-center">
              <Link
                href={`/series`}
                className="group inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <ArrowLeft className="size-3 sm:size-3.5 transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) group-hover:-translate-x-1" />
                <span className="relative flex w-20 sm:w-24 overflow-hidden py-0.5">
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-32">
                    Back
                  </span>
                  <span className="absolute inset-0 inline-block -translate-x-full font-semibold whitespace-nowrap transition-transform duration-300 ease-out group-hover:translate-x-0">
                    To Series
                  </span>
                </span>
              </Link>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-medium uppercase tracking-wider">
              <span>Library</span>
              <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span>Series</span>
              <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="text-primary line-clamp-1">{currentSeries.title}</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
                {currentSeries.title}
              </h1>
              {currentSeries.tagline && (
                <p className="text-[11px] sm:text-sm text-primary/90 font-medium italic line-clamp-1 sm:line-clamp-2 max-w-2xl">
                  {currentSeries.tagline}
                </p>
              )}
            </div>

            {/* Badges / Meta Info Row */}
            <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 text-[10px] sm:text-xs pt-0.5 sm:pt-1">
              {currentSeries.genres?.length ? (
                <div className="flex items-center gap-1 text-[9px] sm:text-[11px] bg-destructive/90 text-white px-1.5 sm:px-2 py-0.5 rounded">
                  {currentSeries.genres.slice(0, 2).join(" • ")}
                </div>
              ) : null}

              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>
                  {currentSeries.releaseDate
                    ? new Date(currentSeries.releaseDate).getFullYear()
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Tv className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span>{currentSeries.totalEpisodes ?? 0} eps</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] sm:text-sm text-muted-foreground max-w-3xl line-clamp-2 sm:line-clamp-none leading-relaxed">
              {currentSeries.description}
            </p>

            {/* Genre pills */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 sm:pt-2">
              {currentSeries.genres?.map((genre) => (
                <span
                  key={genre}
                  className="bg-muted border border-border/60 text-foreground px-2 py-0.5 text-[9px] sm:text-[11px] font-medium rounded-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* CTA */}
            {firstEpisodeId && (
              <div className="pt-1.5 sm:pt-3 flex flex-wrap gap-3">
                <Link
                  href={`/series/${currentSeries._id}/${firstEpisodeId}`}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded bg-primary text-background font-semibold px-3.5 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
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