import type { AxiosResponse } from "axios";

export type ApiResponseNoResult<E = string> = Promise<
  AxiosResponse<{
    success: boolean;
    error?: E;
  }>
>;

export type ApiResponse<T = string, E = string> = Promise<
  AxiosResponse<{
    success: boolean;
    error?: E;
    result: T;
  }>
>;
