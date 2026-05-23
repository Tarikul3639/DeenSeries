"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, Cpu, AlertTriangle } from "lucide-react";

export function AboutGrid() {
  const items = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "Provide a clean, fast, and distraction-free experience for beneficial Islamic content.",
    },
    {
      icon: Sparkles,
      title: "What We Offer",
      list: [
        "Organized Islamic series & episodes",
        "Clean modern UI",
        "Multiple video sources",
        "No login required",
      ],
    },
    {
      icon: Cpu,
      title: "Technology",
      desc: "Built with Next.js and Tailwind using a lightweight JSON system.",
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      desc: "We do not host videos. Content is embedded from third-party sources.",
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border/60 bg-muted/30 p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </div>

              {item.list ? (
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {item.list.map((l) => (
                    <li key={l}>• {l}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground leading-7">
                  {item.desc}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}