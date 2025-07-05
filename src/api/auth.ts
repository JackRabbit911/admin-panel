import ajax from "api/ajax";

import type { LoginError, LoginForm, LoginSuccess } from "store/login/types";
import type { ApiResponse } from "./types";

export const apiTryLogin = (payload: LoginForm): ApiResponse<LoginSuccess, LoginError> =>
    ajax.post('/auth/login', {
        email: payload.email,
        password: payload.password,
    })

export const apiLogOut = (token: string | null) => 
    ajax.delete('/auth/logout', { data: { token: token }})
