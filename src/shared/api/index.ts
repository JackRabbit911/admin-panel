import { createApi } from '@reduxjs/toolkit/query/react';
import { myBaseQuery } from './baseQuery';
import { invalidatesTagsFn, providesTagsFn } from './tagHelpers';
import type { ApiArg } from './tags';


export const api = createApi({
    reducerPath: 'api',
    baseQuery: myBaseQuery(),
    tagTypes: ['maintenance'],
    endpoints: (builder) => ({
        post: builder.mutation<any, ApiArg>({
            query: (arg) => {
                if (typeof arg === 'string') return { url: arg, method: 'POST' };
                return { url: arg.url, method: arg.method || 'POST', body: arg.body };
            },
            invalidatesTags: invalidatesTagsFn(),
        }),
        get: builder.query<any, ApiArg>({
            query: (arg) => {
                if (typeof arg === 'string') return { url: arg };
                return { url: arg.url };
            },
            providesTags: providesTagsFn(),
        }),
        filterSearch: builder.query<any, { url: string; page?: number; limit?: number; search?: string; filter?: string }>({
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
    useGetQuery,
    useLazyGetQuery,
    useFilterSearchQuery,
} = api
