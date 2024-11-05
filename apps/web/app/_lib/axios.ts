import { default as axiosDefault } from 'axios';
import { env } from 'next-runtime-env';

const axios = axiosDefault.create({
    baseURL: env('NEXT_PUBLIC_SERVER_URL'),
    withCredentials: true,
});

export default axios;
