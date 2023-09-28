import axios from "axios";

export const api = axios.create({
    baseURL: 'https://pix4win.com/cs/?c=', headers: {}
});