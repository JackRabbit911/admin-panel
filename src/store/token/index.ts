import { engageToken } from "api/ajax";
import { createEffect } from "effector";
import type { LoginSuccess } from "store/login/types";

export const engageTokenFx = createEffect(
    ({ bearer, refresh }: LoginSuccess) => {
        engageToken(bearer)
        localStorage.setItem('Refresh', refresh)
    }
)
