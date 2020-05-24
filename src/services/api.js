/**
 * @author Ivan Zanon
 * 
 * @description interface for the TokenLab Calendar API
 * 
 */

import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3002/api"
})

export default api;