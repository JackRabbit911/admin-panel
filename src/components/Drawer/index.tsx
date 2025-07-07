import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Drawer = () => {
  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-base-200 text-base-content min-h-full w-64 xl:w-80">
          <div className="flex justify-center navbar bg-lime-200 sticky top-0 shadow-sm z-40 w-full py-0">
            <h2 className="text-center text-2xl font-medium text-violet-800">
              Admin panel
            </h2>
          </div>
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default Drawer;
