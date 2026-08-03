import { configureStore } from "@reduxjs/toolkit"

import { api } from "../api"
import userReducer from "./userSlice"
import tokenReducer from "./tokenSlice"
import modalReducer from "./modalSlice"
import { LoadingMiddleware } from "./Middleware"

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        modal: modalReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(api.middleware)
            .concat(LoadingMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
