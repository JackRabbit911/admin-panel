import ajax from "api/ajax";

import type { LoginPayload, TryLoginResponse } from "store/login/types";
import type { ApiResponse } from "./types";

export const apiTryLogin = (payload: LoginPayload): ApiResponse<TryLoginResponse> =>
  ajax.post('/auth/login', payload)
