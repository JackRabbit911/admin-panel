import { createApi } from '@reduxjs/toolkit/query/react';
import type { ApiArg } from './tags';
import { myBaseQuery } from './baseQuery';
import { invalidatesTagsFn, providesTagsFn } from './tagHelpers';
import type { FilterSearch } from 'Pages/Users/types';
import type { ApiResponse, ResultType } from 'shared/types';

const transformResponse = <T>(response: ApiResponse<T>): T =>
    response.success ? response.result : ({} as T);

export const api = createApi({
    reducerPath: 'api',
    baseQuery: myBaseQuery(),
    tagTypes: ['maintenance', 'users'],
    endpoints: (builder) => ({
        post: builder.mutation<ResultType, ApiArg>({
            query: (arg) => {
                if (typeof arg === 'string') return { url: arg, method: 'POST' };
                return { url: arg.url, method: arg.method || 'POST', body: arg.body };
            },
            invalidatesTags: invalidatesTagsFn(),
            transformResponse: transformResponse,
        }),
        get: builder.query<ResultType, ApiArg>({
            query: (arg) => {
                if (typeof arg === 'string') return { url: arg };
                return { url: arg.url };
            },
            providesTags: providesTagsFn(),
            transformResponse: transformResponse,
        }),
        filterSearch: builder.query<ApiResponse<FilterSearch>, { url: string; page?: number; limit?: number; search?: string; filter?: string }>({
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
