import type { AxiosResponse } from "axios";

type RequiredResponsePart = {
  success: boolean;
  error?: string;
};

export type ApiResponseNoResult = Promise<
  AxiosResponse<
    RequiredResponsePart
  >
>;

export type ApiResponse<T> = Promise<
  AxiosResponse<
    RequiredResponsePart & {
      result: T;
    }
  >
>;
