import Sandwich from "./Sandwich";

const Navbar = () => {
  const onLogout = (event?: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault()
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
            Алексей Зайцев
          </span>
          <div className="avatar">
            <div className="w-12 rounded ms-2">
              <img src="public/1.webp" />
            </div>
          </div>
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="" onClick={onLogout}>
                Выход
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
