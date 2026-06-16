import { configureStore } from "@reduxjs/toolkit"

import { api } from "../api"
import usernameReducer from "./username"

export const store = configureStore({
    reducer: {
        username: usernameReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
