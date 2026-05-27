"use client";

import { useRouter } from "next/navigation";
import SeriesForm from "../components/SeriesForm";
import { BackLink } from "@/components/ui/BackLink";
import { toast } from "sonner";

import { Series, useCreateSeriesMutation } from "@/store/features/series/series.api";

export default function CreateSeriesPage() {
  const router = useRouter();
  const [createSeries, { isLoading }] = useCreateSeriesMutation();

  const handleSubmit = async (data: Omit<Series, "_id" | "createdAt" | "updatedAt" | "slug">) => {
    try {
      toast.promise(createSeries(data).unwrap(), {
        loading: "Creating series...",
        success: "Series created successfully",
        error: (err: any) =>
          err?.data?.message || err?.message || "Creation failed",
      });

      router.push("/admin/series");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col space-y-6 bg-muted/30 px-4 py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <BackLink
          href="/admin/series"
          label="Back"
          hoverLabel="To Admin Series"
          weight={150}
        />

        <p className="text-sm sm:text-base text-zinc-500 line-clamp-1">
          Create a new series
        </p>
      </div>

      <SeriesForm onSubmit={handleSubmit} loading={isLoading} />
    </div>
  );
}