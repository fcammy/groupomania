export const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api/v1"
    : "https://mydomain.com/api/v1";

export const FILE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/uploads/"
    : "https://mydomain.com";
