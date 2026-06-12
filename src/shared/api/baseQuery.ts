import { type AxiosRequestConfig, AxiosError } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

import ajax from './ajax';

export const ajaxBaseQuery = (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await ajax({ url, method, data, params }) //axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      
      // Перехват ошибки 422
      if (err.response && err.response.status === 422) {
        return {
          error: {
            status: 422,
            data: err.response.data, // Здесь содержатся ошибки валидации от сервера
          },
        };
      }

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
