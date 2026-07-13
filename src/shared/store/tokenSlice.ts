import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { bearer: string } = {
    bearer: '',
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.bearer = action?.payload
        },
        logout: (state) => {
            state.bearer = ''
        },
    },
})

export const { setToken, logout } = tokenSlice.actions
export default tokenSlice.reducer
