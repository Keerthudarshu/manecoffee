/**
 * Centralized API configuration for the frontend.
 * This handles environment variables and provides fallbacks to ensure
 * the application can always reach the backend on both localhost and production.
 */

// Dynamically determine backend URL based on where the frontend is running.
// Priority: VITE_API_URL env var → REACT_APP_API_URL env var → auto-detect from hostname
const getDefaultApiUrl = () => {
  // During SSR/build time, window may not be available
  if (typeof window === 'undefined') return 'http://localhost:8080';

  const hostname = window.location.hostname;

  // Running locally → point to local backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }

  // Running on the production server → use the server IP
  return 'http://56.228.81.193:8080';
};

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  getDefaultApiUrl();

const cleanBaseUrl = (url) => url?.replace(/\/+$/, '');

export const API_CONFIG = {
  BASE_URL: cleanBaseUrl(API_BASE),
};

