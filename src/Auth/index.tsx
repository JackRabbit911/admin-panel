import Layout from "./Layout"
import CheckBox from "../Reused/CheckBox"
import TextInput from "../Reused/TextInput"
import { useAuthForm } from "./authFormHook"
import { FormProvider } from "react-hook-form"
import { useTranslate } from "../shared/i18n/hooks"
import ErrorOrPending from "../Reused/ErrorOrPendig"

const Auth = () => {
  const { methods, onSubmit, disabled, responseStatus } = useAuthForm()
  const __ = useTranslate()

  return (
    <ErrorOrPending responseStatus={responseStatus}>
      <Layout>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-center">
              <h1 className="text-xl">{__('Sign in to your account')}</h1>
            </div>
            <TextInput
              fieldName="email"
              label="Email"
            />
            <TextInput
              fieldName="password"
              type="password"
              label='Password'
            />
            <div className="flex flex-row justify-between gap-4 my-4">
              <CheckBox
                fieldName="remember"
                label={__('Remember me on this device')}
              />
            </div>
            <button
              className="btn btn-primary dark:btn-info w-full mb-4"
              disabled={disabled}
            >
              {__('Sign In')}
            </button>
          </form>
        </FormProvider>
      </Layout>
    </ErrorOrPending>
  )
}

export default Auth
