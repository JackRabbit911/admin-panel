import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseQuery';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        post: builder.mutation({
            query: (arg) => ({
                url: arg.url,
                method: 'POST',
                data: arg.data,
            }),
        }),
        delete: builder.mutation({
            query: (arg) => ({
                url: arg.url,
                method: 'DELETE',
                data: arg.data,
            }),
        }),
        get: builder.query({
            query: (arg) => arg,
        })
    }),
});

export const { usePostMutation, useDeleteMutation, useGetQuery } = api
