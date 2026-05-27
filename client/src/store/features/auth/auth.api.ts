import { baseApi } from "@/store/api/baseApi";
import { TAG_TYPES } from "@/store/api/tag-types";

/* TYPES (recommended) */
interface LoginPayload {
  password: string;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* LOGIN */
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [TAG_TYPES.AUTH],
    }),

    /* LOGOUT */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: [TAG_TYPES.AUTH],
    }),

    /* REFRESH */
    refresh: builder.mutation<{ access_token: string }, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
  }),

  overrideExisting: false,
});

/* HOOKS */
export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApi;