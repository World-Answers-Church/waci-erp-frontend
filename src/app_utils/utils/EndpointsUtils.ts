let resolveBackendEndpoint = "https://waci-erp-backend.herokuapp.com";
if (window.location.hostname.includes("localhost") || window.location.hostname === "localhost") {
  resolveBackendEndpoint = "http://localhost:8080";
} else {
  resolveBackendEndpoint = "https://waci-erp-backend.herokuapp.com";
}

export const BASE_URL_ENDPOINT_PATH = resolveBackendEndpoint;
