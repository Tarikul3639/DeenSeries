import type { Metadata } from "next";

export const siteConfig = {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? "DeenSeries",
    locale: "en_US",

    twitterHandle: "@deenseries",

    description:
        "DeenSeries is a modern Islamic streaming platform to watch series and movies with purpose. Explore Islamic history, stories, and educational content in a clean experience.",

    keywords: [
        "DeenSeries",
        "Islamic series",
        "Islamic movies",
        "Muslim history",
        "Islamic streaming",
        "watch Islamic content",
        "Ertugrul",
        "Salahuddin",
        "Islamic content",
        "Islamic education",
        "Islamic documentaries",
        "History of Islam",
        "Kurlush Osman",
        "kurlush osman season 2",
        "Hey Sultan",
        "Islamic platform",
    ],
} as const;

interface CreateMetadataOptions {
    title: string;
    description: string;
    path: string;
    keywords?: string[];
    image?: string;
    noIndex?: boolean;
    twitterCard?: "summary" | "summary_large_image";
    ogDescription?: string;
}

export function createMetadata({
    title,
    description,
    path,
    keywords = [],
    image = "/og/default.png",
    noIndex = false,
    twitterCard = "summary_large_image",
    ogDescription,
}: CreateMetadataOptions): Metadata {

    const canonical = `${siteConfig.url}${path}`;
    const ogImage = `${siteConfig.url}${image}`;

    return {
        title: title,
        description,
        keywords: [...siteConfig.keywords, ...keywords],

        alternates: {
            canonical,
        },

        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
            },
        },

        openGraph: {
            title,
            description: ogDescription ?? description,
            url: canonical,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        twitter: {
            card: twitterCard,
            title: title,
            description,
            site: siteConfig.twitterHandle,
            images: [ogImage],
        },
    };
}