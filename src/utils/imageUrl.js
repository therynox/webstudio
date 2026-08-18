const API_ORIGIN =
  process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL.replace(/\/api\/?$/, "")
    : "http://localhost:5000";

export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  // Already a complete URL
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  // Convert relative image path to API server URL
  if (imagePath.startsWith("/")) {
    return `${API_ORIGIN}${imagePath}`;
  }

  return `${API_ORIGIN}/${imagePath}`;
};

export default getImageUrl;