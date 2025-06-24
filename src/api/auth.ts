import ajax from "./ajax";

import type { ApiResponse } from "./types";
import type { LoginPayload, TryLoginResponse } from "../store/Login/types";

export const apiTryLogin = async (payload: LoginPayload): ApiResponse<TryLoginResponse> =>
  ajax.post('/auth/login', payload);
