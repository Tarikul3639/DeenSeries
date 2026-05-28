import type { MetadataRoute } from "next";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://deenseries.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },

        {
            url: `${SITE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },

        {
            url: `${SITE_URL}/movies`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },

        {
            url: `${SITE_URL}/series`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    try {
        const API_URL =
            process.env.BACKEND_API_URL ||
            "https://deen-series-server.vercel.app/api/v1";

        /* MOVIES */
        const moviesRes = await fetch(`${API_URL}/movies`, {
            next: { revalidate: 3600 },
        });

        const moviesJson = await moviesRes.json();

        const movieRoutes =
            moviesJson?.data?.map((movie: any) => ({
                url: `${SITE_URL}/movies/${movie.slug}`,
                lastModified: new Date(movie.updatedAt),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            })) || [];

        /* SERIES */
        const seriesRes = await fetch(`${API_URL}/series`, {
            next: { revalidate: 3600 },
        });

        const seriesJson = await seriesRes.json();

        const seriesRoutes =
            seriesJson?.data?.map((series: any) => ({
                url: `${SITE_URL}/series/${series.slug}`,
                lastModified: new Date(series.updatedAt),
                changeFrequency: "weekly" as const,
                priority: 0.9,
            })) || [];

        return [
            ...routes,
            ...movieRoutes,
            ...seriesRoutes,
        ];
    } catch (error) {
        console.error("Sitemap generation failed:", error);

        return routes;
    }
}