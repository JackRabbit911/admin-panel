import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types';

type UserState = {
    user: User | null;
}

const initialState: UserState = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action?.payload
        },
        logout: (state) => {
            state.user = null;
        },
    },
})

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
