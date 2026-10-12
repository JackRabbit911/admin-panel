import Sandwich from "./Sandwich"
import { host } from "shared/api/baseQuery"
import { useTranslate } from "shared/i18n/hooks"
import { resetUser } from "shared/store/userSlice"
import { useAppSelector } from "shared/store/hooks"
import { useAppDispatch } from "shared/store/hooks"
import { resetToken } from "shared/store/tokenSlice"
import { getMaintenanceUri, logoutUrl } from "shared/constants"
import { useGetQuery, useLazyGetQuery, usePostMutation } from "shared/api"
import type { MaintenanceState } from "shared/types"

const Navbar = () => {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const [exit] = usePostMutation()
  const [trigger] = useLazyGetQuery()
  const { data } = useGetQuery(getMaintenanceUri)
  const isMaintenance = (data as MaintenanceState | undefined)?.off
  const __ = useTranslate()

  const onSend = () => {
    trigger({ url: '/test' })
    trigger({ url: '/test/act1' })
    trigger({ url: '/test/act2' })
  }

  const onLogout = (url: string) => {
    exit({ url, method: 'DELETE' })
    dispatch(resetToken())
    dispatch(resetUser())
    window.location.href = `${host}/auth`
  }

  return (
    <div className="glass sticky top-0 z-40">
      <nav className="navbar shadow-sm z-40 h-16">
        <div className="flex-1">
          <label
            htmlFor="my-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost md:hidden"
          >
            <Sandwich />
          </label>
        </div>
        <div className="flex-1">
          {isMaintenance && (
            <div className="flex items-center gap-2">
              <span className="badge badge-error gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                Maintenance
              </span>
            </div>
          )}
        </div>
        <button className="btn" onClick={onSend}>
          Send
        </button>
        <div className="flex-none">
          <span className="text-sm">
            {user?.name}
          </span>
          <div className="avatar">
            <div className="w-12 rounded ms-2">
              <img src={`${host}/ava/user/${user?.id}`} />
            </div>
          </div>
          <button
            className="btn btn-ghost"
            onClick={() => onLogout(logoutUrl)}
          >
            {__('Log Out')}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
