import { baseApi } from "@/store/api/baseApi";
import { TAG_TYPES } from "@/store/api/tag-types";

/* TYPES */
export interface Series {
  _id: string;

  /* BASIC INFO */
  title: string;
  slug: string;
  description?: string;
  tagline?: string;

  /* MEDIA */
  coverPoster?: string;
  thumbnailPoster?: string;

  /* META */
  genres?: string[];
  releaseDate?: string;

  /* STATUS */
  isPublished: boolean;

  /* EPISODES */
  totalEpisodes?: number;

  /* TIMESTAMPS */
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSeries {
  data: Series[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type GetSeriesParams = {
  page?: number;
  limit?: number;
  search?: string;
};

/* PAYLOAD TYPES */
export type CreateSeriesPayload = Partial<Series>;

export type UpdateSeriesPayload = {
  id: string;
  data: Partial<Series>;
};

export const seriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* GET ALL SERIES */
    getSeries: builder.query<PaginatedSeries, GetSeriesParams>({
      query: ({ page = 1, limit = 12, search = "" } = {}) => ({
        url: "/series",
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
            ...result.data.map((series) => ({
              type: TAG_TYPES.SERIES,
              id: series._id,
            })),
            { type: TAG_TYPES.SERIES, id: "LIST" },
          ]
          : [{ type: TAG_TYPES.SERIES, id: "LIST" }],
    }),

    /* CREATE SERIES */
    createSeries: builder.mutation<Series, CreateSeriesPayload>({
      query: (data) => ({
        url: "/series",
        method: "POST",
        data,
      }),

      invalidatesTags: [{ type: TAG_TYPES.SERIES, id: "LIST" }],
    }),

    /* UPDATE SERIES */
    updateSeries: builder.mutation<Series, UpdateSeriesPayload>({
      query: ({ id, data }) => ({
        url: `/series/${id}`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: (result, error, arg) => [
        { type: TAG_TYPES.SERIES, id: arg.id },
        { type: TAG_TYPES.SERIES, id: "LIST" },
      ],
    }),

    /* DELETE SERIES */
    deleteSeries: builder.mutation<void, string>({
      query: (id) => ({
        url: `/series/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        { type: TAG_TYPES.SERIES, id },
        { type: TAG_TYPES.SERIES, id: "LIST" },
      ],
    }),
  }),

  overrideExisting: false,
});

/* HOOKS */
export const {
  useGetSeriesQuery,
  useCreateSeriesMutation,
  useUpdateSeriesMutation,
  useDeleteSeriesMutation,
} = seriesApi;