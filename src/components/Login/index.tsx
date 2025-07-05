import { useForm, FormProvider } from "react-hook-form"
import LoginWrapper from "./LoginWrapper"
import TextFileld from "components/reuse/TextFileld"
import { validation } from "./constants";
import type { LoginForm } from "store/login/types";
import { $loginError, tryLoginFx } from "store/login";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { setFormErrors } from "components/reuse/TextFileld/utils";

const Login = () => {
  const methods = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "onChange",
  })

  const { formState } = methods;
  const { isValid } = formState;

  const onSubmit = (data: LoginForm) => {
    methods.clearErrors()
    tryLoginFx(data)
  }

  const loginError = useUnit($loginError)

  useEffect(() => {
    setFormErrors(loginError, methods)
    console.log(loginError)

  }, [loginError])

  return (
    <FormProvider {...methods}>
      <LoginWrapper>
        <form className="card-body" onSubmit={methods.handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <TextFileld
              name="email"
              label="Email"
              rules={validation.email}
            />
            <TextFileld
              name="password"
              type="password"
              label="Password"
              rules={validation.password}
            />
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary mt-4"
            >
              Login
            </button>
          </fieldset>
        </form>
      </LoginWrapper>
    </FormProvider>
  )
}

export default Login
