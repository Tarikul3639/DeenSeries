import { Metadata } from "next";
import MovieDetailClient from "./MovieDetailClient";

export async function generateMetadata(
  { params }: { params: Promise<{ movieId: string }> }
): Promise<Metadata> {

  const { movieId } = await params;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/movies/${movieId}`,
    { cache: "no-store" }
  );

  console.log("res: ", res);

  if (!res.ok) {
    return {
      title: "Movie not found",
    };
  }

  const movie = await res.json();

  return {
    title: movie?.title,
    description: movie?.description,

    openGraph: {
      title: movie?.title,
      description: movie?.description,
      images: [movie?.poster || "/og/movies.png"],
    },

    twitter: {
      card: "summary_large_image",
      title: movie?.title,
      description: movie?.description,
      images: [movie?.poster || "/og/movies.png"],
    },
  };
}

export default async function MoviePage(
  { params }: { params: Promise<{ movieId: string }> }
) {
  const { movieId } = await params;

  return <MovieDetailClient movieId={movieId} />;
}