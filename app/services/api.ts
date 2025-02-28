import axios from 'axios';
import config from '../../config/env.json';

const apiBaseUrl = config.development.apiBaseUrl;

const api = axios.create({
    baseURL: `${apiBaseUrl}`,
    timeout: 10000,
    /* headers: {
        common: { "Authorization": 'Bearer myAuthToken' },
        post: { 'Content-Type': 'application/json' }
    } */
});

export default api;