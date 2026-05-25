"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, PlayCircle } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Logo } from "./Logo";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Series", href: "/series" },
  { label: "Movies", href: "/movies" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isMobile } = useResponsive();
  const ref = useClickOutside<HTMLDivElement>({
    onClose: () => setOpen(false),
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header ref={ref} className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8 sm:py-4">

        {/* Logo */}
        <Logo size={isMobile ? 42 : 49} />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 rounded-full border border-border/60 bg-background/60 p-1 shadow-sm md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition ${active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">

          <Link
            href="/login"
            className={`flex items-center rounded-md border px-3 py-2 text-xs sm:text-sm transition ${pathname === "/login"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground border-border"
              }`}
          >
            Admin Login
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex items-center justify-center rounded-lg p-2 sm:p-3 text-foreground transition hover:bg-muted md:hidden ${open ? "bg-muted" : ""}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-t border-border/60 bg-background/90 backdrop-blur-2xl md:hidden"
          >
            <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6">
              <div className="rounded-xl border border-border/60 bg-background/70 p-2 shadow-sm">

                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-lg px-3 py-2 text-sm transition ${active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/login"
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                >
                  <PlayCircle className="h-4 w-4" />
                  Admin Login
                </Link>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}