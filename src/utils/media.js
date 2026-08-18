const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000/api";

// Remove /api from the API URL so image URLs
// point to the Express static /images route.
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function getMediaUrl(raw) {
  if (!raw || typeof raw !== "string") {
    return "";
  }

  // Blob URLs are temporary browser URLs.
  if (raw.startsWith("blob:")) {
    return "";
  }

  // Already an absolute URL.
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // Old project image path:
  // /projects/file.png
  //
  // becomes:
  // https://therynox-api.onrender.com/images/projects/file.png
  if (raw.startsWith("/projects/")) {
    return `${API_ORIGIN}/images${raw}`;
  }

  // Correct backend image path:
  // /images/projects/file.png
  if (raw.startsWith("/images/")) {
    return `${API_ORIGIN}${raw}`;
  }

  // Relative path:
  // projects/file.png
  // file.png
  return `${API_ORIGIN}/images/${raw.replace(/^\/+/, "")}`;
}

export default getMediaUrl;