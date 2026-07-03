import Sandwich from "./Sandwich";
import { host } from "../shared/api/baseQuery";
import { useDeleteMutation } from "../shared/api";
import { logout } from "../shared/store/authSlice";
import { useTranslate } from "../shared/i18n/hooks";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";

const Navbar = () => {
  const { user, refresh } = useAppSelector((state) => state.auth)
  const [exit] = useDeleteMutation()
  const dispatch = useAppDispatch()
  const __ = useTranslate()

  const onLogout = () => {
    const arg = {
      url: '/auth/logout',
      body: { refresh: refresh },
    }

    exit(arg)
    window.localStorage.clear()
    dispatch(logout())
  }

  const onQuit = () => {
    const arg = {
      url: '/auth/quit',
      body: { refresh: refresh },
    }

    exit(arg)
    dispatch(logout())
  }

  return (
    <div className="glass sticky top-0 z-40">
      <nav className="navbar shadow-sm z-80 h-16">
        <div className="flex-1">
          <label
            htmlFor="my-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost md:hidden"
          >
            <Sandwich />
          </label>
        </div>
        <div className="flex-none">
          <span className="text-sm">
            {user?.name}
          </span>
          <div className="avatar">
            <div className="w-12 rounded ms-2">
              <img src={`${host}/ava/user/${user?.id}`} />
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              {__('Log Out')}
            </div>
            <ul tabIndex={0}
              className="dropdown-content menu bg-base-100 max-h-[70vh] overflow-y-auto rounded-box z-50 min-w-38 p-2 mt-3 shadow-sm"
            >
              <li>
                <button onClick={onLogout}>
                  {__('Of this device')}
                </button>
              </li>
              <li>
                <button onClick={onQuit}>
                  {__('Of all devices')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
