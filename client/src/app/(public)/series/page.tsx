import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import {
  Tv,
  Clapperboard,
  TrendingUp,
  Globe,
} from "lucide-react";
import AllSeriesPage from "./components/AllSeriesPage";

export const metadata: Metadata = createMetadata({
  title: "Islamic Series Collection - DeenSeries",
  description:
    "Explore Islamic historical series including Salahuddin Ayyubi, Ertugrul, and other inspiring stories. Watch meaningful Islamic content on DeenSeries.",
  path: "/series",
  image: "/og/series.png",
  keywords: [
    "Islamic series",
    "watch Islamic series",
    "Ertugrul series",
    "Salahuddin series",
    "Islamic historical shows",
    "Muslim history series",
  ],
  ogDescription:
    "Browse Islamic series collection including Ertugrul, Salahuddin Ayyubi and historical Islamic dramas on DeenSeries.",
});

const pillars = [
  {
    icon: Tv,
    title: "Trending series",
    description:
      "Discover the most popular Islamic historical dramas watched by our community.",
  },
  {
    icon: Clapperboard,
    title: "Historical journeys",
    description:
      "Follow remarkable stories from Islamic history, legendary leaders, and influential scholars.",
  },
  {
    icon: TrendingUp,
    title: "Community favorites",
    description:
      "Explore highly rated series that viewers continue to enjoy season after season.",
  },
  {
    icon: Globe,
    title: "Watch anywhere",
    description:
      "Enjoy your favorite Islamic series seamlessly across desktop, tablet, and mobile devices.",
  },
];

export default function SeriesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* MAIN APP UI */}
      <AllSeriesPage />

      {/* SEO CONTENT */}
      <section className="relative border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 py-14">

          {/* HEADER */}
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
              <StarIcon />
              Islamic Series
            </span>

            <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight leading-snug">
              Watch Islamic Historical Series Online
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Discover a carefully curated collection of Islamic historical
              series featuring legendary Muslim leaders, scholars, and
              civilizations. Watch inspiring stories based on faith, courage,
              knowledge, and real historical events.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              From Salahuddin Ayyubi and Ertugrul to the rise of great Islamic
              empires, DeenSeries offers meaningful entertainment with a clean,
              modern streaming experience for every device.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center justify-center gap-3 mt-8 mb-8">
            <div className="h-px w-20 bg-border" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <div className="h-px w-20 bg-border" />
          </div>

          {/* FEATURES */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 max-w-4xl mx-auto">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col items-center rounded-lg px-4 py-6 text-center transition hover:bg-card/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:text-primary">
                  <Icon className="h-4 w-4" />
                </div>

                <h2 className="mt-4 text-sm font-medium">
                  {title}
                </h2>

                <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* EXTRA SEO CONTENT */}
          <div className="max-w-3xl mx-auto mt-14 border-t border-border pt-8 text-center">
            <h2 className="text-lg font-semibold">
              Explore inspiring Islamic stories
            </h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Whether you are looking for historical Islamic dramas,
              educational series, biographies of influential Muslim figures,
              or stories from Islamic civilization, DeenSeries brings them
              together in one place. Our growing collection is selected to
              provide both meaningful entertainment and historical insight for
              viewers around the world.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-primary"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 0l2.39 7.36H22l-6.2 4.51 2.39 7.36L12 14.72l-6.2 4.51 2.39-7.36L2 7.36h7.61z" />
    </svg>
  );
}