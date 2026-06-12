import { createApi } from '@reduxjs/toolkit/query/react';
import { ajaxBaseQuery } from './baseQuery';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: ajaxBaseQuery(),
    endpoints: (builder) => ({
        auth: builder.mutation({
            query: (authData) => ({
                url: '/submit',
                method: 'POST',
                data: authData,
            }),
        }),
    }),
});

export const { useAuthMutation } = api
