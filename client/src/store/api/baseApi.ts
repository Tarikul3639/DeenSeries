import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../services/api-base-query";
import { TAG_TYPES } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
});