import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseQuery';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (authData) => ({
                url: '/auth/login',
                method: 'POST',
                data: authData,
            }),
        }),
        common: builder.query({
            query: (arg) => arg,
        })
    }),
});

export const { useAuthMutation, useCommonQuery } = api
