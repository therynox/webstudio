import axios from "axios";

// =====================================================
// API BASE URL
// =====================================================
//
// Local:
//   http://localhost:5000/api
//
// Production:
//   https://therynox-api.onrender.com/api
//
// CRA uses REACT_APP_* variables at build time.
//
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// =====================================================
// REQUEST INTERCEPTOR
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(
      "therynox_admin_token"
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let Axios/browser set the correct multipart boundary
    // when uploading FormData.
    if (
      typeof FormData !== "undefined" &&
      config.data instanceof FormData
    ) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      console.error(
        "API AUTHENTICATION FAILED:",
        error.response?.data
      );

      const currentPath = window.location.pathname;

      if (currentPath !== "/admin/login") {
        localStorage.removeItem(
          "therynox_admin_token"
        );

        localStorage.removeItem(
          "therynox_admin"
        );

        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;