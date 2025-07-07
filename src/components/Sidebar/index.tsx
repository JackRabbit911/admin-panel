import { NavLink } from "react-router";
import { sideItems } from "./constants";
import Submenu from "./Submenu";

type Props = {
  onClose: () => void;
}

const Sidebar = ({onClose}: Props) => {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-full p-2">
      {sideItems.map(
        (item, key) => !item?.sub ? (
          <li key={key}>
            <NavLink
              to={item.href as string}
              onClick={onClose}
            >
              {item.title}
            </NavLink>
          </li>
        ) : (
          <Submenu item={item} key={key} />
        )
      )}
    </ul>
  )
}

export default Sidebar
