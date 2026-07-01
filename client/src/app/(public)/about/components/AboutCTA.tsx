"use client";

import { motion } from "framer-motion";

export function AboutCTA() {
  return (
    <section className="border-t border-border">
      <div className="py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-serif font-semibold"
        >
          Start watching today
        </motion.h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Discover meaningful content without distractions.
        </p>

        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="/series"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:shadow-md transition"
        >
          Browse series →
        </motion.a>
      </div>
    </section>
  );
}