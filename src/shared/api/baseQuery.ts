import { Mutex } from 'async-mutex'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

import type { RootState } from '../store'
import type { ApiResponse } from '../types'
import { authUrl, refreshUrl } from '../constants'
import { logout, setToken } from '../store/tokenSlice'

const { protocol, hostname } = window.location
export const host = `${protocol}//${hostname}`

const refreshApi = {
    url: refreshUrl,
    method: 'POST',
    body: {},
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: `/api/adm`,
    prepareHeaders: (headers, { getState }) => {
        const { bearer } = (getState() as RootState).token

        if (bearer) {
            headers.set('authorization', `Bearer ${bearer}`)
        }

        return headers
    },
})

export const myBaseQuery = (): BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> => async (args, api, extraOptions) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    // ПЕРЕХВАТ ОШИБКИ 401 (Сессия устарела)
    if (result.error && result.error.status === 401) {
        const currentUrl = typeof args === 'string' ? args : args.url

        if (currentUrl === authUrl || currentUrl === refreshUrl) {
            window.location.href = `${host}/auth`
            return result
        }

        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const response = await baseQuery(refreshApi, api, extraOptions)
                const data = response?.data as ApiResponse<string>
                
                if (data?.success && data?.result) {
                    api.dispatch(setToken(data.result))
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout())
                    window.location.href = `${host}/auth`
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions)
        }

        
        // const response = await baseQuery(refreshApi, api, extraOptions)
        // const data = response?.data as ApiResponse<string>

        // if (data?.success && data?.result) {
        //     api.dispatch(setToken(data.result))
        //     result = await baseQuery(args, api, extraOptions)
        // } else {
        //     api.dispatch(logout())
        // }
    }

    // ПЕРЕХВАТ ОШИБКИ 422 (Ошибки валидации бэкенда)
    if (result.error && result.error.status === 422) {
        console.warn('Ошибка валидации данных (422):', result.error.data)
    }

    return result
};
