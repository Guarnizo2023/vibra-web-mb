import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:4000', // Reemplaza con la URL de tu API
    timeout: 10000, // Tiempo de espera para las solicitudes
});

export default api;