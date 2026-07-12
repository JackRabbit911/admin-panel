import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { isObjectEmpty } from "../shared/utils";
import { usePostMutation } from "../shared/api";
import { useAppDispatch } from "../shared/store/hooks";
import { setCredentials } from "../shared/store/authSlice";
import { useFormServerError } from "../shared/hooks/formServerError";
import { authData, type AuthData } from "./schema";
import type { ServerError } from "../shared/types";

export const useAuthForm = () => {
  const [auth, { isLoading, isError, error }] = usePostMutation()
  const { handleServerError } = useFormServerError<AuthData>();
  const dispatch = useAppDispatch()
  const err = error as ServerError
  const responseStatus = { isLoading, isError, err }

  const methods = useForm({
    resolver: zodResolver(authData),
    reValidateMode: "onChange",
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  })

  const onSubmit: SubmitHandler<AuthData> = async (formData) => {
    try {
      const arg = {
        url: '/auth/login',
        body: formData,
      }

      const data = await auth(arg).unwrap()
      const { bearer, user } = data?.result

      dispatch(setCredentials({ user, bearer }))

    } catch (err) {
      const isHandled = handleServerError(err, methods.setError);
      if (!isHandled) {
        console.error('Глобальная ошибка сервера (не 422):', err);
      }
    }
  }

  const disabled = !isObjectEmpty(methods.formState.errors) ||
    methods.watch('email') === '' ||
    methods.watch('password') === ''

  return { methods, onSubmit, disabled, responseStatus }
}
