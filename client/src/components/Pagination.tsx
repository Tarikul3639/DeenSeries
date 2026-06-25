"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Hide pagination if only one page exists
  if (totalPages <= 1) return null;

  // Smart pagination range generator (with ellipsis)
  const getPaginationRange = () => {
    const current = page;
    const total = totalPages;

    // Show all pages if total is small
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];

    // Always include first page
    range.push(1);

    // Leading ellipsis
    if (current > 3) {
      range.push("...");
    }

    // Middle range
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Trailing ellipsis
    if (current < total - 2) {
      range.push("...");
    }

    // Always include last page
    range.push(total);

    return range;
  };

  return (
    <div className="flex justify-center items-center gap-2 pt-10 flex-wrap w-full">
      {/* Previous Button */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-2 rounded-md border bg-background text-sm disabled:opacity-40 hover:bg-muted transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {getPaginationRange().map((p, index) => {
        if (p === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-muted-foreground text-sm font-medium select-none"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={`page-${p}`}
            onClick={() => onPageChange(p as number)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md border min-w-9 transition-all cursor-pointer ${p === page
              ? "bg-primary border-primary text-primary-foreground shadow-sm"
              : "bg-background border-border text-foreground hover:bg-muted"
              }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="p-2 rounded-md border bg-background text-sm disabled:opacity-40 hover:bg-muted transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* USAGE EXAMPLE:
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
*/
