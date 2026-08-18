import axios from "axios";

// =====================================================
// PRODUCTION / LOCAL API URL
// =====================================================
//
// Production:
// REACT_APP_API_URL=https://therynox-api.onrender.com/api
//
// Local:
// If the environment variable is not present,
// localhost:5000/api will be used.
//

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
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let Axios/browser set the multipart boundary
    // automatically when sending FormData.
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