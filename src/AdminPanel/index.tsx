import { useState } from "react"
import { NavLink } from "react-router"
import Navbar from "./Navbar"
import Router from "./Router"
import Sidebar from "./Sidebar"
import Error from "Reused/Error"
import { useAppDispatch, useAppSelector } from "shared/store/hooks"
import { resetStatus } from "shared/store/statusSlice"

const AdminPanel = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => Number(state.status.status))
  const [isShown, setIsShown] = useState(false)

  const onClose = () => {
    setIsShown(false)
  }

  const handleClick = () => {
    dispatch(resetStatus())
    setIsShown(false)
  }

  return (
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
        <div className="p-3 h-11/12">
          {status >= 400 ? <Error status={status} /> : <Router />}
        </div>
      </div>
      <div className="drawer-side z-80">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-base-200 text-base-content min-h-full w-64 xl:w-80">
          <nav className="navbar shadow-sm flex justify-center sticky top-0 bg-lime-200 h-16">
            <NavLink onClick={handleClick} to='/'>
              <h2 className="text-center text-2xl font-medium text-violet-800">
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
