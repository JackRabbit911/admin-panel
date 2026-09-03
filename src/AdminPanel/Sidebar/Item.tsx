import { NavLink } from "react-router";

import Icon from "Reused/Icon";
import { useAppDispatch } from "shared/store/hooks";
import { resetStatus } from "shared/store/statusSlice";
import type { IMenuItem } from "./types";

type Props = {
  onClose: () => void;
  item: IMenuItem;
  prefix?: string;
}

const Item = ({ onClose, item, prefix = '' }: Props) => {
  const { label, to, icon, disabled } = item
  const link = Boolean(prefix) ? [prefix, to].join('/') : to
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(resetStatus())
    onClose()
  }

  const activeClass = 'bg-primary text-primary-content font-medium active shadow-md shadow-primary/20'

  return (
    <li
      className={disabled ? "disabled pointer-events-none opacity-50" : ""}
    >
      <NavLink
        to={link as string}
        onClick={(e) => disabled ? e.preventDefault() : handleClick()}
        className={({ isActive }) => isActive ? activeClass : ''}
      >
        {icon && <Icon name={icon} size={18} strokeWidth={1}/>}
        {label}
      </NavLink>
    </li>
  )
}

export default Item
