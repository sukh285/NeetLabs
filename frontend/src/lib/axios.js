import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://neetlabs.onrender.com/api/v1"
      : "/api/v1",
  withCredentials: true,
});

// Add response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response?.status === 401) {
      // Don't redirect automatically - let the auth store handle it
      // This prevents infinite loops and unwanted redirects
      console.log("401 Unauthorized - Auth check failed");
    }
    
    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

// Optional: Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    // Uncomment this line if you want to debug requests
    // console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);