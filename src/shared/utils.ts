import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { User } from "Pages/Users/types";

type MyJwtPayload = JwtPayload & { user: User }

export const isObjectEmpty = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export const getObjectProp = (object: object, key: string) => {
  let obj = object as any
  const arr = key.split('.')
  const f = arr.shift() as string

  let m = obj[f]

  arr.forEach((val) => {
    if (m) {
      m = m[val]
    }
  })

  return m;
}

export const getUserByJWT = (token: string) => {
  const payload = jwtDecode(token) as MyJwtPayload
  return payload?.user
}
