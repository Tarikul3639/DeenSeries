import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://deenseries.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",

        disallow: [
          "/admin",
          "/login",
          "/api",
        ],
      },
    ],

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}