import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: { status: number | string } = {
    status: 200,
}

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<number | string>) => {
            state.status = action?.payload
        },
        resetStatus: (state) => {
            state.status = 200
        },
    },
})

export const { setStatus, resetStatus } = statusSlice.actions
export default statusSlice.reducer
