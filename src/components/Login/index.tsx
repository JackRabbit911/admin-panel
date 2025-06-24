import Input from "../reuse/Input"
import LoginWrapper from "./LoginWrapper"

const Login = () => {
  const setEmail = (email: string) => {
    
  }

  const setPassword = (password: string) => {
    
  }

  return (
    <LoginWrapper>
      <div className="card-body">
        <fieldset className="fieldset">
          <Input
            label="Email"
            value=''
            setValue={setEmail}
            status={null}
          />
          <Input
            type="password"
            label="Password"
            value=''
            setValue={setPassword}
            status={null}
          />
          <button
            className="btn btn-primary mt-4"
          >
            Login
          </button>
        </fieldset>
      </div>
    </LoginWrapper>
  )
}

export default Login
