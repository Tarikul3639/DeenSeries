"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MovieCard as SeriesCard, ItemProps } from "@/components/MovieCard";
import { fadeUp, stagger } from "@/components/animations";

interface SeriesEpisodesGridProps {
  episodes: ItemProps[];
  seriesId: string;
}

export function SeriesEpisodesGrid({ episodes, seriesId }: SeriesEpisodesGridProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {episodes.map((episode) => (
        <motion.div
          key={episode._id}
          variants={fadeUp}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
        >
          <Link href={`/series/${seriesId}/${episode._id}`} className="select-none group">
            <SeriesCard item={episode} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}