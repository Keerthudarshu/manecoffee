/**
 * Centralized API configuration for the frontend.
 * This handles environment variables and provides fallbacks to ensure
 * the application can always reach the backend on both localhost and production.
 */

const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  '/api';

const cleanBaseUrl = (url) => url?.replace(/\/+$/, '');

export const API_CONFIG = {
  BASE_URL: cleanBaseUrl(API_BASE),
};
