"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MovieCard, ItemProps } from "@/components/MovieCard";
import { fadeUp, stagger } from "@/components/animations";

interface MovieGridProps {
  movies: ItemProps[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <AnimatePresence mode="popLayout">
        {movies.map((movie) => (
          <motion.div
            key={movie._id}
            layout
            variants={fadeUp}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
          >
            <Link href={`/movies/${movie._id}`} className="select-none group">
              <MovieCard item={movie} />
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}