import { useEffect } from "react"
import { jwtDecode, type JwtPayload } from "jwt-decode";

import { setCredentials } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks"

import type { User } from "../types";

type TokenPayload = JwtPayload & { user: User };

export const useUser = () => {
    const { user, refresh, bearer } = useAppSelector((state) => state.auth)
    let userdata = user;
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!user) {
            const savedRefresh = window.localStorage.getItem('Refresh') || ''
            const savedBearer = window.localStorage.getItem('Bearer') || ''

            if (savedBearer) {
                const { user }: TokenPayload = jwtDecode(savedBearer)
                dispatch(setCredentials({ user, refresh: savedRefresh, bearer: savedBearer }))
                userdata = user
            }
        }
        
        window.localStorage.clear()
    }, [])

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const message = 'У вас есть несохраненные изменения. Точно хотите уйти?'
            event.preventDefault(); // Требуется для современных браузеров
            event.returnValue = message; // Устанавливает текст для некоторых браузеров

            if (refresh && bearer) {
                window.localStorage.setItem('Refresh', refresh)
                window.localStorage.setItem('Bearer', bearer)
            }

            return message; // Для старых версий
        };

        window.addEventListener('beforeunload', handleBeforeUnload)

        onbeforeunload = (event) => {
            event.preventDefault()

            if (refresh && bearer) {
                window.localStorage.setItem('Refresh', refresh)
                window.localStorage.setItem('Bearer', bearer)
            }
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        };
    }, [refresh])

    return userdata
}
