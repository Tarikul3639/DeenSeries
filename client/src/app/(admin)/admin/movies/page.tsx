"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { Pagination } from "@/components/Pagination";
import { toast } from "sonner";

import {
  useGetMoviesQuery,
  useDeleteMovieMutation,
} from "@/store/features/movies/movie.api";

/* shadcn avatar */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function MoviesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMoviesQuery({ page, limit: 12 });
  const [deleteMovie, { isLoading: isDeleting }] = useDeleteMovieMutation();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    toast.promise(deleteMovie(id).unwrap(), {
      loading: "Deleting movie...",
      success: "Movie deleted",
      error: (err: any) =>
        err?.data?.message || err?.message || "Delete failed",
    });
  };

  const movies = data?.data || [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Movies</h1>

        <Link
          href="/admin/movies/create"
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-sm text-sm hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" />
          Add Movie
        </Link>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border bg-white overflow-x-auto">
        <table className="w-full text-sm">
          {/* HEAD */}
          <thead className="bg-muted/40 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3 w-15">#</th>
              <th className="text-left px-4 py-3">Movie</th>
              <th className="text-left px-4 py-3 w-30">Year</th>
              <th className="text-left px-4 py-3 w-25">Quality</th>
              <th className="text-right px-4 py-3 w-35">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {/* LOADING */}
            {isLoading && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  Loading movies...
                </td>
              </tr>
            )}

            {/* DATA */}
            {!isLoading &&
              movies.map((m, index) => (
                <tr
                  key={m._id}
                  onClick={() => router.push(`/admin/movies/edit/${m._id}`)}
                  className="border-t hover:bg-muted/50 transition"
                >
                  {/* INDEX */}
                  <td className="px-4 py-3 text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  {/* MOVIE */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <Avatar className="h-12 w-10 rounded-sm">
                        <AvatarImage
                          src={m.thumbnail || m.poster || ""}
                          alt={m.title}
                          className="object-cover rounded-none"
                        />
                        <AvatarFallback className="w-full h-full rounded bg-linear-to-br from-indigo-500 to-purple-500 text-white font-bold text-xs border-transparent">
                          {m.title.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">{m.title}</p>
                        <p className="text-xs text-muted-foreground">
                          ID: {m._id.slice(0, 6)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* YEAR */}
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {m.releaseDate
                        ? new Date(m.releaseDate).getFullYear()
                        : "N/A"}
                    </div>
                  </td>

                  {/* QUALITY */}
                  <td className="px-4 py-3">
                    <span className="bg-muted px-2 py-0.5 rounded-sm text-xs">
                      {m.quality}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex justify-end items-center gap-2">
                      {/* EDIT */}
                      <Link
                        href={`/admin/movies/edit/${m._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-sm border hover:bg-blue-50 text-blue-500 transition"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={(e) => {
                          handleDelete(m._id, m.title);
                          e.stopPropagation();
                        }}
                        disabled={isDeleting}
                        className="p-2 rounded-sm border hover:bg-red-50 text-red-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {/* EMPTY */}
            {!isLoading && movies.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground"
                >
                  No movies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
}
