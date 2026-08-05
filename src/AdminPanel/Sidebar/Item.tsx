import { NavLink } from "react-router";
import type { SideItem } from "./types";
import { useAppDispatch } from "shared/store/hooks";
import { resetStatus } from "shared/store/statusSlice";

type Props = {
  onClose: () => void;
  item: SideItem;
  prefix?: string;
}

const Item = ({ onClose, item, prefix = '' }: Props) => {
  const { label, to, disabled } = item
  const link = Boolean(prefix) ? [prefix, to].join('/') : to
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(resetStatus())
    onClose()
  }

  return (
    <li
      className={disabled ? "disabled pointer-events-none opacity-50" : ""}
    >
      <NavLink
        to={link as string}
        onClick={(e) => disabled ? e.preventDefault() : handleClick()}
        className={({ isActive }) => isActive ? "menu-active" : ''}
      >
        {label}
      </NavLink>
    </li>
  )
}

export default Item
