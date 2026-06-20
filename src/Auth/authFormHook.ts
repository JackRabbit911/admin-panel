import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useAuthMutation } from "../shared/api";
import { isObjectEmpty } from "../shared/utils";
import { setUser } from "../shared/store/authSlice";
import { useAppDispatch } from "../shared/store/hooks";
import { useFormServerError } from "../shared/hooks/formServerError";
import { authData, type AuthData } from "./schema";
import type { ServerError } from "../shared/types";

export const useAuthForm = () => {
    const [auth, { isLoading, isError, error }] = useAuthMutation()
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
          const data = await auth(formData).unwrap()
          dispatch(setUser(data?.result?.user))
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
