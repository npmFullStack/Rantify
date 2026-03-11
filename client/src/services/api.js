import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here later
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Handle token refresh here later
      // return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

// Letter API service
export const letterAPI = {
  // Get all letters with pagination
  getLetters: (page = 1, limit = 10) =>
    api.get(`/letters?page=${page}&limit=${limit}`),

  // Get a random letter
  getRandomLetter: () => api.get("/letters/random"),

  // Get a single letter by ID
  getLetterById: (id) => api.get(`/letters/${id}`),

  // Create a new letter
  createLetter: (data) => api.post("/letters", data),

  // Like a letter
  likeLetter: (id) => api.post(`/letters/${id}/like`),
};

// Health check
export const checkHealth = () => api.get("/health");

export default api;
