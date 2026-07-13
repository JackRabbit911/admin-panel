import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ServerError = FetchBaseQueryError | SerializedError | undefined;

export type ApiResponse<T, E = ServerError[]> = {
  success: boolean;
  error?: E;
  result: T;
};
