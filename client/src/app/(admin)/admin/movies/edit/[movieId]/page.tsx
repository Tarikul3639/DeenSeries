"use client";

import { useParams, useRouter } from "next/navigation";
import MovieForm from "./../../components/MovieForm";

/* DEMO LOAD */
const getMovie = () => ({
  title: "Omar Movie",
  description: "Islamic history drama",
  poster: "",
  year: "2024",
  duration: "2h 30m",
  embed: "",
});

export default function EditMoviePage() {
  const { movieId } = useParams();
  const router = useRouter();

  const handleSubmit = (data: any) => {
    console.log("UPDATED MOVIE:", movieId, data);

    alert("Movie updated");

    router.push("/admin/movies");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">
        Edit Movie
      </h1>

      <MovieForm
        initialData={getMovie()}
        onSubmit={handleSubmit}
      />
    </div>
  );
}