import { useUnit } from "effector-react"
import { $loginForm, emailChanged, passwordChanged, tryLoginClicked } from "store/login"
import Input from "../reuse/Input"
import LoginWrapper from "./LoginWrapper"
import { isValid } from "./utils"

const Login = () => {
  const loginForm = useUnit($loginForm)

  const onClickLogin = () => {
    tryLoginClicked()
  }

  return (
    <LoginWrapper>
      <div className="card-body">
        <fieldset className="fieldset">
          <Input
            label="Email"
            data={loginForm.email}
            setValue={emailChanged}
          />
          <Input
            type="password"
            label="Password"
            data={loginForm.password}
            setValue={passwordChanged}
          />
          <button
            className="btn btn-primary mt-4"
            onClick={onClickLogin}
            disabled={!isValid(loginForm)}
          >
            Login
          </button>
        </fieldset>
      </div>
    </LoginWrapper>
  )
}

export default Login
