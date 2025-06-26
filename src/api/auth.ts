import ajax from "api/ajax";

import type { LoginError, LoginPayload, LoginSuccess } from "store/login/types";
import type { ApiResponse } from "./types";

export const apiTryLogin = (payload: LoginPayload): ApiResponse<LoginSuccess, LoginError> =>
    ajax.post('/auth/login', payload)

export const apiLogOut = (token: string | null) => {
    ajax.delete('/auth/logout', { data: { token: token }})
}
