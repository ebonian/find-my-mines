import { default as axiosDefault } from 'axios';

const axios = axiosDefault.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    withCredentials: true,
});

export default axios;
