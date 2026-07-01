"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Gauge } from "lucide-react";

export function AboutValues() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Trustworthy content",
      desc: "Every title is reviewed before it's added, so what you watch stays in line with the platform's purpose.",
    },
    {
      icon: Heart,
      title: "Built for the community",
      desc: "DeenSeries exists because finding good Islamic content shouldn't be hard. We built what we wished existed.",
    },
    {
      icon: Gauge,
      title: "Fast by default",
      desc: "No bloated pages, no unnecessary trackers — just a fast platform that respects your time and data.",
    },
  ];

  return (
    <section className="border-t border-border py-16">
      <div className="max-w-xl">
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
          What we stand for
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
          The principles behind the platform
        </h2>
      </div>

      <div className="mt-10 grid gap-px sm:grid-cols-3 bg-border rounded-lg overflow-hidden">
        {values.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            className="bg-background px-5 py-6"
          >
            <Icon className="w-4 h-4 text-primary" />
            <h3 className="mt-3 font-medium text-sm">{title}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              {desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}