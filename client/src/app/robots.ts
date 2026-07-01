import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://deenseries.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/api/v1/home/featured",
          "/api/v1/movies",
          "/api/v1/series",
        ],

        disallow: [
          "/admin",
          "/login",

          // Private/API routes
          "/api/auth",
          "/api/admin",
          "/api/private",
        ],
      },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}