import { Mutex } from 'async-mutex';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import type { RootState } from '../store';
import { logout, setTokens } from '../store/authSlice';
import type { ApiResponse, AuthTokens } from '../types';

const { protocol, hostname } = window.location
export const host = `${protocol}//${hostname}`

const refreshApi = {
    url: '/auth/refresh',
    method: 'POST',
    body: {},
}

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: `${host}/api/adm`,
    prepareHeaders: (headers, { getState }) => {
        const { bearer } = (getState() as RootState).auth

        if (bearer) {
            headers.set('authorization', `Bearer ${bearer}`);
        }

        return headers;
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
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                const state = api.getState() as RootState
                const refresh = state.auth.refresh

                refreshApi.body = { refresh }
                const response = await baseQuery(refreshApi, api, extraOptions);
                const data = response?.data as ApiResponse<AuthTokens>

                if (data?.success && data?.result) {
                    api.dispatch(setTokens(data.result))
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }

        // const state = api.getState() as RootState
        // const refresh = state.auth.refresh

        // refreshApi.body = { refresh }
        // const response = await baseQuery(refreshApi, api, extraOptions);
        // const data = response?.data as ApiResponse<AuthTokens>

        // if (data?.success && data?.result) {
        //     // console.log(data?.result)
        //     api.dispatch(setTokens(data.result))
        //     result = await baseQuery(args, api, extraOptions);
        // } else {
        //     // console.log('logout')
        //     api.dispatch(logout())
        // }
    }

    // ПЕРЕХВАТ ОШИБКИ 422 (Ошибки валидации бэкенда)
    if (result.error && result.error.status === 422) {
        console.warn('Ошибка валидации данных (422):', result.error.data);
    }

    return result;
};
