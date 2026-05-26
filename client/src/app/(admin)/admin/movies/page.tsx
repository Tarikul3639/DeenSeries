"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { toast } from "sonner";

import {
  useGetMoviesQuery,
  useDeleteMovieMutation,
} from "@/store/features/movies/movie.api";

export default function MoviesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMoviesQuery({ page, limit: 12 });
  const [deleteMovie, { isLoading: isDeleting }] = useDeleteMovieMutation();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      toast.promise(deleteMovie(id).unwrap(), {
        loading: "Deleting movie...",
        success: "Movie deleted successfully",
        description: `Name: ${title}`,
        error: (err: any) =>
          err?.data?.message || err?.message || "Delete failed",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const movies = data?.data || [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Movies</h1>

        <Link
          href="/admin/movies/create"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Movie
        </Link>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {isLoading && <p>Loading...</p>}

        {movies.map((m) => (
          <div
            key={m._id}
            className="flex items-center justify-between rounded-xl border p-3 bg-white hover:shadow-sm transition"
          >
            {/* LEFT */}
            <div className="flex items-center gap-4">
              {/* IMAGE */}
              <div className="w-14 h-20 relative rounded-md overflow-hidden border bg-muted">
                <Image
                  src={m.thumbnail || m.poster || "/placeholder.jpg"}
                  alt={m.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="space-y-1">
                <p className="font-medium text-sm">{m.title}</p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {/* RELEASE DATE */}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {m.releaseDate
                        ? new Date(m.releaseDate).getFullYear()
                        : "N/A"}
                    </span>
                  </div>

                  {/* QUALITY */}
                  <span className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
                    {m.quality}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              {/* EDIT */}
              <Link href={`/admin/movies/edit/${m._id}`}>
                <Pencil className="h-4 w-4 text-blue-500 hover:scale-110 transition" />
              </Link>

              {/* DELETE */}
              <button onClick={() => handleDelete(m._id, m.title)} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 text-red-500 hover:scale-110 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {data && data?.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            // window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
}
