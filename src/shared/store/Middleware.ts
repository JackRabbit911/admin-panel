import { type Middleware, isPending, isFulfilled, isRejected } from '@reduxjs/toolkit'
import { setGlobalLoading } from './modalSlice'

let activeRequestsCount = 0

export const LoadingMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string') {
        if (action.type.startsWith('api/')) {
            if (isPending(action)) {
                if (activeRequestsCount === 0) {
                    dispatch(setGlobalLoading(true))
                }
                activeRequestsCount++;
            }

            if (isFulfilled(action) || isRejected(action)) {
                activeRequestsCount--;

                if (activeRequestsCount <= 0) {
                    activeRequestsCount = 0
                    dispatch(setGlobalLoading(false))
                }
            }
        }
    }

    return next(action);
}
