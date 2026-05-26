import { baseApi } from "@/store/api/baseApi";
import { TAG_TYPES } from "@/store/api/tag-types";
import { Series } from "../series/series.api";

/* TYPES */
export interface Episode {
    _id: string;

    seriesId: string;
    slug: string;

    title: string;
    description?: string;

    episodeNumber: number;
    embed: string;

    thumbnail?: string;
    duration?: string;
    quality: string;
    rating?: number;
    releaseDate?: string;

    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
}

export interface EpisodeResponse {
    episode: Episode[];
    series: Series;
}

export interface SingleEpisodeResponse {
    episode: Episode;
    series: Series;
}

/* API */
export const episodeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* GET ALL EPISODES (series-wise) */
        getEpisodesBySeries: builder.query<EpisodeResponse, string>({
            query: (seriesId) => ({
                url: `/episodes/series/${seriesId}`,
                method: "GET",
            }),

            providesTags: (result, error, seriesId) =>
                result
                    ? [
                        // individual episodes
                        ...result.episode.map((ep) => ({
                            type: TAG_TYPES.EPISODE,
                            id: ep._id,
                        })),

                        // series-wise list
                        {
                            type: TAG_TYPES.EPISODE,
                            id: seriesId,
                        },
                    ]
                    : [
                        {
                            type: TAG_TYPES.EPISODE,
                            id: seriesId,
                        },
                    ],
        }),

        /* GET SINGLE EPISODE */
        getEpisodeBySeries: builder.query<
            SingleEpisodeResponse,
            { seriesId: string; episodeId: string }
        >({
            query: ({ seriesId, episodeId }) => ({
                url: `/episodes/series/${seriesId}/${episodeId}`,
                method: "GET",
            }),

            providesTags: (result) =>
                result
                    ? [
                        {
                            type: TAG_TYPES.EPISODE,
                            id: result.episode._id,
                        },
                    ]
                    : [],
        }),

        /* DELETE EPISODE */
        deleteEpisode: builder.mutation<
            void,
            { episodeId: string; seriesId: string }
        >({
            query: ({ episodeId }) => ({
                url: `/episodes/${episodeId}`,
                method: "DELETE",
            }),

            invalidatesTags: (result, error, { episodeId, seriesId }) => [
                // Remove single cache
                { type: TAG_TYPES.EPISODE, id: episodeId },

                // Refetch only this series
                { type: TAG_TYPES.EPISODE, id: seriesId },
            ],
        }),

        /* UPDATE EPISODE */
        updateEpisode: builder.mutation<
            Episode,
            { episodeId: string; data: Partial<Episode> }
        >({
            query: ({ episodeId, data }) => ({
                url: `/episodes/${episodeId}`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: (result, error, { episodeId, data }) => [
                // Invalidate the updated episode
                { type: TAG_TYPES.EPISODE, id: episodeId },

                // If seriesId is updated, invalidate old and new series cache
                ...(data.seriesId
                    ? [
                        { type: TAG_TYPES.EPISODE, id: data.seriesId },
                    ]
                    : []),
            ],
        }),

        /* CREATE EPISODE (handled in series cache) */
        createEpisode: builder.mutation<Episode, { seriesId: string; data: Partial<Episode> }>({
            query: ({ seriesId, data }) => ({
                url: `/episodes/${seriesId}`,
                method: "POST",
                body: data,
            }),

            invalidatesTags: (result, error, { seriesId }) => [
                // Invalidate the series cache to refetch episodes
                { type: TAG_TYPES.EPISODE, id: seriesId },
            ],
        }),
    }),

    overrideExisting: true,
});

/* HOOKS */
export const {
    useGetEpisodesBySeriesQuery,
    useGetEpisodeBySeriesQuery,
    useDeleteEpisodeMutation,
    useUpdateEpisodeMutation,
    useCreateEpisodeMutation,
} = episodeApi;
