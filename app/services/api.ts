import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // Reemplaza con la URL de tu API
    timeout: 10000, // Tiempo de espera para las solicitudes
});

export default api;