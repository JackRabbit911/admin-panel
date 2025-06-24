import type { AxiosResponse } from "axios";

export type ApiResponseNoResult = Promise<
  AxiosResponse<{
    success: boolean;
    error?: string;
  }>
>;

export type ApiResponse<T> = Promise<
  AxiosResponse<{
    success: boolean;
    error?: string;
    result: T;
  }>
>;
