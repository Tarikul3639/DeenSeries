import { baseApi } from "@/store/api/baseApi";
import { TAG_TYPES } from "@/store/api/tag-types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Movie {
  _id: string;

  // Basic Info
  title: string;
  slug: string;
  description?: string;
  tagline?: string;

  // Media
  poster?: string;
  thumbnail?: string;

  // Video
  embed: string;

  // Meta
  duration: string;
  releaseDate?: string;
  genres: string[];
  rating?: string;
  quality: string;

  // Status
  isPublished: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedMovies {
  data: Movie[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type CreateMoviePayload = Partial<Movie>;

export type UpdateMoviePayload = {
  movieId: string;
  data: Partial<Movie>;
};

export type GetMoviesParams = {
  page?: number;
  limit?: number;
  search?: string;
};

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<PaginatedMovies, GetMoviesParams>({
      query: ({ page = 1, limit = 12, search = "" } = {}) => ({
        url: "/movies",
        method: "GET",
        params: {
          page,
          limit,
          ...(search.trim() && { search: search.trim() }),
        },
      }),

      providesTags: (result) =>
        result?.data
          ? [
            ...result.data.map((movie) => ({
              type: TAG_TYPES.MOVIE,
              id: movie._id,
            })),
            { type: TAG_TYPES.MOVIE, id: "LIST" },
          ]
          : [{ type: TAG_TYPES.MOVIE, id: "LIST" }],
    }),

    getMovieById: builder.query<Movie, string>({
      query: (movieId) => ({ url: `/movies/${movieId}`, method: "GET" }),
      providesTags: (result, error, movieId) => [{ type: TAG_TYPES.MOVIE, id: movieId }],
    }),

    // createMovie: builder.mutation<Movie, CreateMoviePayload>({
    //   query: (data) => ({ url: "/movies", method: "POST", data }),
    //   invalidatesTags: [{ type: TAG_TYPES.MOVIE, id: "LIST" }],
    // }),

    updateMovie: builder.mutation<Movie, UpdateMoviePayload>({
      query: ({ movieId, data }) => ({
        url: `/movies/${movieId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.MOVIE, id: arg.movieId },
        { type: TAG_TYPES.MOVIE, id: "LIST" },
      ],
    }),

    deleteMovie: builder.mutation<void, string>({
      query: (movieId) => ({ url: `/movies/${movieId}`, method: "DELETE" }),
      invalidatesTags: (result, error, movieId) => [
        { type: TAG_TYPES.MOVIE, id: movieId },
        { type: TAG_TYPES.MOVIE, id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  // useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = movieApi;
