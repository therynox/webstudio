const API_ORIGIN =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

export function getMediaUrl(raw) {
  if (!raw || raw.startsWith("blob:")) return "";

  // Already an absolute URL
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  // Normalize old project paths
  if (raw.startsWith("/projects/")) {
    return `${API_ORIGIN}/images${raw}`;
  }

  // Already using the correct image path
  if (raw.startsWith("/images/")) {
    return `${API_ORIGIN}${raw}`;
  }

  // Relative image path
  return `${API_ORIGIN}/images/${raw.replace(/^\/+/, "")}`;
}