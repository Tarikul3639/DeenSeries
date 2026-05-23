"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Tv,
} from "lucide-react";

/* DEMO DATA */
const demoSeries = [
  {
    id: "gilani",
    title: "Gilani Series",
    episodes: 24,
    year: "2025",
  },
  {
    id: "ertugrul",
    title: "Dirilis Ertugrul",
    episodes: 150,
    year: "2019",
  },
  {
    id: "osman",
    title: "Kurulus Osman",
    episodes: 120,
    year: "2023",
  },
];

export default function AdminSeriesPage() {
  const [search, setSearch] = useState("");

  const filtered = demoSeries.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Series Management
          </h1>
          <p className="text-sm text-zinc-500">
            Manage all your streaming series
          </p>
        </div>

        <Link
          href="/admin/create?type=series"
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          Add Series
        </Link>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />

        <input
          placeholder="Search series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-4 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        
        {/* HEAD */}
        <div className="grid grid-cols-4 gap-4 border-b border-zinc-100 px-5 py-3 text-xs font-semibold uppercase text-zinc-400">
          <span>Series</span>
          <span>Episodes</span>
          <span>Year</span>
          <span className="text-right">Actions</span>
        </div>

        {/* BODY */}
        <div className="divide-y">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center gap-4 px-5 py-4 hover:bg-zinc-50 transition"
            >
              
              {/* TITLE */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Tv className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-400">
                    ID: {item.id}
                  </p>
                </div>
              </div>

              {/* EPISODES */}
              <span className="text-sm text-zinc-600">
                {item.episodes}
              </span>

              {/* YEAR */}
              <span className="text-sm text-zinc-600">
                {item.year}
              </span>

              {/* ACTIONS */}
              <div className="flex items-center justify-end gap-2">

                <Link
                  href={`/admin/series/${item.id}`}
                  className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100"
                >
                  <Pencil className="h-4 w-4" />
                </Link>

                <button
                  className="rounded-lg border border-zinc-200 p-2 text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

              </div>
            </div>
          ))}

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <div className="py-10 text-center text-sm text-zinc-500">
              No series found
            </div>
          )}
        </div>
      </div>

    </div>
  );
}