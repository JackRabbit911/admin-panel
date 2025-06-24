import Sandwich from "./Sandwich";

const Navbar = () => {
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
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="">
              Выход
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
