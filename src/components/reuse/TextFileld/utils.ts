import type { FieldError, FieldErrorsImpl, Merge, UseFormReturn } from "react-hook-form"
import type { LoginError, LoginForm } from "store/login/types"

const className = 'input'

export const getClassName = (error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined) => {
    return error
        ? [className + ' input-error', 'text-error']
        : [className, '']
}

export const setFormErrors = (
    loginError: LoginError | undefined,
    methods: UseFormReturn<LoginForm, any, LoginForm>) => {
    if (loginError) {
      methods.setError('email', {
        type: 'manual',
        message: loginError.email.message,
      })

      methods.setValue('email', loginError.email.value)

      methods.setError('password', {
        type: 'manual',
        message: loginError.password.message,
      })

      methods.setValue('password', loginError.password.value)
    }
}
