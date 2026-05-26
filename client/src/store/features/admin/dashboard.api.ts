import { baseApi } from "@/store/api/baseApi";

/* TYPES */
export interface DashboardStats {
  totalMovies: number;
  totalSeries: number;
  totalEpisodes: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentSeries: {
    _id: string;
    title: string;
  }[];
  recentMovies: {
    _id: string;
    title: string;
  }[];
}

/* API */
export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
    }),
  }),
});

/* HOOK */
export const { useGetDashboardQuery } = dashboardApi;