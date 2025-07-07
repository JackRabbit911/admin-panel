import { NavLink } from "react-router";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Router from "components/Router";
import { useState } from "react";

const Drawer = () => {
  const [isShown, setIsShown] = useState(false)

  const onClose = () => {
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
        <div className="p-3">
          <Router />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-base-200 text-base-content min-h-full w-64 xl:w-80">
          <div className="flex justify-center navbar bg-lime-200 sticky top-0 shadow-sm z-40 w-full py-0">
            <NavLink onClick={onClose} to='/'>
              <h2 className="text-center text-2xl font-medium text-violet-800">
                Admin panel
              </h2>
            </NavLink>
          </div>
          <Sidebar onClose={onClose} />
        </aside>
      </div>
    </div>
  );
};

export default Drawer;
