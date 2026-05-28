import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import AllSeriesPage from "./components/AllSeriesPage";

export const metadata: Metadata = createMetadata({
  title: "Islamic Series Collection",
  description:
    "Explore Islamic series including historical stories of Salahuddin, Ertugrul, and more. Watch meaningful content on DeenSeries.",

  path: "/series",
  image: "/og/series.png",

  keywords: [
    "Islamic series",
    "watch Islamic series",
    "Ertugrul series",
    "Salahuddin series",
    "Islamic historical shows",
    "Muslim history series",
  ],

  ogDescription:
    "Browse and watch Islamic series including Ertugrul and Salahuddin on DeenSeries.",
});

export default function SeriesPage() {
  return <AllSeriesPage />;
}