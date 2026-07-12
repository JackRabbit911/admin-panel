import { Mutex } from 'async-mutex';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { setToken, clearToken } from '../store/aiAuthSlice';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  timeout: 10000, // 10 секунд по умолчанию
  prepareHeaders: (headers, api) => {
    const state = api.getState() as { auth: { accessToken: string | null } };
    const token = state.auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Если упал сам getMe или запрос logout — сразу чистим стейт
    if (api.endpoint === 'getMe' || api.endpoint === 'logout') {
      handleLogout(api);
      return result;
    }

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: '/refresh', method: 'POST', timeout: 5000 },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const { accessToken } = refreshResult.data as { accessToken: string };
          api.dispatch(setToken(accessToken));
          result = await baseQuery(args, api, extraOptions);
        } else {
          handleLogout(api);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const handleLogout = (api: any) => {
  api.dispatch(clearToken());
  api.dispatch(appApi.util.resetApiState());
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getMe: builder.query<{ id: number; name: string; role: string; accessToken: string }, void>({
      query: () => '/auth',
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) {
            dispatch(setToken(data.accessToken));
          }
        } catch {}
      },
    }),
    
    login: builder.mutation<{ id: number; name: string; role: string; accessToken: string }, any>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.accessToken) {
            dispatch(setToken(data.accessToken));
            dispatch(
              appApi.util.updateQueryData('getMe', undefined, (draft) => {
                Object.assign(draft, data);
              })
            );
          }
        } catch {}
      },
    }),

    // Эндпоинт для выхода из системы
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // Сразу после вызова (не дожидаясь ответа сервера) зачищаем фронтенд
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(clearToken());
        dispatch(appApi.util.resetApiState());
        try {
          await queryFulfilled;
        } catch {}
      },
    }),

    getDictionariesByRole: builder.query<{ data: string[] }, string>({
      query: (role) => `/dictionaries?role=${role}`,
      keepUnusedDataFor: Infinity,
    }),
  }),
});

export const { 
  useGetMeQuery, 
  useLoginMutation, 
  useLogoutMutation, 
  useGetDictionariesByRoleQuery 
} = appApi;
