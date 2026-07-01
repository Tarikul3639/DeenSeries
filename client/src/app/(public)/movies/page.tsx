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
    title: "Full-length movies",
    description:
      "Enjoy complete Islamic movies and historical films without interruptions.",
  },
  {
    icon: BookOpen,
    title: "Historical stories",
    description:
      "Explore films inspired by Islamic history, scholars, leaders, and remarkable events.",
  },
  {
    icon: Sparkles,
    title: "Clean experience",
    description:
      "A modern interface focused on meaningful viewing with fewer distractions.",
  },
];

export default function MoviesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* MAIN APP UI */}
      <AllMoviesPage />

      {/* SEO CONTENT */}
      <section className="border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* HEADER */}
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
              <Film className="w-3.5 h-3.5" />
              Islamic Movies
            </span>

            <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-snug">
              Watch Islamic Movies Online
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Discover a growing collection of Islamic movies featuring
              historical events, inspiring personalities, and stories that
              highlight faith, courage, knowledge, and Islamic civilization.
              DeenSeries brings meaningful entertainment together in one place.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Browse historical dramas, biographies, documentaries, and other
              carefully selected films with a clean, fast, and distraction-free
              streaming experience across desktop and mobile devices.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="relative mt-10 mb-2 h-px bg-border">
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-border bg-background" />
            <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full border border-border bg-background" />
            <div
              className="absolute inset-0 border-t border-dashed border-border"
              aria-hidden="true"
            />
          </div>

          {/* FEATURES */}
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-background px-5 py-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <h2 className="mt-3 text-sm font-medium">
                  {title}
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* EXTRA SEO CONTENT */}
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold">
              Explore meaningful Islamic cinema
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Whether you are interested in historical Islamic movies,
              biographies of influential Muslim figures, or educational films,
              DeenSeries makes it easy to discover quality content. Our library
              continues to grow with carefully curated movies that provide both
              entertainment and valuable historical insight.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}