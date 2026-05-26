"use client";

import { useParams, useRouter } from "next/navigation";
import MovieForm from "../../components/MovieForm";

import { BackLink } from "@/components/ui/BackLink";

import {
  useGetMovieByIdQuery,
  useUpdateMovieMutation,
} from "@/store/features/movies/movie.api";

import { toast } from "sonner";
import { CreateMoviePayload } from "@/store/features/movies/movie.api";

export default function EditMoviePage() {
  const { movieId } = useParams();
  const router = useRouter();

  /* GET MOVIE */
  const { data, isLoading } = useGetMovieByIdQuery(movieId as string);

  /* UPDATE */
  const [updateMovie, { isLoading: updating }] =
    useUpdateMovieMutation();

  const handleSubmit = async (formData: CreateMoviePayload) => {
    try {
      await updateMovie({
        movieId: movieId as string,
        data: formData,
      }).unwrap();

      toast.success("Movie updated successfully");
      // router.push("/admin/movies");
    } catch (err: any) {
      toast.error("Update failed", {
        description:
          err.data?.message || err.message || "An error occurred",
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        {/* 🔙 Back Button */}
        <BackLink
          href="/admin/movies"
          label="Back"
          hoverLabel="To Admin Movies"
          // weight={25}
        />

        <h1 className="text-2xl font-semibold">Edit Movie</h1>
      </div>
      <MovieForm
        initialData={data}
        onSubmit={handleSubmit}
        loading={updating}
      />
    </div>
  );
}