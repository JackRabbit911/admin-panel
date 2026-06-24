import Sandwich from "./Sandwich";
import { host } from "../shared/api/ajax";
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
      body: {token: refresh},
    }

    exit(arg)
    window.localStorage.clear()
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
          <ul className="menu menu-horizontal px-1">
            <li>
              <button className="btn btn-ghost" onClick={onLogout}>
                {__('Log Out')}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
