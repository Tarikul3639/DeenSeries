"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MovieCard as SeriesCard, ItemProps } from "@/components/MovieCard";
import { fadeUp, stagger } from "@/components/animations";

interface SeriesGridProps {
  Series: ItemProps[];
}

export function SeriesGrid({ Series }: SeriesGridProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Series.map((Series) => (
        <motion.div
          key={Series._id}
          variants={fadeUp}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
        >
          <Link href={`/series/${Series._id}`} className="select-none group">
            <SeriesCard item={Series} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}