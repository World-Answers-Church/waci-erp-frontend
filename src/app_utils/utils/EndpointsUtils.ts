let resolveBackendEndpoint = "https://waci-erp-backend.herokuapp.com";
if (window.location.hostname.includes("localhost") || window.location.hostname === "localhost") {
  resolveBackendEndpoint = "https://church-erp.azurewebsites.net";
} else {
  resolveBackendEndpoint = "https://church-erp.azurewebsites.net";
}

export const BASE_URL_ENDPOINT_PATH = resolveBackendEndpoint;
