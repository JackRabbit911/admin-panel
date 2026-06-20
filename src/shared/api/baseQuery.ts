import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import ajax from './ajax';
import { logout } from '../store/authSlice';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    }
  > =>
    async ({ url, method = 'GET', data, params }, api) => {
      try {
        const result = await ajax({ url, method, data, params });
        return { data: result.data };
      } catch (error) {
        const axiosError = error as AxiosError
        const status = axiosError.status || 500

        if (status === 401) {
          api.dispatch(logout())
        }
        
        return {
          error: axiosError, // Здесь будет объект с ошибками, выброшенный из interceptor
        };
      }
    };
