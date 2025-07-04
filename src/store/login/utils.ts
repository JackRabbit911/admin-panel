import type { LoginFormData } from "./types";

export const getInitial = (): LoginFormData => ({
    email: {
        status: '',
        value: '',
        message: '',
    },
    password: {
        status: '',
        value: '',
        message: '',
    },
})

export const fieldChangedCallback = (fieldName: keyof LoginFormData) =>
    (store: LoginFormData, value: string) => {
        const result = {
            ...store,
        }

        result[fieldName].value = value
        result[fieldName].status = ''
        result[fieldName].message = ''

        return result
    }
