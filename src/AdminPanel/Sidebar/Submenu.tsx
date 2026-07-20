import type { SideItem } from "./types";
import Item from "./Item";

type Props = {
  onClose: () => void;
  item: SideItem;
  prefix?: string;
}

const Submenu = ({ onClose, item, prefix = '' }: Props) => {
  const { label, to, disabled } = item
  const myPrefix = Boolean(prefix) ? [prefix, to].join('/') : to

  return (
    <li
      className={disabled ? "disabled pointer-events-none opacity-50" : ""}
    >
      <details>
        <summary>{label}</summary>
        <ul>
          {(item?.sub || []).map(
            (subItem, key) => !subItem?.sub ? (
              <Item
                key={key + subItem.label}
                onClose={onClose}
                item={subItem}
                prefix={myPrefix}
              />
            ) : (
              <Submenu
                key={key + subItem.label}
                onClose={onClose}
                item={subItem}
                prefix={myPrefix} 
              />
            )
          )}
        </ul>
      </details>
    </li>
  )
}

export default Submenu
