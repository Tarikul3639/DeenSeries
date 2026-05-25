import { baseApi } from "@/store/api/baseApi";

/* TYPES (match backend DTO) */
export interface FeaturedItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  type: "series" | "movie";
  slug: string;
}

/* API */
export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeatured: builder.query<FeaturedItem[], void>({
      query: () => ({
        url: "/home/featured",
        method: "GET",
      }),
    }),
  }),
});

/* HOOK */
export const { useGetFeaturedQuery } = homeApi;