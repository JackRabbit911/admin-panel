import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UserNameStore = {
    name?: string;
}

const initialState: UserNameStore = {
    name: undefined,
}

const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.name = action?.payload
        }
    },
})

export const { setUsername } = usernameSlice.actions
export default usernameSlice.reducer
