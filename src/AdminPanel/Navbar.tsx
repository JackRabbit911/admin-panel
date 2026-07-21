import Sandwich from "./Sandwich";
import { host } from "../shared/api/baseQuery";
import { useTranslate } from "../shared/i18n/hooks";
import { authUrl, logoutUrl } from "../shared/constants";
import { useDeleteMutation, useGetQuery, useLazyGetQuery } from "../shared/api";

const Navbar = () => {
  const { data } = useGetQuery(authUrl);
  const [exit] = useDeleteMutation()
  const [trigger] = useLazyGetQuery()
  const __ = useTranslate()

  const user = data?.result.user ? data.result.user : null;

  const onSend = () => {
    trigger({ url: '/test' })
    trigger({ url: '/test/act1' })
    trigger({ url: '/test/act2' })
  }

  const onLogout = (url: string) => {
    exit({ url: url })
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
