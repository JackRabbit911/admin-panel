import { useUnit } from "effector-react"
import { $errorLogin, $loginPayload, emailChanged, passwordChanged, tryLoginClicked } from "store/login"
import Input from "../reuse/Input"
import LoginWrapper from "./LoginWrapper"
import { isValid } from "./utils"

const Login = () => {
  const { email, password } = useUnit($loginPayload)
  const errorLogin = useUnit($errorLogin)

  const onClickLogin = () => {
    tryLoginClicked()
  }

  console.log(isValid(email, password), email)

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
            disabled={!isValid(email, password)}
          >
            Login
          </button>
        </fieldset>
      </div>
    </LoginWrapper>
  )
}

export default Login
