"use client";

import Link from "next/link";
import { Mail as Facebook, Mail as Instagram, Mail as Youtube, Mail as Twitter, Mail } from "lucide-react";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              A clean and modern Islamic streaming platform where you can watch
              series and movies with a simple and beautiful experience.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              Explore
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/series"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/latest"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Latest Uploads
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
              Stay Updated
            </h3>

            <p className="mt-4 text-sm text-muted-foreground">
              Get updates on new series and episodes.
            </p>

            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
              />
              <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
                Join
              </button>
            </div>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              <a className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition">
                <Twitter className="h-4 w-4" />
              </a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© 2026 DeenSeries. All rights reserved.</p>
          <p>Watch with purpose.</p>
        </div>
      </div>
    </footer>
  );
}