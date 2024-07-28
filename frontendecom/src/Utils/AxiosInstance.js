import axios from "axios";
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    const baseurl = process.env.REACT_APP_API_BASE_URL;
    config.baseURL = baseurl;

    const token = sessionStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  function (response) {
    // If the response is not decrypted, return the original response
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
