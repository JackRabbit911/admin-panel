import Item from "./Item";
import Submenu from "./Submenu";
import { useGetQuery } from "../../shared/api";
import { getSidebarUrl } from "../../shared/constants";
import type { SideItem } from "./types";

type Props = {
  onClose: () => void;
}

const Sidebar = ({ onClose }: Props) => {
  const { data } = useGetQuery({ url: getSidebarUrl })
  const menu: SideItem[] = data?.result ? data.result : null;

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
