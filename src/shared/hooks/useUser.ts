import { useEffect } from "react"
import { jwtDecode, type JwtPayload } from "jwt-decode";

import { setUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks"

import type { User } from "../types";

type TokenPayload = JwtPayload & { user: User };

export const useUser = () => {
    let userdata = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (!userdata) {
            const token = window.localStorage.getItem('Bearer')
    
            if (token) {
                const { user }: TokenPayload = jwtDecode(token)
                dispatch(setUser(user))
                userdata = user
            }
        }
    }, [])

    return userdata
}
