"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10"
      >
        <Film className="w-6 h-6 text-primary" />
      </motion.div>

      {/* Title */}
      <h3 className="text-base font-semibold tracking-tight">
        Nothing found
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        We couldn’t find any movies or series with your current filters.
        Try adjusting or reset everything to explore more.
      </p>

      {/* Action */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onReset}
        className="mt-6 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-sm hover:shadow-md transition capitalize"
      >
        Reset filters
      </motion.button>
    </motion.div>
  );
}