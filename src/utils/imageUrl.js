// =========================================================
// PROJECT IMAGE URL HELPER
// =========================================================

const API_ORIGIN =
  process.env.REACT_APP_API_ORIGIN ||
  "http://localhost:5000";

export function getImageUrl(value) {
  if (!value) {
    return "";
  }

  const raw = String(value).trim();

  if (!raw) {
    return "";
  }

  // Already a complete URL
  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("data:") ||
    raw.startsWith("blob:")
  ) {
    return raw;
  }

  // Normalize Windows slashes
  const normalized = raw.replace(/\\/g, "/");

  // Absolute path from backend
  if (normalized.startsWith("/")) {
    return `${API_ORIGIN}${normalized}`;
  }

  // Relative backend path
  return `${API_ORIGIN}/${normalized}`;
}

export default getImageUrl;