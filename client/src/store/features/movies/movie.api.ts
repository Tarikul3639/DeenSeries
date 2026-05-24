import { baseApi } from "@/store/api/baseApi";
import { TAG_TYPES } from "@/store/api/tag-types";

/* TYPES */
export interface Movie {
  _id: string;

  /* BASIC INFO */
  title: string;
  slug: string;
  description?: string;
  tagline?: string;

  /* MEDIA */
  poster?: string;
  thumbnail?: string;

  /* VIDEO */
  embed: string;

  /* META */
  duration: string;
  releaseDate?: string;
  genres: string[];
  rating?: string;
  quality: string;

  /* STATUS */
  isPublished: boolean;

  /* TIMESTAMPS */
  createdAt: string;
  updatedAt: string;
}

/* PAYLOAD TYPES */
export type CreateMoviePayload = Partial<Movie>;

export type UpdateMoviePayload = {
  id: string;
  data: Partial<Movie>;
};

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* GET ALL MOVIES */
    getMovies: builder.query<Movie[], void>({
      query: () => ({
        url: "/movies",
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
            ...result.map((movie) => ({
              type: TAG_TYPES.MOVIE,
              id: movie._id,
            })),
            { type: TAG_TYPES.MOVIE, id: "LIST" },
          ]
          : [{ type: TAG_TYPES.MOVIE, id: "LIST" }],
    }),

    /* CREATE MOVIE */
    createMovie: builder.mutation<Movie, CreateMoviePayload>({
      query: (data) => ({
        url: "/movies",
        method: "POST",
        data,
      }),

      invalidatesTags: [{ type: TAG_TYPES.MOVIE, id: "LIST" }],
    }),

    /* UPDATE MOVIE */
    updateMovie: builder.mutation<Movie, UpdateMoviePayload>({
      query: ({ id, data }) => ({
        url: `/movies/${id}`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.MOVIE, id: arg.id },
        { type: TAG_TYPES.MOVIE, id: "LIST" },
      ],
    }),

    /* DELETE MOVIE */
    deleteMovie: builder.mutation<void, string>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        { type: TAG_TYPES.MOVIE, id },
        { type: TAG_TYPES.MOVIE, id: "LIST" },
      ],
    }),
  }),

  overrideExisting: false,
});

/* HOOKS */
export const {
  useGetMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = movieApi;