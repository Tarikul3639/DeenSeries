import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await axiosClient.post("/auth/refresh");
        return axiosClient(error.config);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);