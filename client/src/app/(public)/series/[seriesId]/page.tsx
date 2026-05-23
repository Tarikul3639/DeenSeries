import { Metadata } from "next";
import { SERIES_DATA } from "./components/series-data";
import { SeriesHero } from "./components/SeriesHero";
import { SeriesEpisodesHeader } from "./components/SeriesEpisodesHeader";
import { SeriesEpisodesGrid } from "./components/SeriesEpisodesGrid";

export const metadata: Metadata = {
  title: "Gilani Series",
  description:
    "Watch Gilani Series with a clean and distraction-free viewing experience.",
};

export default function SeriesDetailsPage({ params }: { params: { seriesId: string } }) {
  const currentSeries = SERIES_DATA;

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <SeriesHero currentSeries={currentSeries} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-6">
        <SeriesEpisodesHeader
          totalEpisodes={currentSeries.totalEpisodes}
          season="Season 1"
        />

        <div className="group-wrapper">
          <SeriesEpisodesGrid episodes={currentSeries.episodes} seriesId={params.seriesId} />
        </div>
      </div>
    </div>
  );
}
