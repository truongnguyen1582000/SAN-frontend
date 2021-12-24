import axios from 'axios';
import { STATIC_HOST } from '../constant';

const axiosClient = axios.create({
  baseURL: STATIC_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const user_token = localStorage.getItem('TOKEN');
    if (user_token) {
      config.headers['Authorization'] = 'Bearer ' + user_token;
    }
    config.headers['Content-type'] = 'application/json';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data.message);
  }
);

export default axiosClient;
