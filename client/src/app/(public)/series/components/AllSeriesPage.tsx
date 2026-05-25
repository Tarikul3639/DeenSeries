"use client";

import { useState } from "react";
import { SeriesFilters } from "./SeriesFilters";
import { SeriesGrid } from "./SeriesGrid";
import { EmptyState } from "@/components/EmptyState";
import { Loader2 } from "lucide-react";

// API
import { useGetSeriesQuery } from "@/store/features/series/series.api";
import { ErrorState } from "@/components/ErrorState";
import { Pagination } from "@/components/Pagination";

export default function AllSeriesPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const { data, isLoading, isError, error, refetch } = useGetSeriesQuery({
    page: page,
    limit: 12,
    search: activeQuery,
  });


  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* FILTERS */}
        <SeriesFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={() => {
            setPage(1); // Reset pagination
            setActiveQuery(searchQuery);
          }}
          onClear={() => {
            setPage(1); // Reset pagination
            setSearchQuery("");
            setActiveQuery("");
          }}
        />

        {isLoading && (
          <div className="flex-1 flex flex-col justify-center items-center min-h-100 gap-3">
            <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
            <p className="text-sm font-medium text-slate-500">Loading ...</p>
          </div>
        )}

        {isError && !isLoading && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <ErrorState
              title="Failed to load series"
              rawError={error}
              onRetry={refetch}
            />
          </div>
        )}

        {/* GRID */}
        {!isLoading && !isError && (
          <SeriesGrid Series={data?.data || []} />
        )}

        {/* EMPTY */}
        {!isLoading && data && data.data.length === 0 && (
          <div className="flex-1 flex items-center justify-center min-h-100">
            <EmptyState
              onReset={() => {
                setPage(1);
                setSearchQuery("");
                setActiveQuery("");
              }}
            />
          </div>
        )}

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