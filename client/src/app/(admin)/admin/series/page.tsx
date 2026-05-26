"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Pencil, Trash2, Tv } from "lucide-react";

import { Pagination } from "@/components/Pagination";

import {
  useGetSeriesQuery,
  useDeleteSeriesMutation,
} from "@/store/features/series/series.api";

import { toast } from "sonner";

export default function AdminSeriesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  /* API CALL */
  const { data, isLoading } = useGetSeriesQuery({
    page: page,
    limit: 12,
    search,
  });

  const [deleteSeries] = useDeleteSeriesMutation();

  const handleDelete = (id: string) => {
    let timeoutId: NodeJS.Timeout;

    toast("Series deleting...", {
      description: "You can undo this action",
      action: {
        label: "Undo",
        onClick: () => {
          clearTimeout(timeoutId);
          toast.success("Delete undone");
        },
      },
    });

    timeoutId = setTimeout(async () => {
      try {
        await deleteSeries(id).unwrap();
        toast.success(" Series deleted permanently");
      } catch (err) {
        toast.error("Delete failed");
      }
    }, 3000); // ⏳ 3 sec window
  };

  const seriesList = data?.data || [];

  return (
    <div className="min-h-screen flex flex-col space-y-6 bg-muted/30 px-4 py-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Series Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize your series content
          </p>
        </div>

        <Link
          href="/admin/series/create"
          className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Series
        </Link>
      </div>

      {/* SEARCH */}
      <div className="group relative max-w-md">
        <Search className="group-focus-within:text-primary absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder="Search series..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-sm border bg-white pl-9 pr-4 py-2 sm:py-2.5 text-sm sm:text-base outline-none focus:ring-1 focus:ring-primary/20 focus-within:border-primary transition"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border bg-white min-h-100">
        <table className="w-full border-collapse">
          {/* HEAD */}
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 w-[50%]">Series</th>
              <th className="text-left px-4 py-3 w-[15%]">Episodes</th>
              <th className="text-left px-4 py-3 w-[15%]">Year</th>
              <th className="text-right px-6 py-3 w-[20%]">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y">
            {/* LOADING */}
            {isLoading && (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-sm text-muted-foreground animate-pulse"
                >
                  Loading series...
                </td>
              </tr>
            )}

            {/* DATA */}
            {!isLoading &&
              seriesList.map((item) => (
                <tr
                  key={item._id}
                  onClick={() =>
                    router.push(`/admin/series/${item._id}/episodes`)
                  }
                  className="hover:bg-muted transition"
                >
                  {/* SERIES (WIDE COLUMN) */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                        <Tv className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold leading-tight">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item._id.slice(0, 10)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EPISODES */}
                  <td className="px-4 py-4 text-sm font-medium text-zinc-700">
                    {item.totalEpisodes ?? 0}
                  </td>

                  {/* YEAR */}
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    {item.releaseDate
                      ? new Date(item.releaseDate).getFullYear()
                      : "N/A"}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/series/edit/${item._id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg p-2 text-zinc-600 hover:bg-primary/10 hover:text-primary transition"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id);
                        }}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-100 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {/* EMPTY */}
            {!isLoading && seriesList.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-sm text-muted-foreground"
                >
                  No series found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {data && data.totalPages > 1 && (
        <div className="pt-4">
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
