"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SeriesForm from "../../components/SeriesForm";

/* DEMO LOAD */
const getSeries = (id: string) => ({
  title: "Gilani Series",
  description: "Spiritual journey...",
  poster: "",
  year: "2025",
});

export default function EditSeriesPage() {
  const { seriesId } = useParams();
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("UPDATED SERIES:", seriesId, data);

    alert("Series updated");

    router.push("/admin/series");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* 🔙 HEADER */}
      <div className="flex items-center justify-between">
        
        <Link
          href="/admin/series"
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-primary transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to series
        </Link>

        <h1 className="text-lg font-semibold hidden sm:block">
          Edit Series
        </h1>
      </div>

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold sm:hidden">
          Edit Series
        </h1>
        <p className="text-sm text-zinc-500">
          Update series information
        </p>
      </div>

      {/* FORM */}
      <SeriesForm
        initialData={getSeries(seriesId as string)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}