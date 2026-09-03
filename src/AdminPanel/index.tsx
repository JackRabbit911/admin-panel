import { NavLink } from "react-router"
import { useEffect, useState } from "react"

import Navbar from "./Navbar"
import Router from "./Router"
import Sidebar from "./Sidebar"
import Error from "Reused/Error"
import { useGetQuery } from "shared/api"
import { authUrl } from "shared/constants"
import { getUserByJWT } from "shared/utils"
import { setUser } from "shared/store/userSlice"
import { setToken } from "shared/store/tokenSlice"
import { resetStatus } from "shared/store/statusSlice"
import { useAppDispatch, useAppSelector } from "shared/store/hooks"

const AdminPanel = () => {
  const { data } = useGetQuery(authUrl)
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => Number(state.status.status))
  const [isShown, setIsShown] = useState(false)
  const token = data?.result ? data.result : null

  const onClose = () => {
    setIsShown(false)
  }

  const handleClick = () => {
    dispatch(resetStatus())
    setIsShown(false)
  }

  useEffect(() => {
    if (token) {
      const user = getUserByJWT(token)
      dispatch(setToken(token))
      dispatch(setUser(user))
    }
  }, [token])

  return token && (
    <div className="drawer md:drawer-open">
      <input
        id="my-drawer"
        type="checkbox"
        checked={isShown}
        onChange={() => {
          setIsShown(!isShown)
        }}
        className="drawer-toggle"
      />
      <div className="drawer-content">
        <Navbar />
        <div className="p-3 h-10/12">
          {status >= 400 ? <Error status={status} /> : <Router />}
        </div>
      </div>
      <div className="drawer-side z-80">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-base-200 text-base-content min-h-full w-64 xl:w-80">
          <nav className="navbar shadow-sm flex justify-center sticky top-0 bg-linear-to-r from-primary to-accent h-16 z-40 opacity-90">
            <NavLink onClick={handleClick} to='/'>
              <h2 className="text-center text-2xl font-bold text-white drop-shadow-md">
                Admin panel
              </h2>
            </NavLink>
          </nav>
          <Sidebar onClose={onClose} />
        </aside>
      </div>
    </div>
  )
}

export default AdminPanel
