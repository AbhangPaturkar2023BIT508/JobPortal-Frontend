import axios from "axios";
import { navigateToLogin } from "../Services/AuthService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupResponseInterceptor = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        navigateToLogin(navigate);
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
