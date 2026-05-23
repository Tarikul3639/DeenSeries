"use client";

import Link from "next/link";
import { Film, Plus, Pencil } from "lucide-react";

const movies = [
  { id: "omar", title: "Omar Movie" },
  { id: "conquest", title: "Conquest 1453" },
];

export default function MoviesPage() {
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Movies
        </h1>

        <Link
          href="/admin/movies/create"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Movie
        </Link>
      </div>

      <div className="space-y-3">
        {movies.map((m) => (
          <div
            key={m.id}
            className="flex items-center justify-between rounded-xl border p-4 bg-white"
          >
            <div className="flex items-center gap-3">
              <Film className="h-4 w-4 text-primary" />
              <span>{m.title}</span>
            </div>

            <Link href={`/admin/movies/edit/${m.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}