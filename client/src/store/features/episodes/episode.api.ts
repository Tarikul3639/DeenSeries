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

/* 🔥 SINGLE EPISODE RESPONSE */
export interface SingleEpisodeResponse {
    episode: Episode;
    series: Series;
}

/* API */
export const episodeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /* GET ALL EPISODES */
        getEpisodesBySeries: builder.query<EpisodeResponse, string>({
            query: (seriesId) => ({
                url: `/episodes/series/${seriesId}`,
                method: "GET",
            }),

            providesTags: (result) =>
                result
                    ? [
                        ...result.episode.map((ep) => ({
                            type: TAG_TYPES.EPISODE,
                            id: ep._id,
                        })),
                        { type: TAG_TYPES.EPISODE, id: "LIST" },
                    ]
                    : [{ type: TAG_TYPES.EPISODE, id: "LIST" }],
        }),

        /* GET SINGLE EPISODE (SERIES WISE) */
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

    }),

    overrideExisting: true,
});

/* HOOKS */
export const {
    useGetEpisodesBySeriesQuery,
    useGetEpisodeBySeriesQuery,
} = episodeApi;