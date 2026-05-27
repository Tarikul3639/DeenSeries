import { baseApi } from "@/store/api/baseApi";

export const mediaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /* GET SIGNATURE */
        getSignature: builder.query<any, void>({
            query: () => ({
                url: "/media/signature",
                method: "GET",
            }),
        }),

        deleteMedia: builder.mutation<void, string>({
            query: (publicId) => ({
                url: `/media?publicId=${publicId}`,
                method: "DELETE",
            }),
        }),

    }),
});

export const {
    useLazyGetSignatureQuery,
    useDeleteMediaMutation,
} = mediaApi;