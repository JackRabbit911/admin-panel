import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { User } from "../types";

type TokenPayload = JwtPayload & { user: User };

export const getToken = (token: string) => {
    if (token) {
        return token
    }

    token = window.localStorage.getItem('Bearer') || ''

    if (token) {
        const { exp }: TokenPayload = jwtDecode(token)

        if (exp) {
            const expired = exp * 1000 < Date.now() - 5000

            if (expired) {
                token = `Refresh ${window.localStorage.getItem('Refresh')}`
            } else {
                token = `Bearer ${token}`
            }
        }
    }

    return token
}
