import ajax from "api/ajax"
import { combine, createEffect, createEvent, createStore, sample } from "effector"
import type { UsersInfo, UsersPagination } from "./types"

export const fetchUsersFirst = createEvent()
export const usersPageNumberChanged = createEvent<number>()
export const usersPerPageChanged = createEvent<number>()

const getUsersFx = createEffect(
    async (pagination?: UsersPagination) => {
        const response = await ajax.get<UsersInfo>('/adm/users', {
            params: pagination,
        })

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
})).on(usersPerPageChanged, (store, perPage) => ({
    ...store, perPage, pageNumber: 1
}))

export const $usersList = combine($usersInfo, (usersInfo) => usersInfo?.list || [])
export const $usersTotal = combine($usersInfo, (usersInfo) => usersInfo?.total || 0)

sample({
    clock: [$pagination, fetchUsersFirst],
    source: $pagination,
    target: getUsersFx,
})
