import axios from "axios";
import { STATIC_HOST } from "../constant";

const axiosClient = axios.create({
  baseURL: STATIC_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const user_token = localStorage.getItem("token");
    if (user_token) {
      config.headers["Authorization"] = "Bearer " + user_token;
    }
    config.headers["Content-type"] = "application/json";

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor

export default axiosClient;
