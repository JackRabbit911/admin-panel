import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseQuery';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (authData) => ({
                url: '/auth',
                method: 'POST',
                data: authData,
            }),
        }),
    }),
});

export const { useAuthMutation } = api
