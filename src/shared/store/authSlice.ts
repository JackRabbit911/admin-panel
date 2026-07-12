import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types';

type Tokens = {
    // refresh: string;
    bearer: string;
}

type AuthState = Tokens & {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
    // refresh: '',
    bearer: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.user = action?.payload.user
            // state.refresh = action?.payload.refresh
            state.bearer = action?.payload.bearer
        },
        setToken: (state, action: PayloadAction<Tokens>) => {
            // if (action?.payload?.refresh) {
            //     state.refresh = action?.payload.refresh
            // }

            state.bearer = action?.payload.bearer
        },
        logout: (state) => {
            state.user = null
            // state.refresh = ''
            state.bearer = ''
        },
    },
})

export const { setCredentials, setToken, logout } = authSlice.actions
export default authSlice.reducer
