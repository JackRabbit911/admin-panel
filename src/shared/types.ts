import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ServerError = FetchBaseQueryError | SerializedError | undefined;

export type User = {
    id?: number;
    name?: string;
    role?: number;
}

export type ApiResponse<T, E = ServerError[]> = {
  success: boolean;
  error?: E;
  result: T;
};

export type AuthTokens = {
    refresh: string;
    bearer: string;
}
