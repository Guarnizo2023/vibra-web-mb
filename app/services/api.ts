import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:4000', // Reemplaza con la URL de tu API
    timeout: 10000, // Tiempo de espera para las solicitudes
    /* headers: {
        common: { "Authorization": 'Bearer myAuthToken' },
        post: { 'Content-Type': 'application/json' }
    } */
});

export default api;