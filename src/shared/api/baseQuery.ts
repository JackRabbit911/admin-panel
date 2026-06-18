import type { AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import ajax from './ajax';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    }
  > =>
    async ({ url, method = 'GET', data, params }) => {
      try {
        const result = await ajax({ url, method, data, params });
        return { data: result.data };
      } catch (axiosError) {
        return {
          error: axiosError, // Здесь будет объект с ошибками, выброшенный из interceptor
        };
      }
    };
