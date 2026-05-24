import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

/* AUTO REFRESH */
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axiosInstance.post("/auth/refresh");
        return axiosInstance(error.config);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);