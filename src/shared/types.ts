import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ServerError = FetchBaseQueryError | SerializedError | undefined;

export type MaintenanceState = { off: boolean };

export type ApiResponse<T, E = ServerError[]> = {
  success: boolean;
  error?: E;
  result: T;
};

export type JsonValue = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export type JsonObject = { [key: string]: JsonValue };

export type ResultType = JsonObject | string;
