import { createMetadata } from "@/lib/metadata";
import { AboutHero } from "./components/AboutHero";
import { AboutGrid } from "./components/AboutGrid";
import { AboutValues } from "./components/AboutValues";
import { AboutFAQ } from "./components/AboutFAQ";
import { AboutCTA } from "./components/AboutCTA";

export const metadata = createMetadata({
  title: "About",
  description:
    "Learn about DeenSeries — a modern Islamic streaming platform to watch series and movies with a clean and distraction-free experience.",
  path: "/about",
  image: "/og/about.png",
  keywords: [
    "about DeenSeries",
    "Islamic streaming platform",
    "watch halal content",
  ],
});

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4">
        <AboutHero />
        <AboutGrid />
        <AboutValues />
        <AboutFAQ />
        <AboutCTA />
      </div>
    </main>
  );
}