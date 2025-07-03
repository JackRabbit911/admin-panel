import { createEffect, createEvent, createStore, sample } from "effector"
import { apiLogOut, apiTryLogin } from "api/auth"
import type { LoginFormData } from "./types"
import { currentUserRecived, logoutClicked } from "store/currentUser"
import { engageTokenFx } from "store/token"
import { emptyLoginFormData, fieldChangedCallback } from "./utils"
import { debug } from "patronum"

export const fieldChanged = createEvent<{ name: string, value: string }>()
export const emailChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const tryLoginClicked = createEvent()
const errorRecived = createEvent<LoginFormData | undefined>()

const tryLoginFx = createEffect(apiTryLogin)
const logoutFx = createEffect(async () => {
    const token = window.localStorage.getItem('Refresh')
    await apiLogOut(token)
    window.localStorage.removeItem('Refresh')
})

export const $loginForm = createStore<LoginFormData>(emptyLoginFormData)
    .on(emailChanged, fieldChangedCallback('email'))
    .on(passwordChanged, fieldChangedCallback('password'))
    .on(errorRecived, (_, data) => data)
    // .reset(logoutClicked)

debug({$loginForm, emailChanged, passwordChanged, tryLoginClicked, tryLoginFx, logoutClicked})

sample({
    clock: tryLoginClicked,
    source: $loginForm,
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
