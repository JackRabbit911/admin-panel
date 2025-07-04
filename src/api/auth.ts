import ajax from "api/ajax";

import type { LoginFormData, LoginSuccess } from "store/login/types";
import type { ApiResponse } from "./types";

export const apiTryLogin = (payload: LoginFormData): ApiResponse<LoginSuccess, LoginFormData> =>
    ajax.post('/auth/login', {
        email: payload.email.value,
        password: payload.password.value,
    })

export const apiLogOut = (token: string | null) => 
    ajax.delete('/auth/logout', { data: { token: token }})
