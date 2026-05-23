"use client";

import { useRouter } from "next/navigation";
import SeriesForm from "../components/SeriesForm";

export default function CreateSeriesPage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("NEW SERIES:", data);

    alert("Series created");

    router.push("/admin/series");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Add New Series
      </h1>

      <SeriesForm onSubmit={handleSubmit} />
    </div>
  );
}