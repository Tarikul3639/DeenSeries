"use client";

import { useRouter } from "next/navigation";
import MovieForm from "../components/MovieForm";

export default function CreateMoviePage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("NEW MOVIE:", data);

    alert("Movie created");

    router.push("/admin/movies");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Add Movie
      </h1>

      <MovieForm onSubmit={handleSubmit} />
    </div>
  );
}