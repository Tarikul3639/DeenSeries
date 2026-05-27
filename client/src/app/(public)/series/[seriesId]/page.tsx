import { Metadata } from "next";
import { EpisodeResponse } from "@/store/features/episodes/episode.api";
import SeriesDetailsPage from "./components/SeriesDetailsPage";

/* METADATA (SAFE + SEO READY) */
export async function generateMetadata(
  { params }: { params: Promise<{ seriesId: string }> }
): Promise<Metadata> {
  const { seriesId } = await params;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/episodes/series/${seriesId}`,
      { cache: "no-store" }
    );

    /* If fail api */
    if (!res.ok) {
      return {
        title: "Series not found",
        description: "This series does not exist or has been removed.",
      };
    }

    /* SAFE JSON PARSE */
    const text = await res.text();

    if (!text) {
      return {
        title: "Series not found",
      };
    }

    let response: EpisodeResponse;

    try {
      response = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err);

      return {
        title: "Error loading series",
      };
    }

    return {
      title: response.series.title || "DeenSeries",
      description:
        response.series.description ||
        "Watch Islamic series on DeenSeries platform.",

      openGraph: {
        title: response.series.title,
        description: response.series.description,
        images: [
          response.series.poster || "/og-image.png",
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: response.series.title,
        description: response.series.description,
        images: [
          response.series.poster || "/og-image.png",
        ],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    return {
      title: "DeenSeries",
      description: "Watch Islamic series and movies.",
    };
  }
}

/* PAGE */
export default async function SeriesPage(
  { params }: { params: Promise<{ seriesId: string }> }
) {
  const { seriesId } = await params;

  return <SeriesDetailsPage seriesId={seriesId} />;
}