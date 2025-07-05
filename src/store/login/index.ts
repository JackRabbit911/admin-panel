import { createEffect, createEvent, createStore, sample } from "effector"
import { apiLogOut, apiTryLogin } from "api/auth"
import { currentUserRecived, logoutClicked } from "store/currentUser"
import { engageTokenFx } from "store/token"
import type { LoginError } from "./types"

export const errorRecived = createEvent<LoginError | undefined>()

export const tryLoginFx = createEffect(apiTryLogin)
export const logoutFx = createEffect(async () => {
    const token = window.localStorage.getItem('Refresh')
    await apiLogOut(token)
    window.localStorage.removeItem('Refresh')
})

export const $loginError = createStore<LoginError | undefined>(null)
    .on(errorRecived, (_, data) => data)
    .reset(tryLoginFx, logoutClicked)

sample({
    clock: tryLoginFx.doneData,
    filter: (response) => response.data.success === true,
    fn: (response) => response.data.result,
    target: [currentUserRecived, engageTokenFx],
})

sample({
    clock: tryLoginFx.doneData,
    filter: (response) => response.data.success === false && Boolean(response.data.error),
    fn: (response) => response.data.error,
    target: errorRecived,
})

sample({
    clock: logoutClicked,
    target: logoutFx,
})
