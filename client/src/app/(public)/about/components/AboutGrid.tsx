"use client";

import { motion } from "framer-motion";
import { Target, Sparkles, Cpu, AlertTriangle } from "lucide-react";

export function AboutGrid() {
  const items = [
    {
      icon: Target,
      title: "Our mission",
      desc: "Provide a clean, fast, distraction-free experience for beneficial Islamic content.",
    },
    {
      icon: Sparkles,
      title: "What we offer",
      list: [
        "Organized Islamic series & episodes",
        "Clean, modern interface",
        "Multiple video sources",
        "No login required",
      ],
    },
    {
      icon: Cpu,
      title: "Technology",
      desc: "Built with Next.js and Tailwind, backed by a lightweight, fast-loading data system.",
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      desc: "We do not host videos. Content is embedded from third-party sources.",
    },
  ];

  return (
    <section className="py-16">
      <div className="relative">
        {/* connecting thread */}
        <div
          className="absolute left-3.75 top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />

        <div className="space-y-10">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative pl-11"
              >
                <div className="absolute left-0 top-0.5 w-7.75 h-7.75 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>

                <h2 className="text-base font-semibold">{item.title}</h2>

                {item.list ? (
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {item.list.map((l) => (
                      <li key={l} className="flex gap-2">
                        <span className="text-primary">—</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}