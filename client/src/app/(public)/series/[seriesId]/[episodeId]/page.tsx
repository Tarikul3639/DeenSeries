import EpisodeDetailsPage from "./components/EpisodeDetailsPage";
import { Metadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ seriesId: string; episodeId: string }> }
): Promise<Metadata> {

    const { seriesId, episodeId } = await params;

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/episodes/series/${seriesId}/${episodeId}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return {
                title: "Episode not found",
                description: "This episode does not exist.",
            };
        }

        const text = await res.text();

        if (!text) {
            return {
                title: "Episode not found",
            };
        }

        let data;

        try {
            data = JSON.parse(text);
        } catch {
            return {
                title: "Error loading episode",
            };
        }

        const episode = data?.episode;
        const series = data?.series;

        const title = episode?.title
            ? `${episode.title} | ${series?.title || "DeenSeries"}`
            : "Watch Episode";

        const description =
            episode?.description ||
            series?.description ||
            "Watch Islamic series episodes on DeenSeries.";

        const image =
            episode?.thumbnail ||
            series?.coverPoster ||
            "/og-image.png";

        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/series/${seriesId}/${episodeId}`;

        return {
            title,
            description,

            alternates: {
                canonical: url,
            },

            openGraph: {
                title,
                description,
                url,
                siteName: "DeenSeries",
                type: "video.other",
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            },

            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [image],
            },
        };
    } catch (error) {
        return {
            title: "DeenSeries",
            description: "Watch Islamic series and episodes.",
        };
    }
}

export default async function EpisodePage({
    params,
}: {
    params: Promise<{ seriesId: string; episodeId: string }>;
}) {
    const { seriesId, episodeId } = await params;
    return <EpisodeDetailsPage seriesId={seriesId} episodeId={episodeId} />;
}
