import Item from "./Item";
import Icon from "Reused/Icon";
import type { IMenuItem } from "./types";

type Props = {
  onClose: () => void;
  item: IMenuItem;
  prefix?: string;
}

const Submenu = ({ onClose, item, prefix = '' }: Props) => {
  const { label, to, icon, disabled } = item
  const myPrefix = Boolean(prefix) ? [prefix, to].join('/') : to

  return (
    <li
      className={disabled ? "disabled pointer-events-none opacity-50" : ""}
    >
      <details>
        <summary>
          {icon && <Icon name={icon} size={18} strokeWidth={1}/>}
          {label}
        </summary>
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
