import { useForm, FormProvider } from "react-hook-form"
import LoginWrapper from "./LoginWrapper"
import TextFileld from "components/reuse/TextFileld"
import { useEffect } from "react";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const methods = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const { watch, formState, setError, clearErrors } = methods;
  const { errors } = formState;
  const isSubmitDisabled = Object.keys(errors).length > 0;
  const { email } = watch();

  const onSubmit = (data: LoginForm) => console.log(data)
  console.log('WATCH', email, errors);

  useEffect(() => {
    if(!email) {
      setError('email', {
        type: 'manual',
        message: 'Email is required'
      });
    } else {
      clearErrors('email');
    }
  },[email, setError, clearErrors]);

  return (
    <FormProvider {...methods}>
      <LoginWrapper>
        <form className="card-body" onSubmit={methods.handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <TextFileld
              name="email"
              label="Email"
            />
            <TextFileld
              name="password"
              type="password"
              label="Password"
            />
            <button
              type="submit"
              disabled={isSubmitDisabled}
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
