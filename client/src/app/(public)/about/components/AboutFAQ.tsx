"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Is DeenSeries free to use?",
    a: "Yes. DeenSeries is free to browse and watch — no subscription or payment is required.",
  },
  {
    q: "Do I need an account to watch?",
    a: "No login or sign-up is required. You can start watching series and movies right away.",
  },
  {
    q: "Does DeenSeries host the videos?",
    a: "No. DeenSeries embeds content from third-party sources rather than hosting video files directly.",
  },
  {
    q: "How often is new content added?",
    a: "New series, episodes, and movies are added on a regular basis as they become available.",
  },
];

export function AboutFAQ() {
  return (
    <section className="border-t border-border py-16">
      <div className="max-w-xl">
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-primary">
          Good to know
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-semibold tracking-tight">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-8 divide-y divide-border border-t border-b border-border">
        {faqs.map((item, i) => (
          <motion.details
            key={item.q}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            viewport={{ once: true }}
            className="group py-5"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="text-sm font-medium pr-4">{item.q}</span>
              <span className="text-primary text-lg leading-none shrink-0 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {item.a}
            </p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}