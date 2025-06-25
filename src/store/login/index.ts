import { createEffect, createEvent, createStore, sample } from "effector"
import { apiLogOut, apiTryLogin } from "api/auth"
import type { LoginError, LoginPayload } from "./types"
import { currentUserRecived, logoutClicked } from "store/currentUser"
import { engageTokenFx } from "store/token"

export const emailChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const tryLoginClicked = createEvent()
const errorRecived = createEvent<LoginError | undefined>()

export const tryLoginFx = createEffect(apiTryLogin)
export const logoutFx = createEffect(() => {
    const token = window.localStorage.getItem('Refresh')
    window.localStorage.removeItem('Refresh')
    apiLogOut(token)
})

export const $loginPayload = createStore<LoginPayload>({ email: '', password: '' })
    .on(emailChanged, (store, email) => ({ ...store, email: email }))
    .on(passwordChanged, (store, password) => ({ ...store, password: password }))

export const $errorLogin = createStore<LoginError | null>(null)
    .on(errorRecived, (store, error) => !error ? store : ({ ...store, ...error }))

sample({
    clock: tryLoginClicked,
    source: $loginPayload,
    target: tryLoginFx,
})

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

