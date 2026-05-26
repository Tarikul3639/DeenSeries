"use client";

import { useRouter } from "next/navigation";
import MovieForm from "../components/MovieForm";
import { toast } from "sonner";
import { useCreateMovieMutation, CreateMoviePayload } from "@/store/features/movies/movie.api";
import { BackLink } from "@/components/ui/BackLink";

export default function CreateMoviePage() {
  const router = useRouter();
  const [createMovie, { isLoading }] = useCreateMovieMutation();

  const handleSubmit = async (data: CreateMoviePayload) => {
    console.log("Submitting Movie Data:", data);
    try {
      await createMovie(data).unwrap();
      // router.push("/admin/movies");
      toast.success("Movie created successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Create failed", {
        description: err?.data?.message || err?.message || "An error occurred",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        {/* 🔙 Back Button */}
        <BackLink
          href="/admin/movies"
          label="Back"
          hoverLabel="To Admin Movies"
          weight={150}
        />
        <h1 className="text-2xl font-semibold">Add Movie</h1>
      </div>

      <MovieForm onSubmit={handleSubmit} loading={isLoading} />
    </div>
  );
}