"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/6 via-transparent to-transparent" />

      <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-primary"
        >
          <CompassIcon />
          Purpose-driven streaming
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 text-3xl sm:text-4xl font-serif font-semibold tracking-tight"
        >
          About <span className="text-primary">DeenSeries</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-muted-foreground leading-relaxed"
        >
          A simple, distraction-free platform to explore meaningful Islamic
          series and movies — built for clarity, speed, and purpose.
        </motion.p>
      </div>
    </section>
  );
}

function CompassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-primary" {...props}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}