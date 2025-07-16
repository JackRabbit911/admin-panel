import { createEffect, createEvent, createStore } from "effector";
import type { User } from "./types";
import ajax from "api/ajax";
import type { ApiResponse } from "api/types";

export const userReset = createEvent()

export const getUserDataFx = createEffect(
    async (id: string) => {
        const response = await ajax.get<ApiResponse<User>>(`/adm/users/${id}`)
        
        return response.data.result
    }
)

export const $user = createStore<User | null>(null)
    .on(getUserDataFx.doneData, (_, user) => user)
    .reset(userReset)
