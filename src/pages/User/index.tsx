import { VITE_API_URL } from "constants/env"
import { useUnit } from "effector-react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { $user, getUserDataFx, userReset } from "store/user"

const UserPage = () => {
  const user = useUnit($user)
  const host = VITE_API_URL
  const { id } = useParams()

  useEffect(() => {
      getUserDataFx(id as string)

      return userReset
  }, [])

  return !user ? null : (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={`${host}/${user.avatar}`} />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage
