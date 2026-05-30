import axios from "axios";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().logout();
    }

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );

    return Promise.reject(error);
  }
);

export default axiosClient;