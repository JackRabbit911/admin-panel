import { $currentUser, logoutClicked } from "store/currentUser";
import Sandwich from "./Sandwich";
import { useUnit } from "effector-react";

const Navbar = () => {
  const currentUser = useUnit($currentUser)

  const onLogout = (event?: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault()
    logoutClicked()
  }

  return (
    <nav className="navbar bg-base-100 shadow-sm z-80">
      <div className="flex-1">
        <label
          htmlFor="my-drawer"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <Sandwich />
        </label>
      </div>
      <div className="flex-none">
        <span className="text-sm">
          {currentUser?.name}
        </span>
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="" onClick={onLogout}>
              Выход
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
