import { createMetadata } from "@/lib/metadata";
import AllMoviesPage from "./components/AllMoviesPage";
import { Film, BookOpen, Sparkles } from "lucide-react";

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
  image: "/og/movies.png",
});

const features = [
  {
    icon: Film,
    title: "Full-length features",
    description:
      "Complete films, not clips — stories from Islamic history told start to finish.",
  },
  {
    icon: BookOpen,
    title: "Rooted in history",
    description:
      "Built on real lives and real events, not loosely inspired retellings.",
  },
  {
    icon: Sparkles,
    title: "Distraction-free",
    description:
      "No clutter, no autoplay noise on the page — just the film, ready to watch.",
  },
];

export default function MoviesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* MAIN APP UI */}
      <AllMoviesPage />

      {/* SEO CONTENT */}
      <section className="border-t border-border mt-10">
        <div className="max-w-5xl mx-auto px-4 py-16">
          {/* HEADER */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
              <Film className="w-3.5 h-3.5" />
              Now Showing
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-snug">
              Islamic movies, told as full stories
            </h2>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              From historical epics to biographical dramas, DeenSeries hosts
              Islamic movies built around substance — picked for the story,
              not the runtime.
            </p>
          </div>

          {/* TICKET STUB DIVIDER */}
          <div className="relative mt-10 mb-2 h-px bg-border">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-background border border-border" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-background border border-border" />
            <div
              className="absolute inset-0 border-t border-dashed border-border"
              aria-hidden="true"
            />
          </div>

          {/* FEATURE TICKETS */}
          <div className="grid gap-px sm:grid-cols-3 bg-border mt-6 rounded-lg overflow-hidden">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-background px-5 py-6">
                <Icon className="w-4 h-4 text-primary" />
                <h3 className="mt-3 font-medium text-sm">{title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
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