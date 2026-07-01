import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Tv, Clapperboard, TrendingUp, Globe } from "lucide-react";
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
      "The historical dramas viewers are watching most right now, updated as new episodes land.",
  },
  {
    icon: Clapperboard,
    title: "Stories from history",
    description:
      "Series built on real lives and real eras — from Salahuddin Ayyubi to the rise of the Ottomans.",
  },
  {
    icon: TrendingUp,
    title: "Highly rated",
    description:
      "Picks the community keeps coming back to, season after season.",
  },
  {
    icon: Globe,
    title: "Watch anywhere",
    description:
      "Stream on any device, continue exactly where you left off.",
  },
];

export default function SeriesPage() {
  return (
    <main className="bg-background text-foreground">
      {/* MAIN APP UI */}
      <AllSeriesPage />

      {/* SEO + CONTEXT SECTION */}
      <section className="relative border-t border-border mt-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* HEADER (CENTERED) */}
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
              <StarIcon />
              Islamic History, Retold
            </span>

            <h2 className="mt-3 text-xl sm:text-2xl font-serif font-semibold tracking-tight leading-snug">
              A series collection built around stories worth remembering
            </h2>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              From the courage of Salahuddin Ayyubi to the journey of Ertugrul,
              DeenSeries brings together Islamic historical dramas that inform
              as much as they entertain — chosen for substance, not just spectacle.
            </p>
          </div>

          {/* DIVIDER (CENTERED STYLE) */}
          <div className="flex items-center justify-center gap-3 mt-8 mb-6">
            <div className="h-px w-20 bg-border" />
            <StarIcon className="w-3 h-3 fill-primary" />
            <div className="h-px w-20 bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group flex flex-col items-center text-center gap-2 py-5 px-3 hover:bg-card/50 transition rounded-lg"
              >
                {/* ICON (TOP) */}
                <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </div>

                {/* TITLE */}
                <h3 className="font-medium text-sm">{title}</h3>

                {/* DESCRIPTION */}
                <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
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

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary" {...props}>
      <path d="M12 0l2.39 7.36H22l-6.2 4.51 2.39 7.36L12 14.72l-6.2 4.51 2.39-7.36L2 7.36h7.61z" />
    </svg>
  );
}