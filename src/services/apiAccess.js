import api from './api';

export default class Api {

    async login(info) {

        const data = api.post("/login", info);

        return data;
    }
    
}