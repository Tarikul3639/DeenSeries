import HomePage from "./components/HomePage";
import { createMetadata } from "@/lib/metadata";
import { Film, Tv, PlayCircle } from "lucide-react";

export const metadata = createMetadata({
  title: "DeenSeries - Watch Islamic Series and Movies Online",
  description:
    "Watch Islamic series and movies on DeenSeries. Explore stories of Salahuddin, Ertugrul, and Islamic history in a clean, modern platform.",
  path: "/",
  image: "/og-homepage.png",
  keywords: [
    "watch Islamic series",
    "Islamic streaming platform",
    "Islamic movies online",
    "Ertugrul series",
    "Salahuddin Ayyubi series",
  ],
  ogDescription:
    "Stream high-quality Islamic series and movies including Ertugrul, Salahuddin, and more.",
});

const features = [
  {
    icon: Film,
    title: "New movies",
    description: "Fresh Islamic titles added to the library on a regular basis.",
  },
  {
    icon: Tv,
    title: "Trending series",
    description: "The historical dramas audiences are watching most right now.",
  },
  {
    icon: PlayCircle,
    title: "Continue watching",
    description: "Pick up any title exactly where you left off, on any device.",
  },
];

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      {/* MAIN APP UI */}
      <HomePage />

      {/* SEO CONTENT */}
      <section className="border-t border-border mt-10">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* HEADER WITH WATERMARK */}
          <div className="relative max-w-xl">
            <svg
              viewBox="0 0 24 24"
              className="absolute -top-6 -left-4 w-28 h-28 fill-primary/6 z-0 pointer-events-none"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>

            <span className="relative inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-primary">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              DeenSeries
            </span>

            <h2 className="relative mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-snug">
              Islamic series and movies, in one place
            </h2>

            <p className="relative mt-3 text-sm text-muted-foreground leading-relaxed">
              Stories of Salahuddin Ayyubi, Ertugrul, and other Islamic
              history brought together on a clean, modern platform built for
              regular watching, not just browsing.
            </p>
          </div>

          {/* FEATURE STRIP */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border-l-4 border-primary bg-card rounded-r-lg px-4 py-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="mt-3 font-medium text-sm">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}