import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
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

    // Let the browser/Axios set the multipart boundary for FormData.
    if (typeof FormData !== "undefined" && config.data instanceof FormData) {
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

      /*
       * Do NOT immediately remove the token for
       * every 401 while developing.
       *
       * This makes debugging much easier.
       */

      const currentPath = window.location.pathname;

      // If user is already on login page,
      // don't redirect again.
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