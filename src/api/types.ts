export type ApiResponseNoResult<E = string> = {
  success: boolean;
  error?: E;
};

export type ApiResponse<T = string, E = string> = {
  success: boolean;
  error?: E;
  result: T;
};
