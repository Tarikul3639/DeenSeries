"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ItemProps, MovieCard, } from "@/components/MovieCard";

interface SeriesRowProps {
  title: string;
  items: ItemProps[];
}

export default function SeriesRow({
  title,
  items,
}: SeriesRowProps) {
  return (
    <section className="border-t pt-5 sm:pt-8 space-y-5 sm:space-y-8">

      {/* Header */}
      <header className="flex items-start justify-between">
        <h2 className="text-lg sm:text-xl text-black font-semibold leading-tight md:text-2xl border-l-4 border-primary pl-3 capitalize">
          {title}
        </h2>

        <Link
          href="/series"
          className="group flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white hover:text-gray-100 transition uppercase bg-primary px-2 sm:px-2.5 py-1 sm:py-1.5 rounded"
        >
          <span>see all</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </header>

      {/* Scroll Row */}
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items?.map((item: ItemProps) => (
          <div
            key={item.id}
          >
            <Link href={`/series/${item.id}`} className="select-none group">
              <MovieCard item={item} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}