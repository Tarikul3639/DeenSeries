import HomePage from "./components/HomePage";
import { createMetadata } from "@/lib/metadata";
import { Film, Tv, PlayCircle } from "lucide-react";

export const metadata = createMetadata({
  title: "Watch Islamic Series and Movies Online",
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
    description:
      "Fresh Islamic movies and historical films added regularly for viewers.",
  },
  {
    icon: Tv,
    title: "Trending series",
    description:
      "Discover popular Islamic historical dramas and inspiring series.",
  },
  {
    icon: PlayCircle,
    title: "Continue watching",
    description:
      "Resume your favorite series and movies from where you stopped.",
  },
];

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <h1 className="sr-only">
        DeenSeries - Stream Islamic Movies, Historical Dramas, and TV Series
      </h1>

      {/* MAIN APP */}
      <HomePage />

      {/* SEO CONTENT */}
      <section className="border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 py-16">

          {/* HEADER */}
          <div className="relative max-w-2xl">
            <svg
              viewBox="0 0 24 24"
              className="absolute -top-6 -left-4 w-28 h-28 fill-primary/6 pointer-events-none"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>

            <span className="relative inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-primary"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>

              DeenSeries
            </span>

            <h1 className="relative mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-snug">
              Watch Islamic Series and Movies Online
            </h1>

            <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
              DeenSeries is a modern streaming platform dedicated to Islamic
              history, inspiring stories, and meaningful entertainment. Explore
              historical dramas, documentaries, and movies based on remarkable
              figures including Salahuddin Ayyubi, Ertugrul, Ottoman history,
              and renowned Islamic scholars.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Browse curated Islamic content, discover new releases, continue
              watching your favorite titles, and enjoy a clean experience across
              desktop, tablet, and mobile devices.
            </p>
          </div>

          {/* FEATURE STRIP */}
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="border-l-4 border-primary rounded-r-lg bg-card px-4 py-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <h2 className="mt-3 text-sm font-medium">
                  {title}
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* EXTRA CONTENT */}
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-lg font-semibold">
              Why watch on DeenSeries?
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Our library focuses on Islamic historical series, educational
              movies, biographies, and documentaries that encourage learning
              while providing an enjoyable viewing experience. New content is
              added regularly, making it easier to discover inspiring stories
              from Islamic civilization in one place.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}