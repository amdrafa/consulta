import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ws.hubdodesenvolvedor.com.br/', headers: {}
});