"use client";

import Link from "next/link";
import {
  Tv,
  Film,
  Layers,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import AddDropdown from "./components/AddDropdown";

/* DEMO DATA */
const stats = [
  {
    label: "Total Series",
    value: "12",
    icon: Tv,
    growth: "+12%",
  },
  {
    label: "Total Movies",
    value: "8",
    icon: Film,
    growth: "+5%",
  },
  {
    label: "Total Episodes",
    value: "124",
    icon: Layers,
    growth: "+18%",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto px-1 py-4">

      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            Dashboard <Sparkles className="h-5 w-5 text-primary/80 animate-pulse" />
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Welcome back 👋 Here is what&apos;s happening on your platform today.
          </p>
        </div>

        <AddDropdown/>
      </div>

      {/* STATS CARDS BLOCK */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-linear-to-br from-zinc-50/50 via-background to-background p-6 transition-all duration-300 hover:border-zinc-300 hover:bg-white active:scale-[0.99]"
            >
              {/* Modern subtle top light beam */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {item.label}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 text-zinc-600 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                  {item.value}
                </h2>
                <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                  <TrendingUp className="h-3 w-3" />
                  {item.growth}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS SECTION */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Quick Management Tools</h4>
        <div className="grid gap-5 md:grid-cols-2">
          
          <Link
            href="/admin/create?type=series"
            className="group relative overflow-hidden rounded-lg border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-primary transition-colors">
                  Add New Series
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Create episodes and structure seasons dynamically
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          <Link
            href="/admin/create?type=movie"
            className="group relative overflow-hidden rounded-lg border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 group-hover:text-primary transition-colors">
                  Add New Movie
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  Upload streaming content sources and manage logs
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* RECENT RECORDS TABLES */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* SERIES LIST PANEL */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Recent Series</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Latest updated streaming series lists</p>
            </div>

            <Link
              href="/admin/series"
              className="group flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-primary transition-colors"
            >
              View directory
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {["Gilani Series", "Ertugrul", "Osman"].map((item) => (
              <div
                key={item}
                className="group flex items-center justify-between rounded-sm border border-zinc-100 bg-zinc-50/30 px-4 py-3 transition-all duration-200 hover:border-zinc-200 hover:bg-white"
              >
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                  {item}
                </span>

                <Link
                  href="#"
                  className="text-xs font-semibold text-zinc-400 hover:text-primary transition-colors bg-white border border-zinc-100 px-2.5 py-1 rounded-md hover:border-primary/20"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MOVIES LIST PANEL */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Recent Movies</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Standalone media assets recently published</p>
            </div>

            <Link
              href="/admin/movies"
              className="group flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-primary transition-colors"
            >
              View directory
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {["Omar Movie", "Conquest 1453"].map((item) => (
              <div
                key={item}
                className="group flex items-center justify-between rounded-sm border border-zinc-100 bg-zinc-50/30 px-4 py-3 transition-all duration-200 hover:border-zinc-200 hover:bg-white"
              >
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                  {item}
                </span>

                <Link
                  href="#"
                  className="text-xs font-semibold text-zinc-400 hover:text-primary transition-colors bg-white border border-zinc-100 px-2.5 py-1 rounded-md hover:border-primary/20"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}