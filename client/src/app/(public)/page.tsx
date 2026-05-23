"use client";

import FeaturedBanner from "./components/FeaturedBanner";
import SeriesRow from "./components/SeriesRow";
import MovieRow from "./components/MovieRow";
import { ItemProps } from "@/components/MovieCard";

/* DEMO DATA */
const series = [
  {
    id: "gilani",
    title: "Gilani Series",
    description: "Life of Abdul Qadir Gilani (RA)",
    poster: "https://api.dicebear.com/7.x/shapes/svg?seed=gilani",
    episodes: 10,
  },
  {
    id: "ertugrul",
    title: "Dirilis Ertugrul",
    description: "The rise of the Ottoman Empire",
    poster: "https://api.dicebear.com/7.x/shapes/svg?seed=ertugrul",
    quality: "HDRip",
    rating: 9.0,
    episodes: 50,
  },
];


const movies: ItemProps[] = [
  {
    id: "umar",
    title: "Omar Movie",
    description: "Life of Omar (RA)",
    poster: "https://api.dicebear.com/7.x/shapes/svg?seed=umar",
    quality: "HDRip",
    rating: 8.5,
    releaseDate: "2012"
  },
  {
    id: "conquest",
    title: "Conquest 1453",
    description: "Story of the fall of Constantinople",
    poster: "https://api.dicebear.com/7.x/shapes/svg?seed=conquest",
    quality: "HDRip",
    rating: 7.2,
    releaseDate: "2012",
  },
];

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-10 text-center">
        <FeaturedBanner />
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-3 sm:space-y-6 pb-10">
        {/* Pass custom paths seamlessly */}
        <SeriesRow
          title="Trending Series"
          items={series}
        />

        <MovieRow
          title="New Movies"
          items={movies}
        />
      </div>
    </main>
  );
}