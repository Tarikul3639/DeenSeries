import { createMetadata } from "@/lib/metadata";
import AllMoviesPage from "./components/AllMoviesPage";

/* SEO + OG */
export const metadata = createMetadata({
  title: "Islamic Movies",
  description:
    "Watch Islamic movies online on DeenSeries. Explore inspiring stories from Islamic history with a clean and distraction-free streaming experience.",
  path: "/movies",
  keywords: [
    "Islamic movies",
    "watch Islamic movies",
    "Muslim history movies",
    "halal movies online",
    "Islamic streaming platform",
  ],
  image: "/movies-og-image.png",
});

export default function MoviesPage() {
  return <AllMoviesPage />;
}