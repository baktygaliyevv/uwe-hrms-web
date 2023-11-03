import axios from "axios";

export const apiBase = axios.create({
    baseURL: 'https://uwe.dyzoon.dev/api/v1'
});