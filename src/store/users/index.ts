import ajax from "api/ajax"
import { combine, createEffect, createEvent, createStore, sample } from "effector"
import type { UsersFilter, UsersInfo, UsersPagination, UsersPayload } from "./types"

export const fetchUsersFirst = createEvent()
export const usersPageNumberChanged = createEvent<number>()
export const usersPerPageChanged = createEvent<number>()
export const usersFilterChanged = createEvent<Partial<UsersFilter>>()
export const usersFilterReset = createEvent()

const getUsersFx = createEffect(
    async (payload?: UsersPayload) => {
        const response = await ajax.get<UsersInfo>('/adm/users', {
            params: payload,
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
.reset(usersFilterReset)

export const $usersFilter = createStore<UsersFilter>({
    name: '',
}).on(usersFilterChanged, (store, partial) => ({
    ...store,
    ...partial,
})).reset(usersFilterReset)

export const $usersList = combine($usersInfo, (usersInfo) => usersInfo?.list || [])
export const $usersTotal = combine($usersInfo, (usersInfo) => usersInfo?.total || 0)
const $filter = combine($pagination, $usersFilter, (pagination, filter) => ({
    ...pagination,
    ...filter,
}))

sample({
    clock: [$filter, fetchUsersFirst],
    source: $filter,
    target: getUsersFx,
})
