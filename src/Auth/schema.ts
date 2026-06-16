import * as z from "zod"

export const authData = z.object({
    email: z.email().trim()
        .min(6, { message: 'Required' }),
    password: z.string().min(1, "Required"),
    remember: z.boolean(),
})

const serverValidationError = z.object({
    key: z.enum(['email', 'password', 'remember']),
    msg: z.string(),
})

export type AuthData = z.infer<typeof authData>
export type AuthValidationError = z.infer<typeof serverValidationError>
