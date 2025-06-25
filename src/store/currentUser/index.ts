import { createEvent, createStore } from "effector";
import type { CurrentUser } from "./types";
import type { LoginSuccess } from "store/login/types";

export const currentUserRecived = createEvent<LoginSuccess>()
export const logoutClicked = createEvent()

export const $currentUser = createStore<CurrentUser | null>(null)
    .on(currentUserRecived, (_, { user }) => user)
    .on(logoutClicked, () => null)
