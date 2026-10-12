import Item from "./Item";
import Submenu from "./Submenu";
import { getSidebarUrl } from "shared/constants";
import { createGetHook } from "shared/hooks/createHooks";
import type { IMenuItem } from "./types";

const useGeMenuQuery = createGetHook<IMenuItem[]>(getSidebarUrl)

type Props = {
  onClose: () => void;
}

const Sidebar = ({ onClose }: Props) => {
  const { data: menu } = useGeMenuQuery()

  return menu && (
    <ul className="menu bg-base-200 text-base-content min-h-full w-full p-2">
      {menu.map(
        (item, key) => !item?.sub ? (
          <Item
            key={key + item.label}
            onClose={onClose}
            item={item}
          />
        ) : (
          <Submenu
            key={key + item.label}
            onClose={onClose}
            item={item}
          />
        )
      )}
    </ul>
  )
}

export default Sidebar
