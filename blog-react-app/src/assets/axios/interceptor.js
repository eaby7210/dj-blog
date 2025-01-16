import axios from "axios";
import store from "../redux/store";
import { userLogout } from "../redux/userSlice";

const protocol = window.location.protocol === "https:" ? "https" : "http";
export const dn = import.meta.env.VITE_BASE_URL || "localhost:8000";
export const baseurl = `${protocol}://${dn}`;

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    //?      configurations:
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    //! response configuration
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(`${baseurl}/auth/token/refresh/`, null, {
          withCredential: true,
        });

        return apiClient(originalRequest);
      } catch {
        store.dispatch(userLogout());
        return null;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
