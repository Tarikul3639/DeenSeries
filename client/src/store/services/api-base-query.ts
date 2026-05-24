import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { axiosClient } from "./axios-client";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: string;
      data?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const res = await axiosClient({ url, method, data });
      return { data: res.data };
    } catch (error: any) {
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data,
        },
      };
    }
  };