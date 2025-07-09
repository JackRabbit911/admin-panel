import ajax from "api/ajax"
import { combine, createEffect, createEvent, createStore, sample } from "effector"
import type { UsersInfo, UsersPagination } from "./types"

export const usersPageNumberChanged = createEvent<number>()

export const getUsersFx = createEffect(
    async (pagination?: UsersPagination) => {
        const response = await ajax.get<UsersInfo>('/adm/users')
        console.log(pagination)
        return response.data
    }
)

export const $usersInfo = createStore<UsersInfo | null>(null)
    .on(getUsersFx.doneData, (_, usersInfo) => usersInfo)

export const $pagination = createStore<UsersPagination>({
    pageNumber: 1,
    perPage: 10,
}).on(usersPageNumberChanged, (store, pageNumber) => ({
    ...store, pageNumber
}))

export const $usersList = combine($usersInfo, (usersInfo) => usersInfo?.list || [])
export const $usersTotal = combine($usersInfo, (usersInfo) => usersInfo?.total || 0)

sample({
    clock: $pagination,
    target: getUsersFx,
})
