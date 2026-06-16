import axios, { AxiosError } from "axios";

const { protocol, hostname } = window.location
export const host = `${protocol}//${hostname}`

const lang = document.querySelector('html')?.getAttribute('lang')

let token = ''

const ajax = axios.create({
    baseURL: `${host}/api/adm`,
    timeout: 1000,
    headers: {
        'Accept-Language': lang,
        'Content-Type': 'application/json',
    }
});

export const engageToken = (newBearer: string) => {
    token = `Bearer ${newBearer}`
}

ajax.interceptors.request.use((config) => {
    config.headers.Authorization = token

    return config
})

ajax.interceptors.response.use(
    async (response) => {
        if (response.headers['x-bearer']) {
            engageToken(response.headers['x-bearer'])
        }

        if (typeof response.headers['x-refresh'] !== 'undefined') {
            if (response.headers['x-refresh']) {
                window.localStorage.setItem('Refresh', response.headers['x-refresh'])
            } else {
                token = `Refresh ${window.localStorage.getItem('Refresh')}`
                const refreshResponse = await ajax(response.config)

                return refreshResponse
            }
        }

        return response
    },
    (error: AxiosError) => {

        if (error.response && error.response.status === 422) {
            return Promise.reject({
                status: 422,
                data: error.response.data,
            });
        }

        return Promise.reject({
            status: error.response?.status || 500,
            message: error.message || 'Server Error',
            data: error.response?.data || null
        });
    }
);

export default ajax;
