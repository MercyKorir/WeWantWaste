import axios from "axios";
import type { Skip, ApiError } from "../types";

const API_BASE_URL = "https://app.wewantwaste.co.uk/api";

const skipApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor for logging
skipApi.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor for error handling
skipApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.error || error.message || "An error occurred",
      status: error.response?.status,
    };
    return Promise.reject(apiError);
  }
);

export const fetchSkipsByLocation = async (
  postcode: string,
  area?: string
): Promise<Skip[]> => {
  try {
    const params = new URLSearchParams({ postcode });
    if (area) {
      params.append("area", area);
    }

    const response = await skipApi.get<Skip[]>(
      `/skips/by-location?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching skips: ", error);
    throw error;
  }
};

export default skipApi;
