import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from 'Pages/Users/types'

const initialState: { user: User | null } = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action?.payload
        },
        logout: (state) => {
            state.user = null
        },
    },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
