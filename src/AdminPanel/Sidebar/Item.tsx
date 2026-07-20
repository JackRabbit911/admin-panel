import { NavLink } from "react-router";
import type { SideItem } from "./types";

type Props = {
  onClose: () => void;
  item: SideItem;
  prefix?: string;
}

const Item = ({ onClose, item, prefix = '' }: Props) => {
  const { label, to, disabled } = item
  const link = Boolean(prefix) ? [prefix, to].join('/') : to

  return (
    <li
      className={disabled ? "disabled pointer-events-none opacity-50" : ""}
    >
      <NavLink
        to={link as string}
        onClick={(e) => disabled ? e.preventDefault() : onClose}
        className={({ isActive }) => isActive ? "menu-active" : ''}
      >
        {label}
      </NavLink>
    </li>
  )
}

export default Item
