import axios, { AxiosError } from "axios";
import { getToken } from "./utils";

const { protocol, hostname } = window.location
export const host = `${protocol}//${hostname}`

const lang = document.querySelector('html')?.getAttribute('lang')

let token = ''

const ajax = axios.create({
    baseURL: `${host}/api/adm`,
    timeout: 5000,
    headers: {
        'Accept-Language': lang,
        'Content-Type': 'application/json',
    }
});

ajax.interceptors.request.use((config) => {
    token = getToken()

    if (token) {
        config.headers.Authorization = token
    }

    return config
})

ajax.interceptors.response.use(
    async (response) => {
        if (response.headers['x-bearer']) {
            window.localStorage.setItem('Bearer', response.headers['x-bearer'])
        }

        if (typeof response.headers['x-refresh'] !== 'undefined') {
            if (response.headers['x-refresh']) {
                window.localStorage.setItem('Refresh', response.headers['x-refresh'])
            } 
            
            else {
            //     token = `Refresh ${window.localStorage.getItem('Refresh')}`
                const refreshResponse = await ajax(response.config)

                return refreshResponse
            }
        }

        return response
    },
    (error: AxiosError) => {
        if (error.response) {
            if (error.response.status === 422) {
                return Promise.reject({
                    status: 422,
                    data: error.response.data,
                });
            } else if (error.response.status === 401) {
                window.localStorage.clear()
                window.location.reload()
            }
        }

        return Promise.reject({
            status: error.response?.status || 500,
            message: error.message || 'Server Error',
            data: error.response?.data || null
        });
    }
);

export default ajax;
