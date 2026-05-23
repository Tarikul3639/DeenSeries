"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/10 via-transparent to-transparent" />

      <div className="mx-auto max-w-5xl px-4 py-24 text-center">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-3 py-1 text-xs text-primary font-medium animate-bounce"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Purpose-driven streaming
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          About <span className="text-primary">DeenSeries</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          A simple and distraction-free platform to explore meaningful Islamic
          series and movies — built for clarity, speed, and purpose.
        </motion.p>
      </div>
    </section>
  );
}