"use client";

import Link from "next/link";
import {
  Tv,
  Film,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Plus,
} from "lucide-react";

import { useGetDashboardQuery } from "@/store/features/admin/dashboard.api";

/* shadcn dropdown */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const { data, isLoading } = useGetDashboardQuery();

  const stats = [
    {
      label: "Total Series",
      value: data?.stats.totalSeries || 0,
      icon: Tv,
      growth: "+--",
    },
    {
      label: "Total Movies",
      value: data?.stats.totalMovies || 0,
      icon: Film,
      growth: "+--",
    },
    {
      label: "Total Episodes",
      value: data?.stats.totalEpisodes || 0,
      icon: Layers,
      growth: "+--",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Sparkles className="h-8 w-8 text-primary/80 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 sm:pb-6">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            Dashboard
            <Sparkles className="h-5 w-5 text-primary/80 animate-pulse" />
          </h1>

          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Welcome back. Here is what's happening today.
          </p>
        </div>

        {/* ShadCN Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex justify-center items-center max-sm:self-end max-w-32 px-4 py-2 rounded-sm bg-primary text-white text-sm cursor-pointer hover:bg-primary/90 transition">
              <Plus className="size-4 sm:size-4.5 mr-1" />
              Add New
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-40 rounded-sm border border-zinc-100 bg-white p-1"
          >
            <DropdownMenuItem
              asChild
              className="rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100"
            >
              <Link href="/admin/series/create">
                <Tv className="size-4 mr-1" />
                Add Series
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              asChild
              className="rounded-sm px-3 py-2 text-sm cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100"
            >
              <Link href="/admin/movies/create">
                <Film className="size-4 mr-1" />
                Add Movie
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-xl border border-zinc-200 bg-white p-4 sm:p-6 hover:border-zinc-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase text-zinc-400">
                  {item.label}
                </span>

                <div className="h-9 w-9 flex items-center justify-center rounded-md bg-zinc-50 border text-zinc-600 group-hover:text-primary group-hover:bg-primary/10 transition">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                  {item.value}
                </h2>

                <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {item.growth}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUICK ACTIONS */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase text-zinc-400">
          Quick Tools
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Link
            href="/admin/series/create"
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
              <div className="flex p-2 items-center justify-center rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <ArrowUpRight className="size-4 sm:size-4.5" />
              </div>
            </div>
          </Link>

          <Link
            href="/admin/movies/create"
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
              <div className="flex p-2 items-center justify-center rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                <ArrowUpRight className="size-4 sm:size-4.5" />
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* SERIES */}
        <div className="rounded-xl border bg-white p-4 sm:p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Series</h3>

            <Link href="/admin/series" className="text-xs text-zinc-500">
              View
            </Link>
          </div>

          <div className="space-y-2">
            {data?.recentSeries?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded-sm px-3 py-2 hover:bg-zinc-50"
              >
                <span className="text-sm">{item.title}</span>

                <Link
                  href={`/admin/series/edit/${item._id}`}
                  className="text-xs text-primary"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* MOVIES */}
        <div className="rounded-xl border bg-white p-4 sm:p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-base font-semibold">Recent Movies</h3>

            <Link href="/admin/movies" className="text-xs text-zinc-500">
              View
            </Link>
          </div>

          <div className="space-y-2">
            {data?.recentMovies?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded-sm px-3 py-2 hover:bg-zinc-50"
              >
                <span className="text-sm">{item.title}</span>

                <Link
                  href={`/admin/movies/edit/${item._id}`}
                  className="text-xs text-primary"
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