import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Providers from "./providers";
import { siteConfig } from "@/lib/metadata";

/* FONTS */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* VIEWPORT */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

/* METADATA */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  verification: {
    google: "wX9p5QSBg-V35tiEQef35nhxekmLe0tuCjPcXo04Yxo",
  },

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "series",
    "movies",
    "islamic content",
    "deen series",
    ...(siteConfig.keywords || []),
  ],

  authors: [{ name: siteConfig.name }],

  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: siteConfig.locale,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og/default.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og/default.png`],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
      )}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground">
        <Providers>
          <div
            className="flex min-h-dvh flex-col"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
              paddingLeft: "env(safe-area-inset-left)",
              paddingRight: "env(safe-area-inset-right)",
            }}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}