"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LockKeyhole, Shield } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Logo } from "./Logo";
import ThemeSelector from "./ThemeSelector";

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
    closeOnScroll: true,
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      ref={ref}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background backdrop-blur-2xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
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
          <ThemeSelector />

          <div className="flex items-center gap-2">
            {/* Admin Login */}
            <Link
              href="/login"
              aria-label="Admin Login"
              title="Admin Login"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-sm border transition-all duration-200 ${pathname === "/login"
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                }`}
            >
              <LockKeyhole className="size-4.5" />
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 md:hidden ${open
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                }`}
            >
              {open ? (
                <X className="size-4.5" />
              ) : (
                <Menu className="size-4.5" />
              )}
            </button>
          </div>
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
              <div className="rounded-xl space-y-1 border border-border/60 bg-background/70 p-2 shadow-sm">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-lg px-3 py-3 text-sm transition ${active
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
                  className="mt-2 flex items-center justify-center gap-2 rounded-full border border-border/80 bg-background px-3 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted/40"
                >
                  <div className="flex items-center justify-center rounded-md bg-primary/8 p-1.5">
                    <Shield className="size-3.5 text-primary" />
                  </div>

                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
