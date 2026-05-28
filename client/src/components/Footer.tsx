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

            {/* Newsletter Form */}
            <form
              action="https://formsubmit.co/tarikulislam3639@gmail.com"
              method="POST"
              className="mt-5"
            >
              {/* Hidden Config */}
              <input
                type="hidden"
                name="_subject"
                value="🎬 New Newsletter Subscription"
              />

              <input
                type="hidden"
                name="_captcha"
                value="false"
              />

              <input
                type="hidden"
                name="_template"
                value="table"
              />

              <input
                type="hidden"
                name="_autoresponse"
                value="Thanks for subscribing to our newsletter!"
              />

              {/* Input + Button */}
              <div className="group flex items-center overflow-hidden rounded-2xl border border-border bg-muted/40 backdrop-blur transition focus-within:border-primary/40 focus-within:bg-background">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="h-12 w-full bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />

                <button
                  type="submit"
                  className="m-1 flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:scale-[0.98] hover:opacity-90 active:scale-95"
                >
                  Join
                </button>
              </div>

              {/* Bottom Text */}
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. Only new episodes and series updates.
              </p>
            </form>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com/tarikul3639"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.54V9.84c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.26 0-1.65.79-1.65 1.6v1.92h2.8l-.45 2.9h-2.35V22c4.78-.75 8.44-4.91 8.44-9.93z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/tarikul3639"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 1.8h8.5a3.95 3.95 0 013.95 3.95v8.5a3.95 3.95 0 01-3.95 3.95h-8.5a3.95 3.95 0 01-3.95-3.95v-8.5A3.95 3.95 0 017.75 3.8zm8.95 1.35a.95.95 0 100 1.9.95.95 0 000-1.9zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.8A3.2 3.2 0 1112 15.2 3.2 3.2 0 0112 8.8z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="https://x.com/tarikul3639"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M18.9 2H22l-6.77 7.74L23 22h-6.82l-5.34-6.98L4.74 22H1.63l7.24-8.27L1 2h7l4.82 6.35L18.9 2zm-1.2 18h1.89L6.97 3.9H4.94L17.7 20z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M21.8 8s-.2-1.42-.82-2.05c-.8-.83-1.7-.83-2.12-.88C15.9 4.8 12 4.8 12 4.8h-.01s-3.89 0-6.86.27c-.42.05-1.32.05-2.12.88C2.4 6.58 2.2 8 2.2 8S2 9.67 2 11.33v1.56C2 14.55 2.2 16.2 2.2 16.2s.2 1.42.81 2.05c.8.83 1.86.8 2.33.9 1.69.16 6.66.26 6.66.26s3.9-.01 6.86-.28c.42-.05 1.32-.05 2.12-.88.62-.63.82-2.05.82-2.05s.2-1.66.2-3.32v-1.56C22 9.67 21.8 8 21.8 8zM9.75 15.02V8.98l5.8 3.03-5.8 3.01z" />
                </svg>
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