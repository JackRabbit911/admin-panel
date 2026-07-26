import { configureStore } from "@reduxjs/toolkit"

import { api } from "../api"
import tokenReducer from "./tokenSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
