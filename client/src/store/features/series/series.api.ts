import { baseApi } from "@/store/api/baseApi";
import { TAG_TYPES } from "@/store/api/tag-types";

/* TYPES */
export interface Series {
  _id: string;
  title: string;
  description: string;
  poster: string;
  year: string;
}

/* PAYLOAD TYPES */
export type CreateSeriesPayload = Partial<Series>;

export type UpdateSeriesPayload = {
  id: string;
  data: Partial<Series>;
};

export const seriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* GET ALL SERIES */
    getSeries: builder.query<Series[], void>({
      query: () => ({
        url: "/series",
        method: "GET",
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: TAG_TYPES.SERIES,
                id: item._id,
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