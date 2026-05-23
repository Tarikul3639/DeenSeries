"use client";

import { motion } from "framer-motion";

export function AboutCTA() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold"
        >
          Start Watching Today
        </motion.h2>

        <p className="mt-2 text-muted-foreground">
          Discover meaningful content without distractions.
        </p>

        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          href="/series"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:shadow-md transition"
        >
          Browse Series →
        </motion.a>
      </div>
    </section>
  );
}