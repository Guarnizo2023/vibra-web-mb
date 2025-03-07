/**
 * @fileoverview Axios instance configuration for API communication
 * @module services/api
 */

import axios from 'axios';
import config from '../../config/env.json';

/**
 * Base URL for the API obtained from environment configuration
 * @constant {string}
 */
const apiBaseUrl = config.development.apiBaseUrl;

/**
 * Preconfigured Axios instance for making HTTP requests
 * @constant {import('axios').AxiosInstance}
 * @default
 * @property {string} baseURL - The base URL for all requests
 * @property {number} timeout - Request timeout in milliseconds
 * @property {Object} headers - Default headers for all requests
 */
const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    timeout: 10000,
    headers: {
        common: { "Authorization": 'Bearer ' },
        post: { 'Content-Type': 'application/json' }
    }
});

export default api;