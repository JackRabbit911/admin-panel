import ajax from "api/ajax"
import { createEffect, createStore } from "effector"
import type { User } from "./types"

export const getUsersFx = createEffect(
    async () => {
        const response = await ajax.get<User[]>('/adm/users')

        return response.data
    }
) 

export const $usersList = createStore<User[]>([])
    .on(getUsersFx.doneData, (_, users) => users)
