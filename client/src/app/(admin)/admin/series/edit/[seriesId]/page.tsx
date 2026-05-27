"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BackLink } from "@/components/ui/BackLink";

import SeriesForm from "../../components/SeriesForm";

import {
  useGetSeriesQuery,
  useUpdateSeriesMutation,
} from "@/store/features/series/series.api";

import { toast } from "sonner";

export default function EditSeriesPage() {
  const { seriesId } = useParams();
  const router = useRouter();

  /* GET SERIES (from list) */
  const { data, isLoading } = useGetSeriesQuery({
    page: 1,
    limit: 50, // temporary workaround
  });

  const series = data?.data?.find((s) => s._id === seriesId);

  /* UPDATE */
  const [updateSeries, { isLoading: updating }] =
    useUpdateSeriesMutation();

  const handleSubmit = async (formData: any) => {
    try {
      toast.promise(updateSeries({
        seriesId: seriesId as string,
        data: formData,
      }).unwrap(), {
        loading: "Updating series...",
        success: "Series updated successfully",
        description: `Name: ${formData.title}`,
        error: (err: any) =>
          err?.data?.message || err?.message || "Update failed",
      });

      // router.push("/admin/series");
    } catch (err: any) {
      toast.error("Update failed", {
        description:
          err.data?.message || err.message || "An error occurred",
      });
    }

  };

  /* LOADING */
  if (isLoading) {
    return <p>Loading...</p>;
  }

  /* NOT FOUND */
  if (!series) {
    return <p>Series not found</p>;
  }

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
          Update series information
        </p>
      </div>

      {/* FORM */}
      <SeriesForm
        initialData={series}
        onSubmit={handleSubmit}
        loading={updating}
      />
    </div>
  );
}