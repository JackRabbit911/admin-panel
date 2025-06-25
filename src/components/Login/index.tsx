import { useUnit } from "effector-react"
import { $errorLogin, $loginPayload, emailChanged, passwordChanged, tryLoginClicked } from "store/login"
import Input from "../reuse/Input"
import LoginWrapper from "./LoginWrapper"

const Login = () => {
  const { email, password } = useUnit($loginPayload)
  const errorLogin = useUnit($errorLogin)

  const onClickLogin = () => {
    tryLoginClicked()
  }

  return (
    <LoginWrapper>
      <div className="card-body">
        <fieldset className="fieldset">
          <Input
            label="Email"
            value={email}
            setValue={emailChanged}
            status={errorLogin?.email}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            setValue={passwordChanged}
            status={errorLogin?.password}
          />
          <button
            className="btn btn-primary mt-4"
            onClick={onClickLogin}
          >
            Login
          </button>
        </fieldset>
      </div>
    </LoginWrapper>
  )
}

export default Login
