import { Metadata } from "next";
import MovieDetailClient from "./MovieDetailClient";

async function getMovie(movieId: string) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/movies/${movieId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata(
  { params }: { params: Promise<{ movieId: string }> }
): Promise<Metadata> {
  const { movieId } = await params;
  const movie = await getMovie(movieId);

  if (!movie) {
    return {
      title: "Movie not found",
    };
  }

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
  const movie = await getMovie(movieId);

  const jsonLd = movie
    ? {
      "@context": "https://schema.org",
      "@type": "Movie",
      name: movie.title,
      description: movie.description,
      image: movie.poster || "/og/movies.png",
      ...(movie.releaseDate && { datePublished: movie.releaseDate }),
      ...(movie.genre && { genre: movie.genre }),
      ...(movie.duration && { duration: movie.duration }),
      ...(movie.rating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: movie.rating,
          bestRating: "10",
        },
      }),
      url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/movies/${movieId}`,
    }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <MovieDetailClient movieId={movieId} />
    </>
  );
}