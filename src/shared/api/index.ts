import { createApi } from '@reduxjs/toolkit/query/react';
import { myBaseQuery } from './baseQuery';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: myBaseQuery(),
    endpoints: (builder) => ({
        post: builder.mutation({
            query: (arg) => ({
                url: arg.url,
                method: 'POST',
                body: arg.body,
            }),
        }),
        delete: builder.mutation({
            query: (arg) => ({
                url: arg.url,
                method: 'DELETE',
                body: arg.body,
            }),
        }),
        get: builder.query({
            query: (arg) => arg,
        }),
        filterSearch: builder.query({
            query: ({ url, page, limit, search, filter }) => ({
                url,
                params: {
                    page,
                    limit: limit || undefined,
                    search: search || undefined,
                    filter: filter || undefined,
                },
            }),
            keepUnusedDataFor: 0,
        }),
    }),
})

export const {
    usePostMutation,
    useDeleteMutation,
    useGetQuery,
    useLazyGetQuery,
    useFilterSearchQuery,
} = api
