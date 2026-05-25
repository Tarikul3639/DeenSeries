import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAG_TYPES } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "api",

  // Base query configuration using fetchBaseQuery, which is a lightweight wrapper around fetch
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1", // Base URL for all API requests

    // All requests will include credentials (like cookies) for authentication
    credentials: "include",

    // Every request will automatically include the token from localStorage (if it exists)
    prepareHeaders: (headers) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});