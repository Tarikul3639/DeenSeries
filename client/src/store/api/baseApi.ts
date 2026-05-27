import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAG_TYPES } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "api",

  // Base query configuration using fetchBaseQuery, which is a lightweight wrapper around fetch
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_PROXY || "/api/v1",

    // All requests will include credentials (like cookies) for authentication
    credentials: "include",
  }),

  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});